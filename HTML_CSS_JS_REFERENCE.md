# HTML/CSS/JS Structure Reference

## Complete Implementation Examples

### 1. Hamburger Menu - Full Structure

#### HTML (TSX)
```tsx
{/* Hamburger Button */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className="lg:hidden ... z-50"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  {/* Animated hamburger icon */}
  <span className={`... ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
  <span className={`... ${isOpen ? "opacity-0" : ""}`} />
  <span className={`... ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
</button>

{/* Backdrop Overlay */}
{isOpen && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[45]"
    onClick={() => setIsOpen(false)}
    role="button"
    tabIndex={0}
  />
)}

{/* Menu Panel */}
<nav
  id="mobile-menu"
  className={`fixed top-0 right-0 h-full ... z-50 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
  aria-hidden={!isOpen}
>
  {/* Menu content */}
</nav>
```

#### CSS (Tailwind + Custom)
```css
/* Menu Panel Constraints */
nav[id="mobile-menu"] {
  max-width: min(85vw, 320px) !important;
  width: min(85vw, 320px) !important;
  box-sizing: border-box;
  will-change: transform;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Hide when closed */
nav[id="mobile-menu"][aria-hidden="true"] {
  transform: translateX(100%) !important;
  pointer-events: none;
  visibility: hidden;
}

/* Show when open */
nav[id="mobile-menu"][aria-hidden="false"] {
  transform: translateX(0) !important;
  visibility: visible;
}
```

#### JavaScript (React Hooks)
```tsx
const [isOpen, setIsOpen] = useState(false);
const pathname = usePathname();

// Auto-close on route change
useEffect(() => {
  setIsOpen(false);
}, [pathname]);

// Handle Escape key and body scroll
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  };
  
  if (isOpen) {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
  }
  
  return () => {
    document.removeEventListener("keydown", handleEscape);
    document.body.style.overflow = "unset";
  };
}, [isOpen]);
```

---

### 2. Chatbot - Full Structure

#### HTML (TSX)
```tsx
{/* Chatbot Toggle Button */}
<button
  onClick={() => setOpen((v) => !v)}
  className="fixed bottom-4 right-4 ... z-[60]"
  style={{
    paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
    paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
  }}
  aria-expanded={open}
>
  {open ? "Close" : "Chat with Alvi Bot"}
</button>

{/* Chatbot Modal */}
{open && (
  <div 
    className="fixed ... z-[60]"
    style={{
      maxWidth: 'calc(100vw - 2rem)',
      boxSizing: 'border-box',
    }}
    role="dialog"
    aria-modal="true"
  >
    {/* Header */}
    <div className="mb-2 ... truncate">Cybersecurity Assistant</div>
    
    {/* Messages Container */}
    <div className="flex-1 ... overflow-y-auto overflow-x-hidden">
      {messages.map((m, idx) => (
        <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
          <span
            className="inline-block ... max-w-[90%] break-words"
            style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
          >
            {m.content}
          </span>
        </div>
      ))}
    </div>
    
    {/* Input Container */}
    <div className="flex gap-2 w-full">
      <input
        className="flex-1 min-w-0 ..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
      />
      <button onClick={sendMessage} disabled={loading}>
        Send
      </button>
    </div>
  </div>
)}
```

#### CSS (Responsive Widths)
```css
/* Mobile: Full-width with margins */
bottom-[4.5rem] right-4 left-4

/* Tablet: Fixed width, positioned right */
md:right-6 md:left-auto md:bottom-24 md:w-[min(calc(100vw-3rem),400px)]

/* Desktop: Larger width */
lg:w-[min(calc(100vw-4rem),480px)]

/* Ultra-wide: Maximum width */
xl:w-[min(calc(100vw-5rem),520px)]
```

#### JavaScript (Data Attribute for FloatingContacts)
```tsx
const [open, setOpen] = useState(false);

// Set data attribute when chatbot opens/closes
useState(() => {
  if (typeof document !== 'undefined') {
    if (open) {
      document.body.setAttribute('data-chatbot-open', 'true');
    } else {
      document.body.removeAttribute('data-chatbot-open');
    }
  }
});
```

---

### 3. Floating Contacts - Full Structure

#### HTML (TSX)
```tsx
<div 
  className={`fixed bottom-4 left-4 ... z-30 flex flex-col gap-2 
    transition-all duration-300 ${
      isChatbotOpen 
        ? 'opacity-0 pointer-events-none translate-y-4' 
        : 'opacity-100'
    }`}
  style={{
    paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
    paddingLeft: 'max(1rem, env(safe-area-inset-left))',
  }}
>
  {/* WhatsApp */}
  <a
    href="https://wa.me/1234567890"
    target="_blank"
    rel="noopener noreferrer"
    className="... min-h-[44px] min-w-[44px]"
  >
    <span aria-hidden="true">WA</span>
  </a>
  
  {/* Telegram */}
  <a
    href="https://t.me/your_handle"
    target="_blank"
    rel="noopener noreferrer"
    className="... min-h-[44px] min-w-[44px]"
  >
    <span aria-hidden="true">TG</span>
  </a>
</div>
```

#### JavaScript (MutationObserver)
```tsx
const [isChatbotOpen, setIsChatbotOpen] = useState(false);

useEffect(() => {
  const checkChatbotState = () => {
    const isOpen = document.body.getAttribute('data-chatbot-open') === 'true';
    setIsChatbotOpen(isOpen);
  };

  // Check initial state
  checkChatbotState();

  // Create observer for attribute changes
  const observer = new MutationObserver(checkChatbotState);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-chatbot-open']
  });

  return () => observer.disconnect();
}, []);
```

---

### 4. Responsive Typography - Fluid System

#### CSS (Clamp Function)
```css
/* H1 - Main headings */
h1 {
  font-size: clamp(1.75rem, 5vw, 3.75rem);
  /* Breakdown:
     - Minimum: 1.75rem (28px)
     - Preferred: 5vw (5% of viewport width)
     - Maximum: 3.75rem (60px)
  */
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* H2 - Section headings */
h2 {
  font-size: clamp(1.25rem, 4vw, 2.25rem);
  /* 20px → 4vw → 36px */
}

/* Paragraph */
p {
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  /* 14px → 1.2vw → 16px */
  line-height: 1.7;
}
```

#### Usage in Components
```tsx
{/* H1 automatically scales */}
<h1>Sheikh Abdullah Alvi</h1>

{/* Additional responsive classes if needed */}
<p className="text-xs sm:text-sm md:text-base lg:text-lg">
  Responsive paragraph with Tailwind breakpoints
</p>
```

---

### 5. Overflow Prevention - Complete System

#### CSS (Global Rules)
```css
/* HTML root */
html {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
}

/* Body */
body {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
}

/* All major containers */
main, section, div, header, footer {
  max-width: 100%;
  overflow-x: hidden;
}

/* Universal constraint (optional, can cause issues with some layouts) */
* {
  max-width: 100%;
}

/* Container with safe max-width */
.container {
  width: 100%;
  max-width: min(100%, 1440px);
  overflow-x: hidden;
  box-sizing: border-box;
}
```

#### Debugging Horizontal Scroll
```css
/* Temporary debug styles - add to globals.css */
* {
  outline: 1px solid red !important;
}

/* OR check each element individually */
body > * {
  outline: 2px solid blue !important;
}
```

```javascript
// JavaScript to find overflowing element
function findOverflowingElements() {
  const all = document.querySelectorAll('*');
  const overflowing = [];
  
  all.forEach(el => {
    if (el.scrollWidth > document.documentElement.clientWidth) {
      overflowing.push({
        element: el,
        scrollWidth: el.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        overflow: el.scrollWidth - document.documentElement.clientWidth
      });
    }
  });
  
  console.table(overflowing);
}

findOverflowingElements();
```

---

### 6. Safe Area Support - iOS Notch

#### Viewport Meta Tag (layout.tsx)
```tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // ← Critical for safe area
  colorScheme: "dark",
};
```

#### CSS Classes
```css
/* All sides */
.safe-area-padding {
  padding-top: env(safe-area-inset-top, 0);
  padding-right: env(safe-area-inset-right, 0);
  padding-bottom: env(safe-area-inset-bottom, 0);
  padding-left: env(safe-area-inset-left, 0);
}

/* Top only (header) */
.safe-area-top {
  padding-top: max(env(safe-area-inset-top), 0px);
  padding-left: max(env(safe-area-inset-left), 0px);
  padding-right: max(env(safe-area-inset-right), 0px);
}

/* Bottom only (footer, buttons) */
.safe-area-bottom {
  padding-bottom: max(env(safe-area-inset-bottom), 0px);
  padding-left: max(env(safe-area-inset-left), 0px);
  padding-right: max(env(safe-area-inset-right), 0px);
}
```

#### Inline Styles (Dynamic Elements)
```tsx
// Chatbot button
<button
  style={{
    paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
    paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
  }}
>
  Chat
</button>

// Floating contacts
<div
  style={{
    paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
    paddingLeft: 'max(1rem, env(safe-area-inset-left))',
  }}
>
  {/* Buttons */}
</div>
```

---

### 7. Mobile-First Media Queries

#### Breakpoint System
```css
/* Base styles (mobile-first) - no media query needed */
.element {
  font-size: 14px;
  padding: 1rem;
}

/* Tablet portrait (≥600px) */
@media (min-width: 600px) {
  .element {
    font-size: 16px;
    padding: 1.5rem;
  }
}

/* Laptop (≥1024px) */
@media (min-width: 1024px) {
  .element {
    font-size: 18px;
    padding: 2rem;
  }
}

/* Desktop (≥1440px) */
@media (min-width: 1440px) {
  .element {
    font-size: 20px;
    padding: 3rem;
  }
}
```

#### Tailwind Responsive Classes
```tsx
// Mobile-first approach
<div className="
  text-sm      {/* Mobile: 14px */}
  sm:text-base {/* ≥640px: 16px */}
  md:text-lg   {/* ≥768px: 18px */}
  lg:text-xl   {/* ≥1024px: 20px */}
  xl:text-2xl  {/* ≥1280px: 24px */}
">
  Responsive text
</div>

// Spacing
<div className="
  p-4          {/* Mobile: 1rem */}
  sm:p-5       {/* ≥640px: 1.25rem */}
  md:p-6       {/* ≥768px: 1.5rem */}
  lg:p-8       {/* ≥1024px: 2rem */}
">
  Responsive padding
</div>

// Layout
<div className="
  grid
  grid-cols-1     {/* Mobile: 1 column */}
  sm:grid-cols-2  {/* ≥640px: 2 columns */}
  lg:grid-cols-3  {/* ≥1024px: 3 columns */}
">
  Responsive grid
</div>
```

---

### 8. Touch Targets - WCAG Compliance

#### Minimum Size Rules
```css
/* All interactive elements */
button, a {
  min-height: 44px;
  min-width: 44px;
}
```

#### Tailwind Classes
```tsx
// Button with guaranteed touch target
<button className="
  min-h-[44px]  {/* Minimum height */}
  min-w-[44px]  {/* Minimum width */}
  px-4 py-2     {/* Comfortable padding */}
">
  Click me
</button>

// Link with touch target
<a className="
  inline-flex items-center justify-center
  min-h-[44px] min-w-[44px]
  px-5 py-3
">
  Learn more
</a>

// Small icon button - still 44x44px
<button className="
  w-11 h-11      {/* 44px x 44px */}
  sm:w-12 sm:h-12 {/* 48px x 48px on larger screens */}
  flex items-center justify-center
">
  <Icon />
</button>
```

---

### 9. Smooth Animations

#### CSS Transitions
```css
/* Element that slides in */
.slide-in {
  transition: transform 300ms ease-in-out;
  transform: translateX(100%);
}

.slide-in.active {
  transform: translateX(0);
}

/* Element that fades */
.fade {
  transition: opacity 300ms, transform 300ms;
  opacity: 0;
  transform: translateY(10px);
}

.fade.active {
  opacity: 1;
  transform: translateY(0);
}

/* Scale on hover */
.scale-hover {
  transition: transform 200ms ease-out;
}

.scale-hover:hover {
  transform: scale(1.05);
}

.scale-hover:active {
  transform: scale(0.95);
}
```

#### Tailwind Transition Classes
```tsx
// Hamburger menu panel
<nav className="
  transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : 'translate-x-full'}
">
  Menu
</nav>

// Floating contacts
<div className="
  transition-all duration-300
  ${isChatbotOpen 
    ? 'opacity-0 pointer-events-none translate-y-4' 
    : 'opacity-100'
  }
">
  Contacts
</div>

// Button hover effects
<button className="
  transition-all duration-200
  hover:scale-105
  active:scale-95
">
  Hover me
</button>
```

---

## Complete Page Example

```tsx
// app/page.tsx - Responsive homepage
export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="
        mt-4 sm:mt-6 md:mt-10
        grid gap-4 sm:gap-6 md:gap-8 lg:gap-10
        lg:grid-cols-[1.5fr,1fr]
        items-start lg:items-center
        overflow-x-hidden max-w-full
      ">
        <div className="w-full overflow-x-hidden">
          <h1 className="break-words hyphens-auto">
            Sheikh Abdullah <span className="text-accent">Alvi</span>
          </h1>
          
          <p className="mt-3 sm:mt-4 max-w-full break-words">
            Red Team Operator and cybersecurity expert.
          </p>
          
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            <Link
              href="/contact"
              className="
                rounded-lg bg-accent
                px-4 sm:px-5 py-2.5 sm:py-3
                font-semibold text-white
                shadow-accent-glow
                hover:bg-red-500
                transition-all hover:scale-105 active:scale-95
                min-h-[44px]
                inline-flex items-center justify-center
                whitespace-nowrap
              "
            >
              Contact Alvi
            </Link>
          </div>
        </div>
      </section>

      {/* Floating components */}
      <ChatbotWidget />
      <FloatingContacts />
    </>
  );
}
```

---

## Validation Snippets

### Check Horizontal Scroll
```javascript
// Run in browser console
const hasHorizontalScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
console.log('Has horizontal scroll:', hasHorizontalScroll);
```

### Check Z-Index Stacking
```javascript
// Get z-index of all fixed/absolute elements
const fixedElements = document.querySelectorAll('[class*="fixed"], [class*="absolute"]');
fixedElements.forEach(el => {
  const zIndex = window.getComputedStyle(el).zIndex;
  console.log(el.className, 'z-index:', zIndex);
});
```

### Check Touch Targets
```javascript
// Find elements smaller than 44x44px
const interactive = document.querySelectorAll('button, a, [role="button"]');
interactive.forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.width < 44 || rect.height < 44) {
    console.warn('Small touch target:', el, `${rect.width}x${rect.height}`);
  }
});
```

---

**Reference Version**: 1.0  
**Last Updated**: December 30, 2025  
**Maintained By**: Senior Frontend Engineer & UX/UI Specialist
