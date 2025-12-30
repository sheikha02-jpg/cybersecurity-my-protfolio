# Complete File Reference - Cybersecurity Portfolio

## 📁 Project Structure

### Root Configuration Files
```
├── package.json              # Dependencies and scripts
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
├── .env.local                # Environment variables (create this)
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

### App Directory (Next.js App Router)
```
app/
├── layout.tsx                # Root layout with header/footer
├── page.tsx                   # Home page
├── globals.css                # Global styles and Tailwind
├── sitemap.ts                 # SEO sitemap generation
├── robots.ts                  # SEO robots.txt
│
├── skills/
│   └── page.tsx               # Skills page
│
├── services/
│   └── page.tsx               # Services page
│
├── projects/
│   ├── page.tsx               # Projects listing
│   └── [slug]/
│       └── page.tsx           # Individual project page
│
├── blog/
│   ├── page.tsx               # Blog listing
│   └── [slug]/
│       └── page.tsx           # Individual blog post
│
├── contact/
│   └── page.tsx               # Contact form page
│
├── admin/
│   ├── login/
│   │   └── page.tsx           # Admin login
│   ├── dashboard/
│   │   └── page.tsx           # Admin dashboard
│   ├── blogs/
│   │   └── page.tsx           # Manage blogs
│   ├── projects/
│   │   └── page.tsx           # Manage projects
│   ├── contacts/
│   │   └── page.tsx          # View contact messages
│   └── logout/
│       └── page.tsx           # Admin logout
│
└── api/
    ├── chat/
    │   └── route.ts           # Chatbot API (OpenAI)
    ├── contact/
    │   └── route.ts           # Contact form API
    └── admin/
        ├── login/
        │   └── route.ts       # Admin login API
        ├── logout/
        │   └── route.ts       # Admin logout API
        ├── blogs/
        │   └── route.ts       # Blog CRUD API
        ├── projects/
        │   └── route.ts       # Project CRUD API
        └── contacts/
            └── route.ts       # Contact messages API
```

### Components
```
components/
├── ChatbotWidget.tsx          # AI chatbot widget
└── FloatingContacts.tsx       # WhatsApp/Telegram buttons
```

### Library/Utilities
```
lib/
├── mongodb.ts                 # MongoDB connection handler
└── auth.ts                    # JWT authentication helper
```

### Database Models
```
models/
├── Admin.ts                   # Admin user model
├── Blog.ts                    # Blog post model
├── Contact.ts                  # Contact message model
└── Project.ts                 # Project model
```

### Scripts
```
scripts/
└── create-admin.js            # Script to create admin user
```

### Documentation
```
├── README.md                   # Main project README
├── ADMIN_PORTAL_GUIDE.md      # Admin portal setup guide
├── SETUP_ENV.md               # Environment setup guide
├── MONGODB_SETUP.md           # MongoDB setup instructions
├── INSTALL_NODEJS.md          # Node.js installation guide
├── CURSOR_AI_PROMPT.md        # Cursor AI prompt for Red Team
├── CHATBOT_TROUBLESHOOTING.md # Chatbot debugging guide
└── ALL_FILES_REFERENCE.md     # This file
```

## 🔑 Key Files for Chatbot

### 1. Chatbot API Route
**File:** `app/api/chat/route.ts`
- Handles OpenAI API calls
- Contains system prompt with Alvi's profile
- Requires `OPENAI_API_KEY` in `.env.local`

### 2. Chatbot Widget Component
**File:** `components/ChatbotWidget.tsx`
- Client-side React component
- Handles user input and displays messages
- Calls `/api/chat` endpoint

### 3. Environment Variables
**File:** `.env.local` (create this)
```env
OPENAI_API_KEY=sk-your-key-here
MONGODB_URI=mongodb://localhost:27017/alvi-portfolio
JWT_SECRET=your-secret-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🐛 Chatbot Not Working?

1. **Check `.env.local` exists** and has `OPENAI_API_KEY`
2. **Restart dev server** after adding API key
3. **Check browser console** for errors
4. **Check server terminal** for API errors
5. **Verify API key** is valid at https://platform.openai.com/api-keys

See `CHATBOT_TROUBLESHOOTING.md` for detailed debugging.

## 📝 All Created Files Summary

### Core Application (25 files)
- Next.js pages: 10 files
- API routes: 7 files
- Components: 2 files
- Models: 4 files
- Utilities: 2 files

### Configuration (6 files)
- package.json, next.config.js, tailwind.config.js, postcss.config.js, tsconfig.json, .gitignore

### Documentation (8 files)
- README.md, ADMIN_PORTAL_GUIDE.md, SETUP_ENV.md, MONGODB_SETUP.md, INSTALL_NODEJS.md, CURSOR_AI_PROMPT.md, CHATBOT_TROUBLESHOOTING.md, ALL_FILES_REFERENCE.md

### Scripts (1 file)
- scripts/create-admin.js

**Total: ~40 files created**

