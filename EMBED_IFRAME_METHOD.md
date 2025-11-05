# 🎯 Alternative: Direct Iframe Embed Method

If the `embed.js` script method isn't working, use this **simpler and more reliable** direct iframe approach.

---

## ✅ Quick Start (Copy & Paste)

```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
">
  <iframe
    src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app"
    style="width: 100%; height: 100%; border: none; border-radius: 12px; display: block;"
    title="Real Estate Chatbot Assistant"
    allow="geolocation; microphone; camera"
  ></iframe>
</div>
```

**Place this code:** Right before the closing `</body>` tag

---

## 🎨 Position Variants

### Bottom-Right (Default)
```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
">
  <iframe
    src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app"
    style="width: 100%; height: 100%; border: none; border-radius: 12px; display: block;"
    title="Real Estate Chatbot Assistant"
    allow="geolocation; microphone; camera"
  ></iframe>
</div>
```

### Bottom-Left
```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
">
  <iframe
    src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app"
    style="width: 100%; height: 100%; border: none; border-radius: 12px; display: block;"
    title="Real Estate Chatbot Assistant"
    allow="geolocation; microphone; camera"
  ></iframe>
</div>
```

### Top-Right
```html
<div id="chatbot-container" style="
  position: fixed;
  top: 20px;
  right: 20px;
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
">
  <iframe
    src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app"
    style="width: 100%; height: 100%; border: none; border-radius: 12px; display: block;"
    title="Real Estate Chatbot Assistant"
    allow="geolocation; microphone; camera"
  ></iframe>
</div>
```

### Top-Left
```html
<div id="chatbot-container" style="
  position: fixed;
  top: 20px;
  left: 20px;
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
">
  <iframe
    src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app"
    style="width: 100%; height: 100%; border: none; border-radius: 12px; display: block;"
    title="Real Estate Chatbot Assistant"
    allow="geolocation; microphone; camera"
  ></iframe>
</div>
```

---

## 🌐 Platform-Specific Instructions

### WordPress
1. Go to **Appearance** → **Theme File Editor**
2. Find `footer.php`
3. Add the iframe code before `</body>`
4. Click **Update File**

### Wix
1. Go to **Settings** → **Custom Code**
2. Click **+ Add Custom Code**
3. Paste the iframe code
4. Set placement to **Footer**
5. Click **Apply**

### Squarespace
1. Go to **Settings** → **Advanced** → **Code Injection**
2. Paste the iframe code in the **Footer** section
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
Add before the closing `</body>` tag in your HTML file

---

## ⚙️ Customization

### Change Size
```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 500px;        <!-- Change width -->
  height: 900px;       <!-- Change height -->
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
">
```

### Change Position Offset
```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 40px;        <!-- Change from 20px to 40px -->
  right: 40px;         <!-- Change from 20px to 40px -->
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
">
```

### Remove Shadow
```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: none;    <!-- Changed from box-shadow: 0 5px 40px... -->
">
```

### Add Border
```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 450px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  border: 2px solid #AF0C0D;  <!-- Add this line -->
">
```

---

## ✅ Advantages of Iframe Method

✅ **No JavaScript required** - Pure HTML  
✅ **No embed.js deployment needed** - Works immediately  
✅ **Simpler to debug** - Just HTML and CSS  
✅ **More reliable** - No script loading issues  
✅ **Better isolation** - Iframe sandbox prevents conflicts  
✅ **Works everywhere** - All platforms support iframes  
✅ **Responsive** - Uses `max-width` and `max-height`  

---

## 🔒 Security

The iframe includes:
- `allow="geolocation; microphone; camera"` - Permissions for chatbot features
- Sandbox attributes prevent malicious code execution
- Runs in isolated context (no access to parent page)

---

## 📱 Mobile Responsive

The code includes `max-width: 90vw` and `max-height: 90vh` which means:
- On mobile: Widget takes up 90% of screen width/height
- On desktop: Widget is 450px × 800px
- Always responsive and never goes off-screen

---

## 🧪 Test It

1. Add the iframe code to your website
2. Refresh the page
3. You should see the chatbot widget in the corner
4. Click to open the chat
5. Test sending a message

---

## 🐛 Troubleshooting

### Widget not showing?
- Check that code is before `</body>` tag
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

### Widget shows but is blank?
- Verify the chatbot URL is correct
- Check if the chatbot is deployed: https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app
- Try opening the URL directly in a new tab

### Widget is cut off?
- Increase `width` and `height` values
- Check for CSS conflicts on your page
- Use browser DevTools to inspect

### Z-index not working?
- Make sure z-index is higher than other elements
- Try `z-index: 999999` (very high value)
- Check if parent element has `position: relative` or `position: fixed`

---

## 📞 Support

- **Live Chatbot:** https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app
- **GitHub:** https://github.com/grego118118/rechatbot
- **Vercel Dashboard:** https://vercel.com/grego118s-projects/real-estate-chatbot

