# Urban Sustainability Dashboard

A full-stack web application for monitoring and analyzing urban sustainability metrics including air quality, traffic, energy consumption, water usage, and waste management.

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- Leaflet (for maps)
- Recharts (for data visualization)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- CORS enabled

## Project Structure
```
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend server
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment
- Frontend is configured for deployment on Vercel
- Backend is configured for deployment on Railway

## API Endpoints
- `/api/auth` - Authentication routes
- `/api/community` - Community features
- `/api/air-quality` - Air quality data
- `/api/traffic` - Traffic data
- `/api/energy` - Energy consumption data
- `/api/water` - Water usage data
- `/api/waste` - Waste management data

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 