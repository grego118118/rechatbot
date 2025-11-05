# ⚡ Quick Diagnostic Reference Card

## 🚀 Quick Start (30 seconds)

### 1. Open Browser Console
- **Chrome/Edge/Firefox:** Press **F12**
- **Safari:** Press **Cmd+Option+I**

### 2. Go to Console Tab
- Click the **"Console"** tab at the top of DevTools

### 3. Copy-Paste This Command
```javascript
const c=document.getElementById('real-estate-chatbot-widget');const i=document.getElementById('real-estate-chatbot-iframe');console.log('Container:',c?'✅ Found':'❌ Missing');console.log('Iframe:',i?'✅ Found':'❌ Missing');console.log('Container pointer-events:',c?window.getComputedStyle(c).pointerEvents:'N/A');console.log('Iframe pointer-events:',i?window.getComputedStyle(i).pointerEvents:'N/A');
```

### 4. Press Enter

### 5. Share the Output

---

## ✅ Expected Output

```
Container: ✅ Found
Iframe: ✅ Found
Container pointer-events: none
Iframe pointer-events: auto
```

---

## ❌ If You See Different Output

### Container: ❌ Missing
- Widget didn't load
- **Fix:** Hard refresh (Ctrl+Shift+R)

### Container pointer-events: auto
- CSS not applied correctly
- **Fix:** Clear cache and hard refresh

### Iframe pointer-events: none
- Iframe can't capture clicks
- **Fix:** Clear cache and hard refresh

---

## 🔄 Cache Clearing (1 minute)

### Chrome/Edge
1. Press **F12**
2. Right-click **Refresh button**
3. Select **"Empty cache and hard refresh"**
4. Wait 30 seconds

### Firefox
1. Press **Ctrl+Shift+R**
2. Wait 30 seconds

### Safari
1. Click **Develop** → **Empty Caches**
2. Press **Cmd+Shift+R**
3. Wait 30 seconds

---

## 🧪 Full Diagnostic (2 minutes)

### Step 1: Check Version
```javascript
fetch('https://real-estate-chatbot-tau.vercel.app/embed.js')
  .then(r => r.text())
  .then(t => console.log(t.includes('width: 0') ? '✅ NEW' : '❌ OLD'));
```

### Step 2: Check Elements
```javascript
const c=document.getElementById('real-estate-chatbot-widget');
const i=document.getElementById('real-estate-chatbot-iframe');
console.log('Container:',c?'✅':'❌');
console.log('Iframe:',i?'✅':'❌');
```

### Step 3: Check Styles
```javascript
const c=document.getElementById('real-estate-chatbot-widget');
const i=document.getElementById('real-estate-chatbot-iframe');
console.log('Container pointer-events:',window.getComputedStyle(c).pointerEvents);
console.log('Iframe pointer-events:',window.getComputedStyle(i).pointerEvents);
```

### Step 4: Check Dimensions
```javascript
const c=document.getElementById('real-estate-chatbot-widget');
const i=document.getElementById('real-estate-chatbot-iframe');
console.log('Container size:',window.getComputedStyle(c).width,window.getComputedStyle(c).height);
console.log('Iframe size:',window.getComputedStyle(i).width,window.getComputedStyle(i).height);
```

---

## 📋 Checklist

- [ ] Opened browser console (F12)
- [ ] Went to Console tab
- [ ] Ran quick diagnostic command
- [ ] Saw expected output
- [ ] Hard refreshed page (Ctrl+Shift+R)
- [ ] Cleared cache
- [ ] Tested "View all my listings" button
- [ ] Tested chat button (💬)
- [ ] Shared console output

---

## 🎯 What to Share

1. **Console output** (copy-paste or screenshot)
2. **Browser name** (Chrome, Firefox, Edge, Safari)
3. **Operating system** (Windows, Mac, Linux)
4. **Did you hard refresh?** (Yes/No)
5. **Did you clear cache?** (Yes/No)

---

## 📞 Resources

- **Full Guide:** BROWSER_CONSOLE_DIAGNOSTIC_GUIDE.md
- **Troubleshooting:** CLICK_BLOCKING_TROUBLESHOOTING.md
- **Technical Details:** CLICK_BLOCKING_FIX.md
- **Verification:** DEPLOYMENT_VERIFICATION_GUIDE.md

---

## 🆘 Still Stuck?

1. Try **Incognito/Private mode** (bypasses cache)
2. Try **different browser**
3. Try **different device**
4. Share **full console output** with me

---

## ⏱️ Deployment Status

✅ **Latest embed.js deployed** (commit 93a8b1e)
✅ **Vercel CDN updated**
✅ **Ready for testing**

**Note:** CDN cache may take 5-10 minutes to fully propagate globally.

