# 🎯 Chatbot Embed - Troubleshooting Summary

Your chatbot widget isn't appearing? Here's the complete solution.

---

## 🚀 Quick Fix (Try This First)

### Option 1: Use Direct Iframe Method (Most Reliable)

Replace your embed code with this:

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

**Why this works:**
- ✅ No JavaScript required
- ✅ No embed.js deployment needed
- ✅ Works immediately
- ✅ Simpler to debug
- ✅ No CORS issues

---

### Option 2: Fix embed.js Method

If you want to use the embed.js script:

1. **Verify placement:**
   ```html
   <!-- CORRECT: Before </body> -->
   <script>
     window.RealEstateChatbotConfig = {
       chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app'
     };
   </script>
   <script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
   </body>
   ```

2. **Check browser console (F12):**
   - Look for: `✅ Real Estate Chatbot widget loaded successfully`
   - If you see errors, follow the error fix below

3. **Redeploy if needed:**
   ```bash
   git push origin main
   # Wait 2-3 minutes for Vercel to deploy
   ```

---

## 🔍 Diagnostic Steps

### Step 1: Open Browser Console
- **Windows/Linux:** Press `F12`
- **Mac:** Press `Cmd+Option+I`
- Go to **Console** tab

### Step 2: Check for Success Message
You should see:
```
✅ Real Estate Chatbot widget loaded successfully
📍 Chatbot URL: https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app
📌 Position: bottom-right
🎨 Theme: light
📦 Widget ID: real-estate-chatbot-widget
```

### Step 3: Check for Errors
If you see red error messages, see "Common Errors" section below.

### Step 4: Run Diagnostic Script
Copy and paste this in console:
```javascript
console.log('=== DIAGNOSTIC ===');
console.log('1. Script loaded:', !!window.RealEstateChatbotLoaded);
console.log('2. Widget exists:', !!document.getElementById('real-estate-chatbot-widget'));
console.log('3. Iframe exists:', !!document.getElementById('real-estate-chatbot-iframe'));
const w = document.getElementById('real-estate-chatbot-widget');
if (w) {
  const s = window.getComputedStyle(w);
  console.log('4. Widget visible:', s.display !== 'none' && s.visibility !== 'hidden');
  console.log('5. Z-index:', s.zIndex);
  console.log('6. Position:', s.position);
}
```

---

## 🚨 Common Errors & Fixes

### Error: "Failed to load script" (404)
```
GET https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js 404
```

**Fix:**
1. Verify Vercel deployment: `vercel ls`
2. If not deployed, run: `git push origin main`
3. Wait 2-3 minutes
4. Refresh page (Ctrl+F5)

---

### Error: "CORS error"
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:**
- Use **Direct Iframe Method** above (recommended)
- Or check Vercel CORS settings

---

### Error: "Uncaught SyntaxError"
```
Uncaught SyntaxError: Unexpected token
```

**Fix:**
1. embed.js file may be corrupted
2. Redeploy: `git push origin main`
3. Wait for deployment
4. Refresh page

---

### Error: "RealEstateChatbotConfig is not defined"
```
Uncaught ReferenceError: RealEstateChatbotConfig is not defined
```

**Fix:**
1. Configuration script is missing
2. Make sure config script comes **before** embed.js script
3. Check for typos in variable name

---

## 🧪 Test Widget Visibility

Run this in console to test if your page can display fixed elements:

```javascript
const test = document.createElement('div');
test.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: red;
  z-index: 999999;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
`;
test.textContent = '💬';
document.body.appendChild(test);
console.log('Test widget created - should see red circle in bottom-right');
```

**If red circle appears:**
- Your page can display fixed elements
- Issue is with embed.js or configuration
- Try Direct Iframe Method

**If red circle doesn't appear:**
- Your page has CSS preventing fixed elements
- Check your page's CSS for conflicts

---

## 📋 Complete Troubleshooting Checklist

Follow these steps in order:

1. **[ ] Verify code placement**
   - Code is before `</body>` tag
   - No typos in URLs

2. **[ ] Open browser console (F12)**
   - Look for success message
   - Look for error messages

3. **[ ] Check if widget exists**
   - Run: `document.getElementById('real-estate-chatbot-widget')`
   - Should return the element

4. **[ ] Check widget styles**
   - Run diagnostic script above
   - Verify z-index is 999999
   - Verify position is fixed

5. **[ ] Test page CSS**
   - Run test widget script above
   - If test widget appears, issue is with embed.js
   - If test widget doesn't appear, issue is with page CSS

6. **[ ] Try Direct Iframe Method**
   - Replace embed code with iframe code
   - Refresh page
   - Should work immediately

7. **[ ] Clear cache and try again**
   - Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Refresh page

8. **[ ] Try incognito/private mode**
   - Ctrl+Shift+N (or Cmd+Shift+N on Mac)
   - Test in private window

9. **[ ] Try different browser**
   - Chrome, Firefox, Safari, Edge
   - Verify issue is not browser-specific

10. **[ ] Check Vercel deployment**
    - Run: `vercel ls`
    - Verify deployment status is "Ready"
    - If not deployed, run: `git push origin main`

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **TROUBLESHOOTING_GUIDE.md** | Detailed troubleshooting steps |
| **EMBED_IFRAME_METHOD.md** | Direct iframe embed (most reliable) |
| **DEBUG_CHECKLIST.md** | Step-by-step debug checklist |
| **CHATBOT_EMBED_GUIDE.md** | Complete embed guide |
| **EMBED_INSTRUCTIONS.md** | Setup instructions |
| **EMBED_SNIPPETS.md** | Platform-specific code |

---

## 🎯 Recommended Solution

**For most users, use the Direct Iframe Method:**

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

**Why:**
- ✅ No JavaScript required
- ✅ Works immediately
- ✅ No deployment needed
- ✅ Simpler to debug
- ✅ No CORS issues
- ✅ Works on all platforms

---

## 📞 Still Need Help?

1. **Check documentation:** See files listed above
2. **Review GitHub:** https://github.com/grego118118/rechatbot
3. **Check Vercel:** https://vercel.com/grego118s-projects/real-estate-chatbot
4. **Test chatbot directly:** https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app

---

## ✅ Success Indicators

You'll know it's working when:

- ✅ 💬 button appears in corner
- ✅ Button is clickable
- ✅ Chat opens when clicked
- ✅ Welcome message displays
- ✅ You can type and send messages
- ✅ AI responds with real estate info
- ✅ Widget is responsive on mobile

---

## 🎉 You're All Set!

Once the widget appears and works, you're done! The chatbot is now embedded in your website and ready to help visitors.

