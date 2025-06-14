# Urban Sustainability Dashboard

A real-time dashboard for tracking and improving urban sustainability using MERN stack.

## Features

- Real-time air quality monitoring
- Traffic congestion tracking
- Energy and water usage analytics
- Waste management insights
- Interactive city maps
- Sustainability scoring
- Citizen engagement features

## Tech Stack

- MongoDB: Database
- Express.js: Backend framework
- React.js: Frontend framework
- Node.js: Runtime environment

## Project Structure

```
urban-sustainability-dashboard/
├── backend/           # Node.js & Express backend
├── frontend/         # React.js frontend
└── README.md
```

## Setup Instructions

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
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
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

3. Create a .env file:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

The API documentation can be found in the backend/README.md file.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 