# Admin Authentication Setup

This travel agency admin panel now includes secure authentication. Here's how to set it up:

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Configuration
MONGO_DB_USERNAME=your_mongodb_username
MONGO_DB_PASSWORD=your_mongodb_password

# JWT Secret (change this to a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NODE_ENV=development
```

## Installation

1. Install the required dependencies:
```bash
npm install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
```

## Setup Process

1. **First Time Setup**: When you first visit `/admin`, you'll be redirected to `/admin/login`
2. **Create Admin Account**: If no admin exists, you'll see a setup form to create the first admin account
3. **Login**: Use your username and password to access the admin panel

## Features

- **Secure Authentication**: JWT-based authentication with httpOnly cookies
- **Password Hashing**: Passwords are securely hashed using bcrypt
- **Session Management**: Automatic session validation and logout
- **Protected Routes**: All admin routes are protected by middleware
- **Admin Info Display**: Shows current admin username and role
- **Logout Functionality**: Secure logout that clears session

## Security Features

- Passwords are hashed with bcrypt (12 salt rounds)
- JWT tokens are stored in httpOnly cookies
- Automatic token validation on each request
- Secure logout that clears cookies
- Input validation and sanitization

## API Endpoints

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin info
- `POST /api/auth/setup` - Create first admin (only works if no admin exists)

## Usage

1. Visit `/admin/login` to access the admin panel
2. Create your first admin account if none exists
3. Login with your credentials
4. Manage hotels, sea trips, and safari trips
5. Use the logout button to securely sign out

## Default Admin Credentials

The first admin account you create will have:
- Role: `super_admin`
- Full access to all admin functions
- Ability to manage all content

## Troubleshooting

- If you can't access the admin panel, check your MongoDB connection
- Ensure all environment variables are set correctly
- Make sure the JWT_SECRET is a secure random string
- Check that your MongoDB user has proper permissions 