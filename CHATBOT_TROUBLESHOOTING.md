# Chatbot Troubleshooting Guide

## Chatbot Architecture

The chatbot is **knowledge-based and offline-first**:

1. **Deterministic intent matching** against user message
2. **Knowledge lookup** from `/knowledge/*.json` files (about, services, experience, blogs)
3. **Safe fallback message** when knowledge is missing or not applicable

## Default Behavior (No Setup Required)

The chatbot works **out of the box** with:
- ✅ Built-in knowledge files under `/knowledge`
- ✅ Deterministic, rule-based intent matching
- ✅ Safe fallback for anything outside knowledge

## Why Chatbot Might Show Fallback Message

### This is **INTENTIONAL** to avoid hallucination

The bot shows the strict fallback when:
- ✅ The question is not covered by `/knowledge` files
- ✅ The intent does not match any rule
- ✅ Required knowledge file is missing or unreadable

**This is a FEATURE, not a bug** - it prevents false information.

## Managing Knowledge Files

All answers come from `/knowledge`:
- `about.json` — background, skills, tech stack
- `services.json` — services and descriptions
- `experience.json` — years, platform, focus, learning
- `blogs.json` — blog topics summary

To update answers, edit these files and restart the dev server.

## Quick Fix Checklist

- [ ] Dev server running: `npm run dev`
- [ ] Knowledge files exist in `/knowledge` and are valid JSON
- [ ] No errors in browser console (F12)
- [ ] No errors in server terminal
- [ ] Network tab shows `/api/chat` request returning 200 OK

## Testing Knowledge Paths

### Test About / Who is Alvi
"Who is Alvi?" → responds from `about.json`

### Test Experience
"What experience does Alvi have?" → responds from `experience.json`

### Test Services
"What services do you offer?" → responds from `services.json`

### Test Blog Topics
"What topics does the blog cover?" → responds from `blogs.json`

### Test Fallback
Ask anything not covered (e.g., "Where is Alvi from?") → returns the strict fallback.

## Debugging in Browser Console

```javascript
// Test the chat API directly
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'What services do you offer?' })
})
.then(r => r.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err))
```

## Still Have Issues?

1. Validate that `/knowledge` files are present and valid JSON
2. Check browser Network tab (F12) → Find `/api/chat` request
3. Check server terminal for logs
4. Confirm queries align to known intents (about, services, experience, blogs)

## Production Notes

For production deployment (Netlify/Vercel):
- ✅ No AI keys required (offline knowledge)
- ✅ Ensure `/knowledge` files are deployed with the build
- ✅ No build-time errors (no external API calls)
