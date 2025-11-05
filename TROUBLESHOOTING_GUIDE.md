# 🔧 Real Estate Chatbot - Troubleshooting Guide

## 🚨 Widget Not Appearing? Follow These Steps

---

## Step 1: Verify Script Placement

### ✅ Correct Placement
```html
  </main>
  
  <!-- CHATBOT CODE HERE -->
  <script>
    window.RealEstateChatbotConfig = {
      chatbotUrl: 'https://real-estate-chatbot-tau.vercel.app'
    };
  </script>
  <script src="https://real-estate-chatbot-tau.vercel.app/embed.js"></script>
  
</body>  ← Closing body tag
```

### ❌ Wrong Placement
```html
</body>
<!-- DON'T PUT IT HERE -->
<script>...</script>
```

---

## Step 2: Check Browser Console for Errors

### Open Developer Tools
- **Windows/Linux:** Press `F12` or `Ctrl+Shift+I`
- **Mac:** Press `Cmd+Option+I`

### Look for These Messages

#### ✅ Success (You should see these)
```
✅ Real Estate Chatbot widget loaded successfully
📍 Chatbot URL: https://real-estate-chatbot-tau.vercel.app
📌 Position: bottom-right
🎨 Theme: light
📦 Widget ID: real-estate-chatbot-widget
```

#### ❌ Errors (If you see these, follow the fix)

**Error: "Failed to load script"**
```
GET https://real-estate-chatbot-tau.vercel.app/embed.js 404
```
**Fix:** The embed.js file is not deployed. See "Deploy embed.js" section below.

**Error: "CORS error"**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** This is usually not an issue with embed.js, but with the chatbot URL. Try the alternative iframe method below.

**Error: "Uncaught SyntaxError"**
```
Uncaught SyntaxError: Unexpected token
```
**Fix:** The embed.js file may be corrupted. Redeploy it.

---

## Step 3: Test if embed.js is Accessible

### Method 1: Direct URL Test
1. Open a new browser tab
2. Go to: `https://real-estate-chatbot-tau.vercel.app/embed.js`
3. You should see the JavaScript code
4. If you see a 404 error, the file is not deployed

### Method 2: Console Command
Open browser console (F12) and run:
```javascript
fetch('https://real-estate-chatbot-tau.vercel.app/embed.js')
  .then(r => r.text())
  .then(t => console.log('✅ File loaded:', t.length, 'bytes'))
  .catch(e => console.error('❌ Error:', e));
```

Expected output:
```
✅ File loaded: 3500 bytes
```

---

## Step 4: Check if Widget Element Exists

Open browser console (F12) and run:
```javascript
// Check if widget container exists
const widget = document.getElementById('real-estate-chatbot-widget');
console.log('Widget exists:', !!widget);
console.log('Widget element:', widget);

// Check if iframe exists
const iframe = document.getElementById('real-estate-chatbot-iframe');
console.log('Iframe exists:', !!iframe);
console.log('Iframe src:', iframe?.src);

// Check if script loaded
console.log('Script loaded:', !!window.RealEstateChatbotLoaded);
```

Expected output:
```
Widget exists: true
Widget element: <div id="real-estate-chatbot-widget" ...>
Iframe exists: true
Iframe src: https://real-estate-chatbot-tau.vercel.app
Script loaded: true
```

---

## Step 5: Check for Z-Index Conflicts

Open browser console (F12) and run:
```javascript
const widget = document.getElementById('real-estate-chatbot-widget');
if (widget) {
  const styles = window.getComputedStyle(widget);
  console.log('Z-Index:', styles.zIndex);
  console.log('Position:', styles.position);
  console.log('Visibility:', styles.visibility);
  console.log('Display:', styles.display);
  console.log('Width:', styles.width);
  console.log('Height:', styles.height);
  console.log('Bottom:', styles.bottom);
  console.log('Right:', styles.right);
}
```

Expected output:
```
Z-Index: 999999
Position: fixed
Visibility: visible
Display: block
Width: 405px
Height: 720px
Bottom: 20px
Right: 20px
```

---

## Step 6: Test with Simplified Code

If the above steps don't work, try this simplified version:

```html
<script>
  // Simple test - just create a visible div
  const testDiv = document.createElement('div');
  testDiv.id = 'chatbot-test';
  testDiv.style.cssText = `
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
    cursor: pointer;
  `;
  testDiv.textContent = '💬';
  document.body.appendChild(testDiv);
  console.log('Test widget created');
</script>
```

If you see a red circle with 💬 in the bottom-right corner, your page can display fixed elements. The issue is with the embed.js script.

---

## Step 7: Deploy embed.js to Vercel

The embed.js file needs to be served from your Vercel deployment.

### Check if it's deployed:
```bash
vercel ls
```

### Redeploy:
```bash
git add embed.js public/embed.js
git commit -m "fix: Update embed.js with improved error handling"
git push origin main
```

Wait 1-2 minutes for Vercel to auto-deploy.

### Verify deployment:
Visit: `https://real-estate-chatbot-tau.vercel.app/embed.js`

You should see the JavaScript code.

---

## Alternative: Use Direct Iframe Method

If embed.js still doesn't work, use this simpler iframe approach:

```html
<div id="chatbot-container" style="
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 450px;
  height: 800px;
  z-index: 999999;
  border-radius: 12px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
">
  <iframe
    src="https://real-estate-chatbot-tau.vercel.app"
    style="width: 100%; height: 100%; border: none; border-radius: 12px;"
    title="Real Estate Chatbot"
    allow="geolocation; microphone; camera"
  ></iframe>
</div>
```

This method:
- ✅ Doesn't require embed.js
- ✅ Works immediately
- ✅ No JavaScript errors
- ✅ Simpler to debug

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Widget not visible | Z-index too low | Check z-index is 999999 |
| Widget behind content | Parent element has higher z-index | Use `!important` or increase z-index |
| Widget cut off | Container too small | Check width/height calculations |
| Iframe blank | Chatbot URL wrong | Verify URL is correct |
| Script errors | embed.js not deployed | Redeploy to Vercel |
| CORS errors | Cross-origin issue | Use direct iframe method |
| Multiple widgets | Script loaded twice | Check for duplicate code |

---

## Quick Diagnostic Script

Copy and paste this in browser console to get a full diagnostic:

```javascript
console.log('=== CHATBOT DIAGNOSTIC ===');
console.log('1. Script loaded:', !!window.RealEstateChatbotLoaded);
console.log('2. Config:', window.RealEstateChatbotConfig);
console.log('3. Widget element:', !!document.getElementById('real-estate-chatbot-widget'));
console.log('4. Iframe element:', !!document.getElementById('real-estate-chatbot-iframe'));

const widget = document.getElementById('real-estate-chatbot-widget');
if (widget) {
  const styles = window.getComputedStyle(widget);
  console.log('5. Widget styles:', {
    position: styles.position,
    zIndex: styles.zIndex,
    width: styles.width,
    height: styles.height,
    bottom: styles.bottom,
    right: styles.right,
    display: styles.display,
    visibility: styles.visibility
  });
}

const iframe = document.getElementById('real-estate-chatbot-iframe');
if (iframe) {
  console.log('6. Iframe src:', iframe.src);
  console.log('7. Iframe loaded:', iframe.complete);
}

console.log('=== END DIAGNOSTIC ===');
```

---

## Still Not Working?

1. **Clear browser cache:** Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
2. **Try incognito/private mode:** Ctrl+Shift+N (or Cmd+Shift+N on Mac)
3. **Try different browser:** Chrome, Firefox, Safari, Edge
4. **Check website console:** Look for any JavaScript errors on your page
5. **Use direct iframe method:** See "Alternative" section above

---

## Need Help?

- **GitHub Issues:** https://github.com/grego118118/rechatbot/issues
- **Vercel Status:** https://www.vercel-status.com
- **Check Deployment:** https://vercel.com/grego118s-projects/real-estate-chatbot

