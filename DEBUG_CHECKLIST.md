# ✅ Chatbot Embed - Debug Checklist

Use this checklist to systematically troubleshoot your chatbot embed issue.

---

## 📋 Pre-Flight Checks

- [ ] Code is placed **before** the closing `</body>` tag
- [ ] No typos in the chatbot URL
- [ ] Website is accessible (not behind authentication)
- [ ] Browser is up-to-date (Chrome, Firefox, Safari, Edge)
- [ ] JavaScript is enabled in browser settings

---

## 🔍 Step 1: Verify Script Placement

**Action:** View your website's HTML source code

**How to check:**
1. Right-click on your website → **View Page Source** (or Ctrl+U)
2. Press Ctrl+F and search for `RealEstateChatbotConfig`
3. Verify the code is **before** `</body>` tag

**Expected result:**
```html
<script>
  window.RealEstateChatbotConfig = {
    chatbotUrl: 'https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app'
  };
</script>
<script src="https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js"></script>
</body>
```

**If not found:**
- [ ] Code was not added correctly
- [ ] Try adding it again, making sure it's before `</body>`

---

## 🖥️ Step 2: Open Browser Console

**Action:** Open Developer Tools

**How to open:**
- **Windows/Linux:** Press `F12` or `Ctrl+Shift+I`
- **Mac:** Press `Cmd+Option+I`

**Navigate to:** Console tab

---

## 📊 Step 3: Check for Success Messages

**Action:** Look at the console output

**Expected success messages:**
```
✅ Real Estate Chatbot widget loaded successfully
📍 Chatbot URL: https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app
📌 Position: bottom-right
🎨 Theme: light
📦 Widget ID: real-estate-chatbot-widget
```

**If you see these:**
- [ ] ✅ Script loaded successfully
- [ ] Go to Step 5 (Check if widget is visible)

**If you don't see these:**
- [ ] ❌ Script didn't load
- [ ] Go to Step 4 (Check for errors)

---

## 🚨 Step 4: Check for Error Messages

**Action:** Look for red error messages in console

**Common errors and fixes:**

### Error: "Failed to load script"
```
GET https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app/embed.js 404
```
**Fix:**
- [ ] Verify Vercel deployment is complete
- [ ] Run: `vercel ls` to check deployment status
- [ ] Wait 2-3 minutes for deployment to complete
- [ ] Refresh page (Ctrl+F5 to clear cache)

### Error: "CORS error"
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:**
- [ ] Use the **Direct Iframe Method** instead (see EMBED_IFRAME_METHOD.md)
- [ ] This is more reliable and doesn't have CORS issues

### Error: "Uncaught SyntaxError"
```
Uncaught SyntaxError: Unexpected token
```
**Fix:**
- [ ] embed.js file may be corrupted
- [ ] Redeploy: `git push origin main`
- [ ] Wait for Vercel to deploy
- [ ] Refresh page

### Error: "RealEstateChatbotConfig is not defined"
```
Uncaught ReferenceError: RealEstateChatbotConfig is not defined
```
**Fix:**
- [ ] Configuration script is missing or in wrong order
- [ ] Make sure config script comes **before** embed.js script
- [ ] Check for typos in variable name

---

## 👁️ Step 5: Check if Widget is Visible

**Action:** Look at your website

**Expected result:**
- [ ] 💬 button appears in bottom-right corner
- [ ] Button is clickable
- [ ] Chat opens when clicked

**If widget is not visible:**
- [ ] Go to Step 6 (Check DOM elements)

**If widget is visible but doesn't work:**
- [ ] Go to Step 7 (Check iframe)

---

## 🔎 Step 6: Check DOM Elements

**Action:** Run this in browser console:

```javascript
const widget = document.getElementById('real-estate-chatbot-widget');
console.log('Widget exists:', !!widget);
console.log('Widget element:', widget);
```

**Expected result:**
```
Widget exists: true
Widget element: <div id="real-estate-chatbot-widget" ...>
```

**If widget doesn't exist:**
- [ ] Script didn't run
- [ ] Go back to Step 4 and check for errors

**If widget exists but not visible:**
- [ ] Go to Step 8 (Check CSS styles)

---

## 🎬 Step 7: Check Iframe

**Action:** Run this in browser console:

```javascript
const iframe = document.getElementById('real-estate-chatbot-iframe');
console.log('Iframe exists:', !!iframe);
console.log('Iframe src:', iframe?.src);
console.log('Iframe loaded:', iframe?.complete);
```

**Expected result:**
```
Iframe exists: true
Iframe src: https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app
Iframe loaded: true
```

**If iframe doesn't exist:**
- [ ] Widget container exists but iframe wasn't created
- [ ] Check for JavaScript errors in Step 4

**If iframe src is wrong:**
- [ ] Check your configuration
- [ ] Verify chatbotUrl is correct

**If iframe won't load:**
- [ ] Chatbot URL might be down
- [ ] Try visiting URL directly: https://real-estate-chatbot-jrzolnpil-grego118s-projects.vercel.app

---

## 🎨 Step 8: Check CSS Styles

**Action:** Run this in browser console:

```javascript
const widget = document.getElementById('real-estate-chatbot-widget');
if (widget) {
  const styles = window.getComputedStyle(widget);
  console.log({
    position: styles.position,
    zIndex: styles.zIndex,
    width: styles.width,
    height: styles.height,
    bottom: styles.bottom,
    right: styles.right,
    display: styles.display,
    visibility: styles.visibility,
    opacity: styles.opacity
  });
}
```

**Expected result:**
```
{
  position: "fixed",
  zIndex: "999999",
  width: "405px",
  height: "720px",
  bottom: "20px",
  right: "20px",
  display: "block",
  visibility: "visible",
  opacity: "1"
}
```

**If values are wrong:**
- [ ] Check for CSS conflicts on your page
- [ ] Look for CSS rules that override the widget styles
- [ ] Try using `!important` in styles

**If display is "none":**
- [ ] Widget is hidden by CSS
- [ ] Check your page's CSS for conflicts

**If visibility is "hidden":**
- [ ] Widget is hidden
- [ ] Check your page's CSS for conflicts

**If opacity is "0":**
- [ ] Widget is transparent
- [ ] Check your page's CSS for conflicts

---

## 🧪 Step 9: Test with Simplified Code

**Action:** Add this test code to your page:

```html
<script>
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
  `;
  testDiv.textContent = '💬';
  document.body.appendChild(testDiv);
  console.log('Test widget created');
</script>
```

**Expected result:**
- [ ] Red circle with 💬 appears in bottom-right corner

**If test widget appears:**
- [ ] Your page can display fixed elements
- [ ] Issue is with embed.js or configuration
- [ ] Try the **Direct Iframe Method** (EMBED_IFRAME_METHOD.md)

**If test widget doesn't appear:**
- [ ] Your page has CSS that prevents fixed elements
- [ ] Check your page's CSS for `position: fixed` conflicts

---

## 🔄 Step 10: Try Alternative Method

**Action:** Use the Direct Iframe Method instead

**How:**
1. Remove the embed.js code
2. Add the iframe code from EMBED_IFRAME_METHOD.md
3. Refresh page

**Expected result:**
- [ ] Chatbot widget appears immediately
- [ ] No JavaScript errors

---

## 📝 Summary

**If you completed all steps:**

- [ ] Widget appears and works → ✅ **Success!**
- [ ] Widget appears but doesn't work → Check iframe loading
- [ ] Widget doesn't appear → Use Direct Iframe Method
- [ ] Still having issues → Check TROUBLESHOOTING_GUIDE.md

---

## 🆘 Still Not Working?

1. **Clear cache:** Ctrl+Shift+Delete
2. **Try incognito:** Ctrl+Shift+N
3. **Try different browser:** Chrome, Firefox, Safari, Edge
4. **Use Direct Iframe Method:** See EMBED_IFRAME_METHOD.md
5. **Check Vercel deployment:** https://vercel.com/grego118s-projects/real-estate-chatbot

---

## 📞 Resources

- **Troubleshooting Guide:** TROUBLESHOOTING_GUIDE.md
- **Iframe Method:** EMBED_IFRAME_METHOD.md
- **GitHub:** https://github.com/grego118118/rechatbot
- **Vercel Dashboard:** https://vercel.com/grego118s-projects/real-estate-chatbot

