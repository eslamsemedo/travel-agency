const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// MongoDB connection string (update with your credentials)
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ozonecluster.xtb3u.mongodb.net/travel-agency?retryWrites=true&w=majority&appName=ozoneCluster`;

// Admin schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.username);
      process.exit(0);
    }

    // Create admin account
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@travelagency.com',
      role: 'super_admin'
    });

    await admin.save();
    console.log('✅ Admin account created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@travelagency.com');
    console.log('Role: super_admin');

  } catch (error) {
    console.error('Error setting up admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

setupAdmin(); 