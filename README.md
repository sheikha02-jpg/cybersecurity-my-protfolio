# Red Team & Cybersecurity Portfolio Website

A production-ready Next.js portfolio website for Sheikh Abdullah Alvi, showcasing red team operations, penetration testing expertise, and cybersecurity services.

## Features

- 🎨 **Dark Red Hacker-Style UI** - Professional cyberpunk aesthetic
- 🧠 **Knowledge-Based Chatbot** - Deterministic answers from local `/knowledge` JSON/MD files only
- 📝 **Dynamic Blog System** - Admin-controlled blog posts with ISR
- 🛠️ **Project Showcase** - Dynamic project portfolio
- 📧 **Contact Form** - Secure message storage
- 🔐 **Admin Portal** - Full CRUD for blogs, projects, and messages
- 📱 **WhatsApp & Telegram** - Floating contact buttons
- 🚀 **SEO Optimized** - Sitemap, robots.txt, metadata
- ⚡ **Performance** - Server Components, ISR, lazy loading
- 🛡️ **Anti-Hallucination** - Strict fallback when knowledge not found

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB (Mongoose)
- **AI**: Offline knowledge lookup (no external API required)
- **Authentication**: JWT (admin only)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secret key for admin authentication
- `NEXT_PUBLIC_SITE_URL` - Your site URL (for SEO)

**Note:** The chatbot uses only local knowledge files under `/knowledge` and requires no external AI keys.

3. **Create admin user:**

Run the provided script:
```bash
node scripts/create-admin.js
```

Or manually using MongoDB Compass/CLI:
```javascript
const bcrypt = require('bcryptjs');
const password = await bcrypt.hash('your-password', 10);
// Insert into MongoDB: { username: 'admin', password: hashedPassword }
```

4. **Update contact links:**

Edit `components/FloatingContacts.tsx` with your actual WhatsApp number and Telegram username.

5. **Run development server:**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## Admin Portal

Access the admin portal at `/admin/login`:

- Manage blog posts
- Manage projects
- View contact messages
- Full CRUD operations

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### MongoDB Atlas Setup

1. Create a free MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Add to `MONGODB_URI` in environment variables

## Project Structure

```
├── app/
│   ├── admin/          # Admin portal pages
│   ├── api/            # API routes
│   ├── blog/           # Blog pages
│   ├── projects/       # Project pages
│   ├── contact/        # Contact page
│   ├── skills/          # Skills page
│   ├── services/        # Services page
│   └── layout.tsx       # Root layout
├── components/          # React components
├── lib/                 # Utilities (MongoDB, auth)
├── models/              # Mongoose models
└── public/              # Static assets
```

## Customization

- **Colors**: Edit `tailwind.config.mjs` for theme colors
- **Content**: Update pages in `app/` directory
- **Styling**: Modify `app/globals.css` and Tailwind classes
- **Chatbot**: Update system prompt in `app/api/chat/route.ts`

## Security Notes

- Admin routes are protected with JWT authentication
- API keys stored in environment variables only
- Input validation on all forms
- Rate limiting recommended for production (add Redis)

## License

Private - All rights reserved

## Support

For issues or questions, contact via the website contact form or WhatsApp/Telegram.

