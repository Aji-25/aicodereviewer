# 📘 AIReviewMate

An **AI-powered code reviewer** that analyzes your code in real-time and provides intelligent suggestions for improvements.

## 🚀 Features

- **Real-time Code Analysis**: Get instant feedback as you type
- **Smart Debouncing**: Efficient API calls only after you stop typing
- **Side-by-Side Diff Viewer**: Compare original and improved code
- **Categorized Feedback**: Suggestions organized by type (Best Practices, Performance, Bug Fixes)
- **Powered by Google Gemini AI**: Leveraging advanced AI for intelligent code review

## 🏗️ Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **react-diff-viewer** for code comparison

### Backend
- **Node.js** with Express
- **Google Gemini API** for AI-powered code analysis

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AIReviewMate
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # In the server directory
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

4. **Run the application**
   ```bash
   # Terminal 1 - Start the backend server
   cd server
   npm run dev

   # Terminal 2 - Start the frontend
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🎯 Usage

1. Open the application in your browser
2. Paste or type your code in the Monaco Editor
3. Wait for the AI to analyze your code (debounced after you stop typing)
4. Review the suggestions in the diff viewer
5. Accept or decline the proposed changes

## 📝 API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/review` - Code review endpoint
  - Request body: `{ code: string, language: string }`
  - Response: `{ improvedCode: string, explanation: string, category: string }`

## 🔧 Development

### Project Structure
```
AIReviewMate/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main app component
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── server.js    # Entry point
│   └── package.json
└── README.md
```

