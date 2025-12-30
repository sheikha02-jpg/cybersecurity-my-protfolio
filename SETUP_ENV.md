# 🔧 Environment Setup Guide

## Create `.env.local` File

You need to create a `.env.local` file in the root of your project with the following variables:

### Step 1: Create the File

Create a new file called `.env.local` in the root directory (same folder as `package.json`).

### Step 2: Add These Variables

Copy and paste this into your `.env.local` file:

```env
# MongoDB Connection
# Option 1: Local MongoDB (if installed locally)
MONGODB_URI=mongodb://localhost:27017/alvi-portfolio

# Option 2: MongoDB Atlas (cloud) - Replace with your connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alvi-portfolio

# JWT Secret for Admin Authentication (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Site URL (for SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Update the Values

**Required:**
- `MONGODB_URI` - Your MongoDB connection string
  - **Local MongoDB**: `mongodb://localhost:27017/alvi-portfolio`
  - **MongoDB Atlas**: Get your connection string from https://www.mongodb.com/cloud/atlas

**Optional (but recommended):**
- `JWT_SECRET` - Change this to a random secret string
- `NEXT_PUBLIC_SITE_URL` - Your site URL

---

## Quick Setup Options

### Option A: Use Local MongoDB

1. **Install MongoDB locally:**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use: `winget install MongoDB.Server`

2. **Start MongoDB:**
   ```bash
   # Windows (if installed as service, it starts automatically)
   # Or run: mongod
   ```

3. **Set in `.env.local`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/alvi-portfolio
   ```

### Option B: Use MongoDB Atlas (Free Cloud)

1. **Sign up:** https://www.mongodb.com/cloud/atlas/register
2. **Create a free cluster**
3. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
4. **Set in `.env.local`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alvi-portfolio
   ```
   (Replace `username`, `password`, and `cluster` with your actual values)

---

## After Creating `.env.local`

1. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **The site should now work!**

---

## Troubleshooting

### "MONGODB_URI not found" error
- Make sure `.env.local` file exists in the root directory
- Check the file name is exactly `.env.local` (not `.env.local.txt`)
- Restart the dev server after creating the file

### MongoDB connection errors
- Verify MongoDB is running (if using local)
- Check your connection string is correct
- For Atlas, make sure your IP is whitelisted

### File not found
- Make sure you're creating the file in the correct location
- The file should be next to `package.json`
- Check file extension (should be `.env.local` not `.env.local.txt`)

---

## File Location

Your `.env.local` should be here:
```
cybersecurity my protfolio/
├── .env.local          ← Create this file here
├── package.json
├── next.config.js
└── ...
```

---

Need help? The site will show warnings but still work for pages that don't need the database!

