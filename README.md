# 🌍 Tour Guide and Hotel Booking System

A comprehensive platform for booking tours and hotels with secure authentication.

## 📋 Overview

This application provides an integrated solution for travelers to discover, plan, and book tours and accommodations. The system features a responsive frontend client connected to a secure backend with robust authentication.

## ✨ Features

- **Tour Discovery & Booking**: Browse and book guided tours at various destinations
- **Hotel Reservations**: Search and book accommodations based on location and preferences
- **Duo Authentication**: Enhanced security with two-factor authentication
- **User Profiles**: Personalized accounts to track bookings and preferences
- **Payment Integration**: Secure payment processing for bookings
- **Review System**: User reviews and ratings for tours and hotels

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux for state management
- Responsive design with CSS/SASS
- Axios for API communication

### Backend
- Node.js with Express
- MongoDB database
- JWT and Duo Security authentication
- Payment gateway integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/muskandhingra7/tour-hotel-booking.git
cd tour-hotel-booking
```

2. Set up the backend
```bash
cd backend
npm install
# Configure environment variables
cp .env.example .env
# Start the server
npm run dev
```

3. Set up the frontend
```bash
cd frontend
npm install
# Configure environment variables
cp .env.example .env
# Start the development server
npm start
```

## 📁 Project Structure

```
├── backend/                  # Server-side code
│   ├── controllers/          # Request handlers
│   ├── models/               # Database schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth middleware
│   └── server.js             # Main server file
│
├── frontend/                 # Client-side code
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Application pages
│       ├── redux/            # State management
│       ├── services/         # API communication
│       └── App.js            # Main component
│
└── Downloads/complete/       # Additional resources
```

## 🔒 Authentication

The system implements a secure authentication flow using:
- JWT (JSON Web Tokens) for session management
- Duo Security for two-factor authentication
- Secure password hashing
- Role-based access control


## 🔮 Future Enhancements

- Mobile application development
- AI-powered tour recommendations
- Virtual tour experiences
- Advanced booking management system
- Multi-language support

## 👥 Contributors

- [@muskandhingra7](https://github.com/muskandhingra7) - Project Lead

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
