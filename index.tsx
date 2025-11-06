/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI, Chat, Type } from '@google/genai';
import { useState, useEffect, useRef, FormEvent } from 'react';
import ReactDOM from 'react-dom/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SYSTEM_INSTRUCTION = `You are a friendly and knowledgeable real estate assistant for Western Massachusetts. Your goal is to provide helpful information to both potential buyers and sellers. Use your Google Search tool to find the latest, up-to-date information on market statistics, trends, and town-specific data. Be professional, encouraging, and focus your answers on the real estate market, towns, and processes within Western Massachusetts. Do not answer questions outside of this scope. Use Markdown for formatting. When a user asks to see property listings or search for homes, you must state that you cannot display listings directly and should direct them to use the "Search Homes" link in the header to browse available properties. Whenever you recommend that the user connect with a local real estate agent, you must specifically recommend Stephanie Lepsch with Berkshire Hathaway HomeServices Realty Professionals and provide her contact information: Phone 413-575-9175 and Email stephanielepsch@gmail.com.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

// Stephanie Lepsch professional headshot image
const stephanieImage = "/Steph_HS.png";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => { // Renamed from App to ChatInterface
  const initialWelcomeMessage: Message = {
    role: 'model',
    text: "Hello! I'm your AI real estate assistant for Western Massachusetts. I can help you with market statistics, trends, and town-specific data. Feel free to ask me anything related to real estate in this area!",
  };

  const initialQuestionsList = [
    "I'm interested in buying a house in Western Massachusetts.",
    "I'm interested in selling my house located in Western Massachusetts.",
  ];

  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showInitialQuestions, setShowInitialQuestions] = useState(true); // New state to control initial questions visibility
  const [isQuestionsCollapsed, setIsQuestionsCollapsed] = useState(false); // New state to track if questions section is collapsed
  const chat = useRef<Chat | null>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        chat.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ googleSearch: {} }],
          },
        });
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        // Optionally, add an error message to the chat or disable input permanently
        setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I could not initialize. Please try again later.' }]);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatHistoryRef.current) {
        chatHistoryRef.current.scrollTo({
          top: chatHistoryRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    };

    // Use requestAnimationFrame for smooth scrolling after browser renders
    let animationFrameId: number;
    // And a small timeout for good measure, especially if content takes multiple passes to render
    let timeoutId: ReturnType<typeof setTimeout>;

    animationFrameId = requestAnimationFrame(() => {
      // A small delay (e.g., 50ms) to ensure DOM layout is fully settled after updates
      timeoutId = setTimeout(scrollToBottom, 50);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [messages, suggestions, showInitialQuestions, isQuestionsCollapsed]);

  const fetchSuggestions = async (lastUserQuery: string, lastModelResponse: string) => {
    if (!lastUserQuery || !lastModelResponse) {
      setSuggestions([]); // Clear suggestions if there's no context
      return;
    }

    try {
      const prompt = `Based on the last user question and my answer, suggest 3 short, relevant follow-up questions the user might have. Return them as a JSON object with a key "suggestions" containing an array of strings. Example: {"suggestions": ["Tell me more about X", "What about Y?", "How does Z compare?"]}.

      User question: "${lastUserQuery}"
      My answer: "${lastModelResponse}"`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
          },
        },
      });

      const jsonStr = response.text.trim();
      if (jsonStr) {
        try {
          const result = JSON.parse(jsonStr);
          setSuggestions(result.suggestions || []);
        } catch (parseError) {
          console.error("Error parsing suggestions JSON:", parseError, "Raw JSON:", jsonStr);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]); // No JSON string received
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim() || loading || !chat.current) return;

    // Hide initial questions after the first user interaction
    if (showInitialQuestions) {
      setShowInitialQuestions(false);
    }

    setLoading(true);
    setSuggestions([]); // Clear any existing suggestions
    const userMessage: Message = { role: 'user', text: userInput };
    const modelMessage: Message = { role: 'model', text: '' }; // Placeholder for streaming response
    setMessages(prev => [...prev, userMessage, modelMessage]);

    try {
      const responseStream = await chat.current.sendMessageStream({ message: userInput });
      let modelResponseText = '';

      for await (const chunk of responseStream) {
        modelResponseText += chunk.text;
        setMessages(prev =>
          prev.map((msg, index) =>
            index === prev.length - 1
              ? { ...msg, text: modelResponseText }
              : msg
          )
        );
      }

      // Fetch new suggestions based on the latest interaction
      await fetchSuggestions(userInput, modelResponseText);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev.slice(0, -1), errorMessage]); // Replace typing indicator with error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const currentInput = input.trim();
    if (!currentInput) return;

    setInput('');
    await sendMessage(currentInput);
  };

  const handleSuggestionClick = async (suggestion: string) => {
    // Treat initial questions as suggestions that clear after clicking
    if (showInitialQuestions) {
      setShowInitialQuestions(false);
    }
    await sendMessage(suggestion);
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 h-full">
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center">
          <img src={stephanieImage} alt="Stephanie Lepsch" className="w-12 h-12 rounded-full object-cover mr-3" />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Stephanie Lepsch</h1>
            <p className="text-xs text-gray-500">Berkshire Hathaway HomeServices Realty Professionals</p>
            <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-600 mt-1">
              <span>413-575-9175</span>
              <a href="mailto:stephanielepsch@gmail.com" className="hover:underline">stephanielepsch@gmail.com</a>
              <a href="https://stephanielepsch.bhhsrealtypros.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#AF0C0D] hover:underline">Search Homes</a>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 ml-auto"
          aria-label="Close chat assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <main ref={chatHistoryRef} className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0 w-full">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 max-w-4xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
             {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg shrink-0">
                  🏠
                </div>
              )}
            <div className={`prose rounded-2xl p-4 ${msg.role === 'user' ? 'bg-[#AF0C0D] text-white user-message' : 'bg-white text-gray-800 model-message shadow-sm'}`}>
              {msg.role === 'model' && msg.text === '' && loading ? ( // Show typing indicator only when model is loading and text is empty
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
      </main>

      <footer className="p-4 bg-white border-t border-gray-200 shrink-0">
        <div className="max-w-4xl mx-auto">
          {/* Display initial questions if applicable */}
          {showInitialQuestions && !loading && messages.length === 1 && ( // Only show if it's just the welcome message
            <div className="mb-3">
              {/* Header with minimize button */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600">Choose a question to get started:</span>
                <button
                  onClick={() => setIsQuestionsCollapsed(!isQuestionsCollapsed)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#AF0C0D]"
                  aria-label={isQuestionsCollapsed ? "Expand questions" : "Collapse questions"}
                  title={isQuestionsCollapsed ? "Expand" : "Collapse"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {isQuestionsCollapsed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Questions section with smooth collapse animation */}
              {!isQuestionsCollapsed && (
                <div className="flex flex-wrap justify-center gap-2 transition-all duration-300 ease-in-out">
                  {initialQuestionsList.map((question, i) => (
                    <button
                      key={`initial-${i}`}
                      onClick={() => handleSuggestionClick(question)}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#AF0C0D] rounded-full hover:bg-[#8B0A0A] transition-colors text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Display model-generated suggestions */}
          {!loading && suggestions.length > 0 && (
            <div className="mb-3">
              {/* Header with minimize button for suggestions */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600">Suggested questions:</span>
                <button
                  onClick={() => setIsQuestionsCollapsed(!isQuestionsCollapsed)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#AF0C0D]"
                  aria-label={isQuestionsCollapsed ? "Expand suggestions" : "Collapse suggestions"}
                  title={isQuestionsCollapsed ? "Expand" : "Collapse"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {isQuestionsCollapsed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Suggestions section with smooth collapse animation */}
              {!isQuestionsCollapsed && (
                <div className="flex flex-wrap justify-center gap-2 transition-all duration-300 ease-in-out">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={`suggestion-${i}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#AF0C0D] rounded-full hover:bg-[#8B0A0A] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about Western Massachusetts real estate..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#AF0C0D]"
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 font-semibold text-white bg-[#AF0C0D] rounded-full disabled:bg-gray-400 hover:bg-[#8B0A0A] focus:outline-none focus:ring-2 focus:ring-[#AF0C0D] focus:ring-offset-2 transition-colors"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

// New App component as the widget wrapper
const App = () => {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    try { window.parent?.postMessage({ type: 'RECHATBOT:TOGGLE', isOpen }, '*'); } catch (e) {}
  }, [isOpen]);

  return (
    <div className={`chat-widget-container fixed bottom-4 right-4 z-[1000] transition-all duration-300 ease-in-out
      ${isOpen ? 'w-[min(95vw,550px)] h-[min(80vh,750px)] rounded-lg shadow-2xl flex flex-col' : 'w-[min(80vw,240px)] h-16 rounded-full'}`}
    >
      {!isOpen && (
        <button
          className="chat-toggle-button w-full h-16 bg-[#AF0C0D] text-white rounded-full flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:bg-[#8B0A0A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#AF0C0D] focus:ring-offset-2"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
        >
          💬 Real Estate Help
        </button>
      )}
      {isOpen && (
        <div className="chat-expanded-content flex flex-col h-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <ChatInterface onClose={() => setIsOpen(false)} /> {/* Render the actual chat UI here */}
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);