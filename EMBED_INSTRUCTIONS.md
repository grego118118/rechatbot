# Real Estate Chatbot Widget - Embed Instructions

## 🚀 Quick Start

Add this single line of code to your website's HTML (before the closing `</body>` tag):

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
```

That's it! The chatbot widget will appear as a floating 💬 button in the bottom-right corner of your website.

---

## 📋 Complete Implementation Guide

### Step 1: Add the Configuration Script

Place this in your HTML `<head>` or before the closing `</body>` tag:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app',
    position: 'bottom-right',  // Options: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    theme: 'light'             // Options: 'light', 'dark'
  };
</script>
```

### Step 2: Add the Embed Script

Add this script tag right before the closing `</body>` tag:

```html
<script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
```

### Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Real Estate Website</title>
  <!-- Your existing styles and scripts -->
</head>
<body>
  <!-- Your website content -->
  
  <!-- Add the chatbot widget at the end of body -->
  <script>
    window.RealEstateChatbotConfig = {
      chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app',
      position: 'bottom-right'
    };
  </script>
  <script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
</body>
</html>
```

---

## ⚙️ Configuration Options

### `chatbotUrl` (Required)
- **Type:** String
- **Default:** `https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app`
- **Description:** The URL of your deployed chatbot

### `position` (Optional)
- **Type:** String
- **Default:** `'bottom-right'`
- **Options:** `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'`
- **Description:** Where the widget appears on the page

### `theme` (Optional)
- **Type:** String
- **Default:** `'light'`
- **Options:** `'light'`, `'dark'`
- **Description:** Color theme for the widget

---

## 🎨 Customization Examples

### Example 1: Bottom-Left Position
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app',
    position: 'bottom-left'
  };
</script>
<script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
```

### Example 2: Top-Right Position
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app',
    position: 'top-right'
  };
</script>
<script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
```

---

## 🔧 Advanced Usage

### Programmatic Control

```javascript
// Check if widget is loaded
if (window.RealEstateChatbotLoaded) {
  console.log('Chatbot widget is active');
}

// Access the iframe
const iframe = document.getElementById('real-estate-chatbot-iframe');
const container = document.getElementById('real-estate-chatbot-widget');
```

### Dynamic Configuration

```html
<script>
  // Set configuration before loading the script
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app',
    position: 'bottom-right'
  };
</script>
<script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
```

---

## 📱 Responsive Behavior

The widget automatically:
- ✅ Scales to fit the viewport (max 90% width/height)
- ✅ Maintains aspect ratio on mobile devices
- ✅ Adjusts on window resize
- ✅ Works on all screen sizes

---

## 🔒 Security & Privacy

- ✅ Runs in an isolated iframe (no access to parent page)
- ✅ No cookies or tracking (unless configured)
- ✅ HTTPS only
- ✅ Content Security Policy compatible

---

## 🐛 Troubleshooting

### Widget not appearing?
1. Check browser console for errors
2. Verify the chatbot URL is correct
3. Ensure script is placed before `</body>` tag
4. Check z-index conflicts with other elements

### Widget appears but doesn't work?
1. Check if chatbot URL is accessible
2. Verify CORS is enabled on the chatbot server
3. Check browser console for iframe errors

### Styling issues?
1. Check for CSS conflicts with your website
2. Verify Tailwind CSS is not conflicting
3. Use browser DevTools to inspect the iframe

---

## 📞 Support

For issues or questions:
- GitHub: https://github.com/grego118118/rechatbot
- Vercel Dashboard: https://vercel.com/grego118s-projects/real-estate-chatbot

---

## 📄 License

This embed script is provided as-is for use with the Real Estate Chatbot.

