/**
 * Real Estate Chatbot Widget Embed Script
 *
 * This script embeds the BHHS-branded real estate chatbot widget into any website.
 * The chatbot appears as a floating iframe in the bottom-right corner.
 *
 * Usage:
 * Add this script tag to your website's HTML (before closing </body> tag):
 * <script>
 *   window.RealEstateChatbotConfig = {
 *     chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app'
 *   };
 * </script>
 * <script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  function initWidget() {
    // Configuration with defaults
    const config = window.RealEstateChatbotConfig || {};
    const chatbotUrl = config.chatbotUrl || 'https://real-estate-chatbot-tau.vercel.app';
    const position = config.position || 'bottom-right';
    const theme = config.theme || 'light';

    // Prevent multiple instances
    if (window.RealEstateChatbotLoaded) {
      console.warn('Real Estate Chatbot widget is already loaded');
      return;
    }
    window.RealEstateChatbotLoaded = true;

    try {
      // Create container for the iframe
      const container = document.createElement('div');
      container.id = 'real-estate-chatbot-widget';
      container.setAttribute('data-version', '1.0');

      const positionStyles = getPositionStyles(position);
      container.style.cssText = `
        position: fixed;
        ${positionStyles}
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        pointer-events: none;
        width: 0;
        height: 0;
        overflow: visible;
      `;

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.id = 'real-estate-chatbot-iframe';
      iframe.src = chatbotUrl;
      iframe.style.cssText = `
        position: fixed;
        ${positionStyles}
        width: 240px;
        height: 64px;
        max-width: 95vw;
        max-height: 80vh;
        border: none;
        border-radius: 12px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
        display: block;
        pointer-events: auto;
        z-index: 999999;
      `;
      iframe.allow = 'geolocation; microphone; camera';
      iframe.title = 'Real Estate Chatbot Assistant';
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation');

      container.appendChild(iframe);
      document.body.appendChild(container);

      // Handle responsive sizing for iframe
      let isOpen = false;
      function updateIframeSize() {
        const widthOpen = Math.min(window.innerWidth * 0.95, 550);
        const heightOpen = Math.min(window.innerHeight * 0.8, 750);
        const widthClosed = Math.min(window.innerWidth * 0.8, 240);
        const w = isOpen ? widthOpen : widthClosed;
        const h = isOpen ? heightOpen : 64;

        iframe.style.width = w + 'px';
        iframe.style.height = h + 'px';
      }

      // Initial size
      updateIframeSize();

      // Update on resize and listen for open/close messages from iframe
      window.addEventListener('resize', updateIframeSize);
      window.addEventListener('message', (e) => {
        if (e.source !== iframe.contentWindow) return;
        const d = e.data || {};
        if (d.type === 'RECHATBOT:TOGGLE') {
          isOpen = !!d.isOpen;
          updateIframeSize();
        }
      });

      // Log successful load
      console.log('✅ Real Estate Chatbot widget loaded successfully');
      console.log('📍 Chatbot URL:', chatbotUrl);
      console.log('📌 Position:', position);
      console.log('🎨 Theme:', theme);
      console.log('📦 Widget ID:', container.id);

    } catch (error) {
      console.error('❌ Error loading Real Estate Chatbot widget:', error);
      console.error('Stack:', error.stack);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    // DOM is already ready
    initWidget();
  }
})();

/**
 * Helper function to get position styles
 */
function getPositionStyles(position) {
  const positions = {
    'bottom-right': 'bottom: 20px; right: 20px;',
    'bottom-left': 'bottom: 20px; left: 20px;',
    'top-right': 'top: 20px; right: 20px;',
    'top-left': 'top: 20px; left: 20px;'
  };
  return positions[position] || positions['bottom-right'];
}

