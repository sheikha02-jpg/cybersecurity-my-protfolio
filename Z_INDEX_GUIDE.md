# Z-Index Quick Reference Guide

## Visual Stacking Order (Bottom to Top)

```
┌────────────────────────────────────────────────┐
│  z-60: CHATBOT (Button & Modal)               │ ← HIGHEST LAYER
│  • Always on top                               │
│  • Files: ChatbotWidget.tsx                    │
│  • Classes: z-[60]                             │
├────────────────────────────────────────────────┤
│  z-50: HAMBURGER MENU (Panel & Button)        │
│  • Below chatbot, above everything else        │
│  • Files: HamburgerMenu.tsx                    │
│  • Classes: z-50                               │
├────────────────────────────────────────────────┤
│  z-45: HAMBURGER BACKDROP                      │
│  • Dark overlay behind menu                    │
│  • Files: HamburgerMenu.tsx                    │
│  • Classes: z-[45]                             │
├────────────────────────────────────────────────┤
│  z-30: FLOATING CONTACTS (WhatsApp/Telegram)  │
│  • Below chatbot and menu                      │
│  • Hides when chatbot opens                    │
│  • Files: FloatingContacts.tsx                 │
│  • Classes: z-30                               │
├────────────────────────────────────────────────┤
│  z-10: STICKY HEADER                           │
│  • Stays at top on scroll                      │
│  • Files: layout.tsx                           │
│  • (Future use - currently using z-30)         │
├────────────────────────────────────────────────┤
│  z-0: PAGE CONTENT (Default)                   │
│  • All normal page content                     │
│  • Sections, cards, text, images               │
└────────────────────────────────────────────────┘
```

## Critical Rules

### 🔴 NEVER EXCEED Z-60
The chatbot MUST always be the top layer. Do not create any element with z-index > 60.

### 🟡 RESERVED LAYERS
- **z-60**: Chatbot only
- **z-50**: Menu only
- **z-45**: Menu backdrop only
- **z-30**: Floating contacts only

### 🟢 AVAILABLE LAYERS
- **z-40**: Available for future use
- **z-20**: Available for dropdowns, tooltips
- **z-10**: Available for sticky elements

## Component Integration

### Chatbot ↔ Floating Contacts
```
Chatbot opens → sets data-chatbot-open="true" on body
              → FloatingContacts detects via MutationObserver
              → Floating contacts fade out (opacity-0, pointer-events-none)
```

### Hamburger Menu ↔ Body Scroll
```
Menu opens → document.body.style.overflow = "hidden"
           → Prevents background scrolling

Menu closes → document.body.style.overflow = "unset"
            → Re-enables scrolling
```

## Responsive Z-Index Behavior

### Mobile (<1024px)
- ✅ Hamburger menu visible (z-50)
- ✅ Chatbot visible (z-60)
- ✅ Floating contacts visible (z-30)
- ❌ Desktop nav hidden

### Desktop (≥1024px)
- ❌ Hamburger menu hidden
- ✅ Chatbot visible (z-60)
- ✅ Floating contacts visible (z-30)
- ✅ Desktop nav visible (no z-index needed)

## Testing Z-Index

### Quick Visual Test
1. Open chatbot → should be on top
2. Keep chatbot open, try to open menu
3. Chatbot should remain fully visible
4. Floating contacts should be hidden

### Browser DevTools
```javascript
// Check z-index of an element
window.getComputedStyle(document.querySelector('[data-component="chatbot"]')).zIndex

// Expected outputs:
// Chatbot: "60"
// Menu: "50"
// Menu backdrop: "45"
// Floating contacts: "30"
```

## Troubleshooting

### Issue: Chatbot disappears behind menu
**Cause**: Menu z-index is higher than chatbot  
**Fix**: Ensure menu is z-50, chatbot is z-60

### Issue: Can't click floating contacts
**Cause**: Another layer is blocking pointer events  
**Fix**: Check z-index hierarchy, ensure nothing is at z-35-39

### Issue: Chatbot won't hide floating contacts
**Cause**: MutationObserver not working  
**Fix**: Check `data-chatbot-open` attribute is being set on body

## File Locations

| Component | File | Z-Index |
|-----------|------|---------|
| Chatbot button | `components/ChatbotWidget.tsx` | z-60 |
| Chatbot modal | `components/ChatbotWidget.tsx` | z-60 |
| Menu button | `components/HamburgerMenu.tsx` | z-50 |
| Menu panel | `components/HamburgerMenu.tsx` | z-50 |
| Menu backdrop | `components/HamburgerMenu.tsx` | z-45 |
| WhatsApp button | `components/FloatingContacts.tsx` | z-30 |
| Telegram button | `components/FloatingContacts.tsx` | z-30 |
| Header | `app/layout.tsx` | z-30 |

## Future Additions

When adding new overlays, modals, or fixed elements:

1. **Determine layer**: What should it appear above/below?
2. **Check available z-index**: Use z-10, z-20, or z-40
3. **Update this guide**: Add to the table and visual diagram
4. **Test interactions**: Ensure no conflicts with existing layers
5. **Document in code**: Add comment explaining z-index choice

---

**Last Updated**: December 30, 2025  
**Maintained By**: Senior Frontend Engineer
