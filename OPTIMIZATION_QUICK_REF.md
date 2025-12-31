# 🚀 QUICK OPTIMIZATION REFERENCE

**Status:** ✅ Production-Ready  
**Date:** January 2025

---

## 📦 NEW COMPONENTS

### Container Component
```tsx
import Container from '@/components/Container';

// Standard wrapper (1440px max)
<Container>
  <YourContent />
</Container>

// Narrow (800px - blogs, articles)
<Container size="narrow">
  <BlogPost />
</Container>

// Wide (1600px - dashboards, tables)
<Container size="wide">
  <Dashboard />
</Container>

// Custom semantic HTML
<Container as="section" className="bg-neutral-900">
  <Content />
</Container>
```

### Error Boundary
```tsx
import ErrorBoundary from '@/components/ErrorBoundary';

// Wrap entire app (already in layout.tsx)
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Wrap unstable components
<ErrorBoundary>
  <ThirdPartyWidget />
</ErrorBoundary>

// Custom fallback UI
<ErrorBoundary fallback={<div>Oops!</div>}>
  <Component />
</ErrorBoundary>
```

---

## 🎨 CSS UTILITIES

### Wrapper Classes
```css
.wrapper         /* 1440px max, responsive padding */
.wrapper-narrow  /* 800px max (text-heavy content) */
.wrapper-wide    /* 1600px max (dashboards) */
```

### Global Media Rules
```css
/* All images/videos are responsive by default */
img, video, picture, svg {
  max-width: 100% !important;
  height: auto !important;
  display: block;
  object-fit: cover;
}
```

---

## 🔒 SECURITY

### Input Sanitization
```tsx
import { sanitizeText, sanitizeHtml, isValidEmail } from '@/lib/sanitize';

const clean = sanitizeText(userInput);     // Remove HTML tags
const cleanHtml = sanitizeHtml(content);   // Remove scripts
const valid = isValidEmail(email);         // Validate email
```

### Headers (Automatic)
- ✅ CSP (Content-Security-Policy)
- ✅ HSTS (Strict-Transport-Security)
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection
- ✅ X-Content-Type-Options: nosniff

---

## 📱 RESPONSIVE BREAKPOINTS

```
320px   → Mobile (min)
768px   → Tablet
1024px  → Desktop (hamburger → horizontal nav)
1440px  → Max content width (default)
3840px  → 4K support
```

---

## 🎯 Z-INDEX HIERARCHY

```
1000000  → Hamburger button
999999   → Hamburger overlay
999998   → Hamburger backdrop
50       → Chatbot widget
30       → Sticky header
0        → Base content
```

---

## ⚡ PERFORMANCE FEATURES

✅ SWC Minification (Rust-based, faster than Terser)  
✅ CSS Optimization (minified stylesheets)  
✅ Tree-Shaking (removes unused code)  
✅ Code Splitting (vendor/common chunks)  
✅ Image Optimization (AVIF/WebP, 9 device sizes)  
✅ 1-Year Cache (static assets)  
✅ Console Removal (production builds)  
✅ Gzip Compression

---

## 🧪 TESTING CHECKLIST

```bash
# Build for production
npm run build

# Run production server locally
npm run start

# Lighthouse audit
lighthouse http://localhost:3000 --view

# Test responsive (DevTools)
320px, 768px, 1024px, 1440px, 3840px

# Test devices
iPhone SE, iPhone 14, iPad, Desktop, 4K
```

---

## 🌐 DEPLOYMENT

### Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-...
```

### Deploy Commands
```bash
# Vercel (recommended)
vercel --prod

# Manual
npm run build
npm run start  # Port 3000
```

---

## 📊 TARGET METRICS

```
Lighthouse Performance:     90+
Lighthouse Accessibility:   95+
Lighthouse Best Practices:  100
Lighthouse SEO:             95+

FCP (First Contentful Paint):  < 1.5s
LCP (Largest Contentful Paint): < 2.5s
TTI (Time to Interactive):      < 3.5s
CLS (Cumulative Layout Shift):  < 0.1
TBT (Total Blocking Time):      < 200ms
```

---

## 🔧 KEY FILES

```
next.config.js              → Performance config
middleware.ts               → Security headers
app/globals.css             → Responsive system
app/layout.tsx              → Root layout + ErrorBoundary
components/Container.tsx    → Max-width wrappers
components/ErrorBoundary.tsx → Error handling
lib/sanitize.ts             → XSS prevention
```

---

## 🐛 DEBUGGING

### Check Errors
```tsx
// Development mode: errors show in ErrorBoundary UI
// Check browser console for stack traces

// Production mode: errors hidden from users
// Set up Sentry/LogRocket for error tracking
```

### Common Issues
```
Issue: Horizontal scroll
Fix: Check for fixed widths (use max-width instead)

Issue: Content too wide
Fix: Wrap in <Container> component

Issue: Images stretched
Fix: Already fixed globally (object-fit: cover)

Issue: Menu behind content
Fix: Already fixed (z-index 999999, body level)
```

---

## ✅ VERIFICATION

**Before deploying, verify:**
- [ ] No TypeScript errors (`npm run build`)
- [ ] No console warnings (browser DevTools)
- [ ] Hamburger menu works on mobile
- [ ] No horizontal scroll (320px - 4K)
- [ ] All images responsive
- [ ] Error boundary shows on crashes
- [ ] Safe area padding on iOS devices

---

**Documentation:**  
📖 Full Audit: `PRODUCTION_OPTIMIZATION_AUDIT.md`  
📖 This Guide: `OPTIMIZATION_QUICK_REF.md`

**Status:** ✅ Production-Ready  
**Last Updated:** January 2025
