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
    const chatbotUrl = config.chatbotUrl || 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app';
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
      `;

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.id = 'real-estate-chatbot-iframe';
      iframe.src = chatbotUrl;
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 12px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
        display: block;
      `;
      iframe.allow = 'geolocation; microphone; camera';
      iframe.title = 'Real Estate Chatbot Assistant';
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation');

      container.appendChild(iframe);
      document.body.appendChild(container);

      // Handle responsive sizing
      function updateContainerSize() {
        const width = Math.min(window.innerWidth * 0.9, 450);
        const height = Math.min(window.innerHeight * 0.9, 800);

        container.style.width = width + 'px';
        container.style.height = height + 'px';
      }

      // Initial size
      updateContainerSize();

      // Update on resize
      window.addEventListener('resize', updateContainerSize);

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

