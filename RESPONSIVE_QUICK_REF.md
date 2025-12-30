# 📱 RESPONSIVE DESIGN QUICK REFERENCE

## ⚡ Key Changes at a Glance

### Viewport & Safe Areas
```tsx
// Next.js viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",        // Notch support
  colorScheme: "dark",
};

// Safe area padding for iPhone notches
<header className="safe-area-padding">
```

### Responsive Typography
```css
h1 { font-size: clamp(1.75rem, 5vw, 3.75rem); }  /* 320px → 1.75rem, 1920px → 3.75rem */
h2 { font-size: clamp(1.25rem, 4vw, 2.25rem); }
h3 { font-size: clamp(1rem, 2.5vw, 1.25rem); }
p  { font-size: clamp(0.875rem, 1.2vw, 1rem); }
```

### Responsive Padding
```css
.container {
  padding-inline: clamp(1rem, 4vw, 2rem);    /* Sides */
  padding-block: clamp(2rem, 6vw, 4rem);     /* Top/bottom */
}
```

### Mobile-First Grid
```css
/* 1 column (mobile default) */
.cards { grid-template-columns: 1fr; }

/* 2 columns (tablet) */
@media (min-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* 4 columns (desktop) */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(4, 1fr); }
}
```

### Touch-Friendly Sizes
```css
button {
  min-height: 44px;  /* WCAG AA minimum */
  min-width: 44px;
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem);
}
```

### iPhone Safari Fixes
```css
/* 100vh bug fix */
.hero { min-height: 100dvh; }

/* Prevent 100vw scroll */
html, body { width: 100%; overflow-x: hidden; }
```

---

## 📋 Device Breakpoints

```
320px  ← Extra small phones (base)
375px  ← Large phones
600px  ← Tablets portrait  ← BREAKPOINT
768px  ← Tablets landscape
1024px ← Laptops           ← BREAKPOINT
1280px ← Desktop
1440px ← Large desktop     ← BREAKPOINT
1920px ← Ultra-wide / 4K
```

**Use in code:**
```css
@media (min-width: 600px) { }   /* Tablet */
@media (min-width: 1024px) { }  /* Desktop */
@media (min-width: 1440px) { }  /* Ultra-wide */
```

---

## ✅ What Was Fixed

### Before → After

| Issue | Before | After |
|-------|--------|-------|
| Hero height | `height: 100vh` | `min-height: 100dvh` |
| Body width overflow | `width: not set` | `width: 100%; overflow-x: hidden` |
| Fixed container widths | `max-width: 1200px` | `max-width: 1440px; @media cap` |
| Button sizes | `px-4 py-2` | `min-h-[44px]; clamp()` |
| Responsive text | Fixed sizes (text-sm) | `clamp()` fluid sizing |
| Mobile nav | All 6 items visible | Hidden on mobile, 3 items shown |
| Notch support | Not handled | `viewportFit: "cover"` + safe-area |
| Touch targets | 30-40px | 44px minimum |
| Grid layout | Fixed 3fr,2fr | Responsive: 1 → 2 → 4 columns |
| Floating buttons | Fixed bottom-4 right-4 | Safe-area aware positioning |
| Chatbot modal | Fixed width (90vw) | Responsive: full width mobile, 384px+ desktop |

---

## 🎯 Responsive CSS Patterns

### Pattern 1: Responsive Padding
```css
/* Scales from 1rem to 2rem based on viewport width */
padding: clamp(1rem, 4vw, 2rem);
```

### Pattern 2: Responsive Grid
```css
/* Automatically fits columns, minimum 250px each */
grid-template-columns: repeat(auto-fit, minmax(clamp(250px, 100%, 300px), 1fr));
gap: clamp(1rem, 3vw, 2rem);
```

### Pattern 3: Responsive Typography
```css
/* Scales between min and max, responsive to viewport */
font-size: clamp(0.875rem, 1.2vw, 1rem);
```

### Pattern 4: Mobile-First Responsive
```css
/* Base: mobile */
.nav { display: none; }
.nav-mobile { display: block; }

/* Desktop: show full nav */
@media (min-width: 1024px) {
  .nav { display: flex; }
  .nav-mobile { display: none; }
}
```

### Pattern 5: Safe Area Padding
```css
/* Respects iPhone notches */
padding: env(safe-area-inset-top) env(safe-area-inset-right) 
         env(safe-area-inset-bottom) env(safe-area-inset-left);
```

---

## 🔧 Common Mobile Issues & Fixes

| Issue | Symptom | Fix |
|-------|---------|-----|
| Hero too tall | Can't see content on iPhone | Use `100dvh` instead of `100vh` |
| Horizontal scroll | Content overflow on mobile | Use `width: 100%; overflow-x: hidden` |
| Notch overlap | Content hidden behind notch | Add `viewportFit: "cover"` + safe-area |
| Tiny buttons | Hard to tap on phone | Make all buttons 44px minimum |
| Fixed width breaks | 1200px on 320px screen | Use responsive units + clamp() |
| Chatbot offscreen | Modal appears off-screen | Use `left-4 right-4` instead of fixed width |
| Text overflow | Text too large on mobile | Use `clamp()` for automatic scaling |
| Hero text unreadable | Small text on large screens | Combine `clamp()` with breakpoints |

---

## 📊 Testing Commands

### Chrome DevTools
```
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test devices:
   - iPhone SE (375px)
   - iPhone 12 (390px)
   - iPad (768px)
   - Desktop (1920px)
```

### Manual Testing Checklist
```
❏ No horizontal scroll on mobile
❏ Hero section visible without scroll
❏ Buttons reachable (44px minimum)
❏ Text readable on all sizes
❏ Notch not overlapping (iPhone)
❏ Layout stacks properly (mobile → tablet → desktop)
❏ Floating buttons don't hide content
❏ Chatbot modal fits on screen
❏ Images scale without stretching
❏ Touch interaction comfortable
```

---

## 📱 Device Testing Sizes

Copy/paste into DevTools Device list:

```
iPhone SE: 375×667
iPhone 12: 390×844
iPhone 14: 390×844
iPad: 768×1024
iPad Pro: 1024×1366
Laptop: 1440×900
Desktop: 1920×1080
4K: 2560×1440
```

---

## 🎓 Key Takeaways

1. **Mobile-first**: Start with phone, enhance for larger screens
2. **clamp()**: Use `clamp(MIN, PREFERRED, MAX)` for fluid scaling
3. **100dvh not 100vh**: iPhone address bar fix
4. **44px buttons**: WCAG AA compliant touch targets
5. **Safe areas**: Use `env(safe-area-inset-*)` for notches
6. **No 100vw**: Causes horizontal scroll; use 100% instead
7. **Flexible grids**: Use `grid-template-columns: repeat(auto-fit, minmax(...))` 
8. **Responsive padding**: Use `clamp()` for padding/margins
9. **Max-width limits**: Cap content at 70ch for readability
10. **Test everywhere**: Device DevTools + real devices

---

**Last Updated:** December 30, 2025  
**Compatibility:** All modern browsers, iOS 14+, Android 10+  
**Status:** ✅ Production Ready
