# 🗄️ MongoDB Setup Guide

## The Error You're Seeing

```
Error: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

This means MongoDB is not running on your computer. You have **two options**:

---

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows Installation

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows x64
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - MongoDB will start automatically

3. **Verify Installation:**
   ```bash
   mongod --version
   ```

4. **MongoDB should now be running!**
   - The service starts automatically
   - Default port: `27017`
   - Your `.env.local` already has: `MONGODB_URI=mongodb://localhost:27017/alvi-portfolio`

5. **Restart your Next.js dev server:**
   ```bash
   npm run dev
   ```

---

## Option 2: Use MongoDB Atlas (Free Cloud - Easiest!)

### Step-by-Step Setup

1. **Sign Up (Free):**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Free Cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0 Sandbox)
   - Select a cloud provider and region (closest to you)
   - Click "Create"

3. **Create Database User:**
   - Username: `admin` (or your choice)
   - Password: Create a strong password (save it!)
   - Click "Create Database User"

4. **Set Network Access:**
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

5. **Get Connection String:**
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update `.env.local`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/alvi-portfolio?retryWrites=true&w=majority
   ```
   - Replace `username` and `password` with your database user credentials
   - Replace `cluster0.xxxxx` with your actual cluster name
   - Add `/alvi-portfolio` before the `?` to specify the database name

7. **Restart your dev server:**
   ```bash
   npm run dev
   ```

---

## Quick Test

After setting up MongoDB (either option), test the connection:

```bash
# If using local MongoDB
mongosh mongodb://localhost:27017/alvi-portfolio

# Or test in Node.js
node -e "require('mongoose').connect('your-connection-string').then(() => console.log('Connected!')).catch(e => console.error(e))"
```

---

## Troubleshooting

### "ECONNREFUSED" Error
- **Local MongoDB:** Make sure MongoDB service is running
  - Windows: Check Services (services.msc) for "MongoDB"
  - Or run: `net start MongoDB`
- **MongoDB Atlas:** Check your IP is whitelisted and connection string is correct

### Connection String Issues
- Make sure there are no extra spaces
- Password might have special characters - URL encode them
- Database name should be in the connection string

### Still Having Issues?
- Check MongoDB logs
- Verify `.env.local` file exists and has correct `MONGODB_URI`
- Restart your dev server after changing `.env.local`

---

## Recommendation

**For beginners:** Use **MongoDB Atlas** (Option 2) - it's free, cloud-based, and easier to set up!

**For advanced users:** Install MongoDB locally (Option 1) for faster development.

---

Once MongoDB is set up, your site will work perfectly! 🚀

