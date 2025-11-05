# Ready-to-Use Embed Snippets

Copy and paste these snippets directly into your website. No modifications needed!

---

## 🔗 Basic Embed (Copy & Paste)

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

**Where to place it:** Right before the closing `</body>` tag in your HTML

---

## 🎯 Position Variants

### Bottom-Right (Default)
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app',
    position: 'bottom-right'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Bottom-Left
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app',
    position: 'bottom-left'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Top-Right
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app',
    position: 'top-right'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Top-Left
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app',
    position: 'top-left'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

---

## 🌐 Platform-Specific Instructions

### WordPress
1. Go to **Appearance** → **Theme File Editor** (or use a code snippets plugin)
2. Find `footer.php` or use a custom code plugin like **Code Snippets**
3. Add this code before the closing `</body>` tag:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Wix
1. Go to **Settings** → **Custom Code**
2. Click **+ Add Custom Code**
3. Paste this code:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

4. Set placement to **Footer**

### Squarespace
1. Go to **Settings** → **Advanced** → **Code Injection**
2. Paste this code in the **Footer** section:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Shopify
1. Go to **Online Store** → **Themes**
2. Click **Edit code**
3. Find `theme.liquid` in the left sidebar
4. Scroll to the bottom and add before `</body>`:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Webflow
1. Go to **Project Settings** → **Custom Code**
2. Paste this in the **Footer Code** section:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### HTML/Static Website
Add this before the closing `</body>` tag:

```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
```

### Next.js / React
In your `_app.js` or `_app.tsx`:

```jsx
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Load chatbot widget
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

### Vue.js
In your `App.vue`:

```vue
<template>
  <div id="app">
    <!-- Your content -->
  </div>
</template>

<script>
export default {
  mounted() {
    window.RealEstateChatbotConfig = {
      chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
    };
    
    const script = document.createElement('script');
    script.src = 'https://real-estate-chatbot-tau.vercel.app/embed.js';
    document.body.appendChild(script);
  }
}
</script>
```

---

## ✅ Verification Checklist

After adding the embed code:

- [ ] Code is placed before closing `</body>` tag
- [ ] No JavaScript errors in browser console
- [ ] 💬 button appears in bottom-right corner
- [ ] Button is clickable and opens the chat
- [ ] Chat loads and displays the welcome message
- [ ] You can type and send messages
- [ ] AI responds with real estate information

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Widget not showing | Check browser console for errors; verify script URL is correct |
| Widget shows but doesn't work | Verify chatbot URL is accessible; check CORS settings |
| Styling looks broken | Clear browser cache; check for CSS conflicts |
| Multiple widgets appear | Remove duplicate embed code |
| Widget behind other elements | Check z-index of other page elements |

---

## 📞 Need Help?

- Check the full documentation: `EMBED_INSTRUCTIONS.md`
- View example implementation: `embed-example.html`
- GitHub: https://github.com/grego118118/rechatbot

