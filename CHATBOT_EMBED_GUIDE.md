# 🏠 Real Estate Chatbot - Complete Embed Guide

## 📌 Overview

Your BHHS-branded real estate chatbot is now ready to be embedded into any website! The chatbot appears as a floating 💬 button and provides AI-powered real estate assistance to your website visitors.

**Live Chatbot URL:** `https://real-estate-chatbot-tau.vercel.app`

---

## 🚀 Quick Start (30 seconds)

### Copy This Code:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Paste Into Your Website:

1. Open your website's HTML file
2. Find the closing `</body>` tag (usually at the very end)
3. Paste the code **right before** `</body>`
4. Save and refresh your website
5. ✅ Done! The chatbot widget should appear in the bottom-right corner

---

## 📋 What You Get

✅ **Floating Chat Widget** - 💬 button in bottom-right corner  
✅ **BHHS Branding** - Milano Red (#AF0C0D) color scheme  
✅ **AI-Powered** - Google Gemini AI responses  
✅ **Professional** - Stephanie Lepsch's headshot and contact info  
✅ **Responsive** - Works on all devices (mobile, tablet, desktop)  
✅ **Isolated** - Runs in iframe (no conflicts with your site)  
✅ **Customizable** - Position and theme options available  

---

## 🎯 Features

### What the Chatbot Can Do:

- 🔍 Answer questions about Hampden County real estate market
- 📊 Provide market statistics and trends
- 🏘️ Share town-specific information
- 💡 Guide buyers and sellers through the process
- 📞 Recommend connecting with Stephanie Lepsch
- 🔗 Direct users to property listings

### What It Cannot Do:

- ❌ Display property listings directly (directs to search page)
- ❌ Process transactions
- ❌ Access personal information
- ❌ Make phone calls

---

## ⚙️ Configuration Options

### Basic Configuration

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app',
    position: 'bottom-right',  // Where the widget appears
    theme: 'light'             // Color theme
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Position Options

- `'bottom-right'` (default) - Bottom-right corner
- `'bottom-left'` - Bottom-left corner
- `'top-right'` - Top-right corner
- `'top-left'` - Top-left corner

### Theme Options

- `'light'` (default) - Light theme
- `'dark'` - Dark theme (coming soon)

---

## 🌐 Platform-Specific Instructions

### WordPress

1. Go to **Appearance** → **Theme File Editor**
2. Find `footer.php` in the right sidebar
3. Scroll to the bottom (before `</body>`)
4. Add the embed code
5. Click **Update File**

**Alternative:** Use a code snippets plugin like **Code Snippets**

### Wix

1. Go to **Settings** → **Custom Code**
2. Click **+ Add Custom Code**
3. Paste the embed code
4. Set placement to **Footer**
5. Click **Apply**

### Squarespace

1. Go to **Settings** → **Advanced** → **Code Injection**
2. Paste the embed code in the **Footer** section
3. Click **Save**

### Shopify

1. Go to **Online Store** → **Themes**
2. Click **Edit code**
3. Find `theme.liquid`
4. Scroll to bottom and add before `</body>`
5. Click **Save**

### Webflow

1. Go to **Project Settings** → **Custom Code**
2. Paste in the **Footer Code** section
3. Click **Save**

### HTML/Static Website

Simply add the code before the closing `</body>` tag in your HTML file.

### Next.js / React

```jsx
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.RealEstateChatbotConfig = {
      chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
    };

    const script = document.createElement('script');
    script.src = 'https://real-estate-chatbot-tau.vercel.app/embed.js';
    document.body.appendChild(script);
  }, []);

  return <Component {...pageProps} />;
}
```

---

## 🔒 Security & Privacy

✅ **Isolated Iframe** - Chatbot runs in a sandboxed iframe  
✅ **No Data Collection** - No cookies or tracking (unless configured)  
✅ **HTTPS Only** - Secure connection  
✅ **CSP Compatible** - Works with Content Security Policy  
✅ **No Access to Parent** - Cannot access your website's data  

---

## 📱 Responsive Behavior

The widget automatically:
- Scales to fit the viewport (max 90% width/height)
- Maintains proper aspect ratio on mobile
- Adjusts on window resize
- Works on all screen sizes (320px to 4K)

---

## 🐛 Troubleshooting

### Widget Not Appearing?

**Check 1:** Is the code placed before `</body>`?
```html
<!-- ✅ Correct -->
<script>...</script>
</body>

<!-- ❌ Wrong -->
</body>
<script>...</script>
```

**Check 2:** Open browser console (F12) and look for errors
- If you see CORS errors, the chatbot URL might be blocked
- If you see 404 errors, the embed.js URL is incorrect

**Check 3:** Clear browser cache and refresh (Ctrl+Shift+R)

### Widget Shows But Doesn't Work?

1. Check if the chatbot URL is accessible: https://real-estate-chatbot-tau.vercel.app
2. Verify CORS is enabled (it should be by default)
3. Check browser console for iframe errors
4. Try a different browser to rule out browser-specific issues

### Styling Issues?

1. Check for CSS conflicts with your website
2. Verify Tailwind CSS isn't conflicting
3. Use browser DevTools to inspect the iframe
4. Try the widget on a different page

### Multiple Widgets Appearing?

Remove duplicate embed code - you should only have one set of `<script>` tags

---

## 📊 Customization Examples

### Example 1: Bottom-Left Position
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app',
    position: 'bottom-left'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Example 2: Top-Right Position
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app',
    position: 'top-right'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

---

## 📞 Support & Resources

- **Live Chatbot:** https://real-estate-chatbot-tau.vercel.app
- **GitHub Repository:** https://github.com/grego118118/rechatbot
- **Vercel Dashboard:** https://vercel.com/grego118s-projects/real-estate-chatbot
- **Example Implementation:** See `embed-example.html` in the repository

---

## ✅ Verification Checklist

After adding the embed code:

- [ ] Code is placed before closing `</body>` tag
- [ ] No JavaScript errors in browser console (F12)
- [ ] 💬 button appears in the specified corner
- [ ] Button is clickable and opens the chat
- [ ] Chat loads and displays welcome message
- [ ] You can type and send messages
- [ ] AI responds with real estate information
- [ ] Widget is responsive on mobile devices

---

## 🎉 You're All Set!

Your BHHS-branded real estate chatbot is now embedded and ready to help your website visitors. The chatbot will:

1. Greet visitors with a friendly welcome message
2. Answer questions about Hampden County real estate
3. Provide market insights and trends
4. Guide buyers and sellers
5. Recommend connecting with Stephanie Lepsch

**Questions?** Check the documentation files or visit the GitHub repository.

Happy chatting! 🚀

