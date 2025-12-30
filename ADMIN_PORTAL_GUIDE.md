# 🔐 Admin Portal Access Guide

## How to Access the Admin Portal

### Step 1: Access the Login Page

Open your browser and go to:
```
http://localhost:3000/admin/login
```

Or if deployed:
```
https://yourdomain.com/admin/login
```

---

## Step 2: Create Your Admin User

**Before you can login, you need to create an admin user in MongoDB.**

### Option A: Using the Setup Script (Easiest)

1. **Update the script** (`scripts/create-admin.js`):
   - Change `ADMIN_USERNAME` to your desired username
   - Change `ADMIN_PASSWORD` to your desired password
   - Update `MONGODB_URI` if needed

2. **Run the script:**
   ```bash
   node scripts/create-admin.js
   ```

### Option B: Using MongoDB Compass/CLI

1. Connect to your MongoDB database
2. Create a new document in the `admins` collection:
   ```json
   {
     "username": "admin",
     "password": "<hashed_password>"
   }
   ```
3. Hash your password using bcrypt (salt rounds: 10)

### Option C: Using Node.js REPL

```bash
node
```

Then run:
```javascript
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Connect to MongoDB
await mongoose.connect('your-mongodb-uri');

// Define schema
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String
});
const Admin = mongoose.model('Admin', AdminSchema);

// Hash password
const hashedPassword = await bcrypt.hash('your-password', 10);

// Create admin
const admin = new Admin({
  username: 'admin',
  password: hashedPassword
});
await admin.save();
console.log('Admin created!');
```

---

## Step 3: Login

1. Go to `http://localhost:3000/admin/login`
2. Enter your username and password
3. Click "Login"
4. You'll be redirected to `/admin/dashboard`

---

## Admin Portal Features

Once logged in, you can:

- **Dashboard** (`/admin/dashboard`) - Overview with stats
- **Manage Blogs** (`/admin/blogs`) - Create, edit, delete blog posts
- **Manage Projects** (`/admin/projects`) - Create, edit, delete projects
- **View Contacts** (`/admin/contacts`) - See all contact form submissions

---

## Troubleshooting

### "Invalid credentials" error
- Make sure MongoDB is running and connected
- Verify the admin user exists in the database
- Check username/password spelling

### "Login failed" error
- Check MongoDB connection string in `.env.local`
- Verify `MONGODB_URI` is correct
- Check server console for error messages

### Can't access admin routes
- Make sure you're logged in (check for `admin_token` cookie)
- Try logging out and logging back in
- Clear browser cookies and try again

---

## Security Notes

⚠️ **IMPORTANT:**
- Change the default admin password immediately
- Use a strong password
- Don't commit `.env.local` to git
- In production, use environment variables for all secrets
- Consider adding rate limiting to login endpoint
- Enable HTTPS in production

---

## Quick Setup Checklist

- [ ] MongoDB is running/connected
- [ ] `.env.local` file exists with `MONGODB_URI`
- [ ] Admin user created in database
- [ ] Dev server running (`npm run dev`)
- [ ] Can access `http://localhost:3000/admin/login`
- [ ] Can login with admin credentials

---

Need help? Check the main README.md or create an issue!

