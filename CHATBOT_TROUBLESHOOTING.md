# Chatbot Troubleshooting Guide

## Why Chatbot Might Not Be Responding

### 1. Missing OpenAI API Key

**Check:** Open `.env.local` file and verify:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Fix:**
1. Get API key from: https://platform.openai.com/api-keys
2. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-...
   ```
3. Restart dev server: `npm run dev`

### 2. API Key Not Loaded

**Check:** Restart the dev server after adding/changing `.env.local`

**Fix:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

### 3. Check Browser Console

Open browser DevTools (F12) → Console tab and look for errors:
- Network errors (404, 500)
- CORS errors
- API key errors

### 4. Check Server Terminal

Look for errors in the terminal where `npm run dev` is running:
- "OpenAI API key not configured"
- "Failed to process chat message"
- Network errors

### 5. Test API Directly

Test the API endpoint directly:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

Or use browser console:
```javascript
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

## Quick Fix Checklist

- [ ] `.env.local` file exists in project root
- [ ] `OPENAI_API_KEY` is set in `.env.local`
- [ ] API key starts with `sk-`
- [ ] Dev server restarted after adding API key
- [ ] No errors in browser console
- [ ] No errors in server terminal
- [ ] Network tab shows `/api/chat` request

## Common Error Messages

### "OpenAI API key not configured"
→ Add `OPENAI_API_KEY` to `.env.local` and restart server

### "Failed to process chat message"
→ Check API key is valid, check server logs for details

### "Connection error" or Network errors
→ Check internet connection, OpenAI API status

### CORS errors
→ Should not happen with Next.js API routes (same origin)

## Still Not Working?

1. Check browser Network tab → Find `/api/chat` request → Check response
2. Check server terminal for detailed error logs
3. Verify OpenAI API key is valid at https://platform.openai.com/api-keys
4. Make sure you have API credits/quota available

