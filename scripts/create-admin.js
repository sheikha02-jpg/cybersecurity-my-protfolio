/**
 * Script to create an admin user in MongoDB
 * Run this with: node scripts/create-admin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection - update this with your connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alvi-portfolio';

// Admin credentials - CHANGE THESE!
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'changeme123'; // CHANGE THIS PASSWORD!

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define Admin schema (same as models/Admin.ts)
    const AdminSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('To update password, delete the existing admin first or use a different username.');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create admin user
    const admin = new Admin({
      username: ADMIN_USERNAME,
      password: hashedPassword,
    });

    await admin.save();
    console.log('\n✅ Admin user created successfully!');
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log('\n⚠️  IMPORTANT: Change the password in production!');
    console.log('⚠️  Update ADMIN_PASSWORD in this script and run it again to change password.\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

