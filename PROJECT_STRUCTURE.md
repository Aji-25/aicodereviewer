# 📁 AIReviewMate - Project Structure

## Overview
This document outlines the complete directory structure of the AIReviewMate application.

## Directory Tree

```
AIReviewMate/
├── README.md                    # Project documentation
├── .gitignore                   # Git ignore rules
├── .env.example                 # Environment variables template
├── PROJECT_STRUCTURE.md         # This file
│
├── client/                      # Frontend (React + Vite + Tailwind)
│   ├── .gitignore
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── index.html               # HTML entry point
│   │
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── index.css            # Global styles with Tailwind
│       ├── App.jsx              # Main App component
│       │
│       ├── components/          # React components
│       │   └── .gitkeep
│       │
│       └── services/            # API service layer
│           └── api.js           # Axios API client
│
└── server/                      # Backend (Node.js + Express)
    ├── .gitignore
    ├── .env.example             # Server environment variables
    ├── package.json             # Backend dependencies
    │
    └── src/
        ├── server.js            # Express server entry point
        │
        ├── routes/              # API route handlers
        │   └── review.js        # Code review endpoint
        │
        ├── services/            # Business logic
        │   └── gemini.js        # Google Gemini AI integration
        │
        └── config/              # Configuration files
            └── .gitkeep
```

## Key Files Description

### Root Level
- **README.md**: Complete project documentation with setup instructions
- **.gitignore**: Excludes node_modules, .env, build outputs, etc.
- **.env.example**: Template for environment variables

### Client (Frontend)
- **package.json**: Dependencies include React, Vite, Tailwind, Monaco Editor, react-diff-viewer
- **vite.config.js**: Vite dev server on port 5173 with proxy to backend
- **tailwind.config.js**: Custom Tailwind theme with primary color palette
- **src/main.jsx**: React DOM rendering
- **src/App.jsx**: Main application component
- **src/services/api.js**: Axios client for API calls

### Server (Backend)
- **package.json**: Dependencies include Express, CORS, dotenv, @google/generative-ai
- **src/server.js**: Express app setup with middleware and error handling
- **src/routes/review.js**: POST /api/review endpoint with validation
- **src/services/gemini.js**: Google Gemini API integration for code review

## Technology Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Monaco Editor**: Code editor (VS Code editor)
- **react-diff-viewer**: Side-by-side code comparison
- **Axios**: HTTP client
- **Lucide React**: Icon library

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **Google Gemini API**: AI-powered code analysis
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Next Steps

1. **Install Dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Configure Environment**
   - Copy `server/.env.example` to `server/.env`
   - Add your Gemini API key

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   cd client && npm run dev
   ```

## Features to Implement (Next Steps)

### Frontend Components
- [ ] CodeEditor component (Monaco Editor integration)
- [ ] DiffViewer component (react-diff-viewer integration)
- [ ] CategoryBadge component
- [ ] LoadingSpinner component
- [ ] ErrorMessage component

### Backend Enhancements
- [ ] Request rate limiting
- [ ] Caching layer
- [ ] Enhanced error handling
- [ ] Request logging

### Features
- [ ] Debounced input handling
- [ ] Request cancellation (latest-wins)
- [ ] Accept/Decline buttons
- [ ] Multiple language support
- [ ] Code history/undo functionality
