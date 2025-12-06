# Web Accessibility Analyzer

A full-stack web application for analyzing website accessibility using Lighthouse and Axe-core. This tool helps developers identify and fix accessibility issues in their web applications.

## 🚀 Features

- **Lighthouse Audits**: Comprehensive performance, accessibility, SEO, and best practices analysis
- **Axe-core Analysis**: Detailed accessibility violation detection with WCAG compliance
- **User Authentication**: Secure JWT-based authentication system
- **Report History**: Save and view past analysis reports
- **Modern UI**: Beautiful, responsive interface built with React
- **Real-time Analysis**: Fast, concurrent analysis using Puppeteer

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Modern CSS with responsive design

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Puppeteer for browser automation
- Lighthouse for performance audits
- Axe-core for accessibility testing
- JWT for authentication
- bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd React-cource\ -\ Copy
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```

## 🚀 Running Locally

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 📦 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` (your frontend URL)

### Frontend Deployment (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory: `cd frontend`
3. Run: `vercel`
4. Follow the prompts to deploy
5. Update the API URL in your frontend code to point to your deployed backend

## 🔐 Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CLIENT_URL`: Frontend URL for CORS configuration
- `PORT`: Server port (default: 5000)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Analysis
- `POST /api/analyze` - Analyze a URL (requires authentication)

### Reports
- `GET /api/reports` - Get user's report history (requires authentication)
- `GET /api/reports/:id` - Get specific report details (requires authentication)

## 🧪 Testing

Run analysis on any public URL:
1. Register/Login to the application
2. Enter a URL in the analyzer
3. View comprehensive accessibility and performance reports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [Axe-core](https://github.com/dequelabs/axe-core)
- [Puppeteer](https://github.com/puppeteer/puppeteer)
