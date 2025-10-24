# AI Review Mate 🤖

An intelligent code review assistant powered by Google's Gemini AI that provides real-time code analysis, suggestions, and automated pull request creation.

## ✨ Features

- **🔍 Real-time Code Analysis**: Automatic code review as you type with intelligent debouncing
- **🤖 AI-Powered Suggestions**: Leverages Google Gemini AI for smart code improvements
- **📊 Side-by-Side Diff View**: Visual comparison of original and improved code
- **🎯 Smart Categorization**: Reviews categorized into Best Practices, Performance, Bug Fix, Security, etc.
- **🔗 GitHub Integration**: OAuth authentication and direct PR creation
- **💻 Multi-Language Support**: JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby
- **⚡ Modern UI**: Clean interface with Monaco Editor and TailwindCSS
- **🚀 Fast & Responsive**: Optimized with request cancellation and rate limiting

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code-powered code editor
- **Lucide React** - Beautiful icon library
- **React Diff Viewer** - Side-by-side code comparison

### Backend
- **Node.js & Express** - Server framework
- **Google Generative AI (Gemini)** - AI code analysis
- **GitHub OAuth** - Authentication and PR creation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))
- **GitHub OAuth App** (Optional, for PR features)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/aicode.git
cd aicode
```

### 2. Install all dependencies

#### Quick Install (Recommended)
```bash
npm run install:all
```

#### Manual Install
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure Environment Variables

#### Backend Setup
Copy `.env.example` to `.env` in the `server` directory:

```bash
cd server
cp .env.example .env
```

Then edit `.env` and add your API keys:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional - For GitHub PR feature
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:3000/api/github/callback

# Server Configuration
PORT=3000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

#### Frontend Setup (Optional)
```bash
cd client
cp .env.example .env
```

## 🎯 Usage

### Quick Start (From Root Directory)

Start both backend and frontend with a single command:

```bash
npm run dev
```

This will start:
- **Backend**: `http://localhost:3000`
- **Frontend**: `http://localhost:5173`

### Manual Start

#### Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3000`

#### Start the Frontend

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

### Using the Application

1. **Write or Paste Code**: Enter your code in the Monaco editor
2. **Auto Review**: The AI will automatically review after 2 seconds of inactivity
3. **View Suggestions**: See AI suggestions with explanations in the right panel
4. **Compare Changes**: Review side-by-side diff of original vs improved code
5. **Accept/Decline**: Choose to accept changes or dismiss suggestions
6. **Create PR** (Optional): Connect GitHub and create pull requests directly

## 📁 Project Structure

```
aicode/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── CodeEditor.jsx      # Monaco editor wrapper
│   │   │   ├── DiffView.jsx        # Diff viewer component
│   │   │   ├── CreatePRModal.jsx   # GitHub PR modal
│   │   │   ├── Home.jsx            # Main page
│   │   │   └── Navbar.jsx          # Navigation bar
│   │   ├── services/      # API services
│   │   │   └── api.js     # Axios client
│   │   ├── App.jsx        # Root component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                # Backend application
    ├── src/
    │   ├── routes/        # API routes
    │   │   ├── review.js  # Code review endpoint
    │   │   └── github.js  # GitHub OAuth & PR
    │   ├── services/      # Business logic
    │   │   └── gemini.js  # Gemini AI integration
    │   └── server.js      # Express server setup
    └── package.json
```

## 🔌 API Endpoints

### Code Review
```http
POST /api/review
Content-Type: application/json

{
  "code": "function example() { ... }",
  "language": "javascript"
}
```

### GitHub OAuth
```http
GET  /api/github/login          # Initiate OAuth flow
GET  /api/github/callback       # OAuth callback
GET  /api/github/repos          # Get user repositories
POST /api/github/pull-request   # Create pull request
```

### Health Check
```http
GET /api/health
```

## 🎨 Features in Detail

### Real-time Code Analysis
- **Debounced Review**: Reviews trigger after 2 seconds of inactivity
- **Request Cancellation**: Previous requests cancelled when new changes are made
- **Rate Limiting**: Server-side protection (10 requests per minute)

### Review Categories
- ✅ **Best Practices** - Code conventions and standards
- ⚡ **Better Performance** - Optimization suggestions
- 🐛 **Bug Fix** - Potential bug identification
- 🎯 **Code Quality** - Readability and maintainability
- 🔒 **Security** - Security vulnerabilities
- 📖 **Readability** - Code clarity improvements

### GitHub Integration
- OAuth 2.0 authentication
- Repository browsing
- Automatic branch creation
- Commit with AI improvements
- Pull request generation with detailed descriptions

## 🔒 Environment Variables

### Server (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key |
| `GITHUB_CLIENT_ID` | ⚠️ Optional | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | ⚠️ Optional | GitHub OAuth app secret |
| `GITHUB_REDIRECT_URI` | ⚠️ Optional | OAuth callback URL |
| `PORT` | No | Server port (default: 3000) |
| `CLIENT_URL` | No | Frontend URL (default: http://localhost:5173) |

### Client (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | Backend API URL (default: http://localhost:3000) |

## 🧪 Development

### Server Development
```bash
cd server
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start without auto-reload
```

### Client Development
```bash
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🙏 Acknowledgments

- [Google Gemini AI](https://deepmind.google/technologies/gemini/) - AI-powered code analysis
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code editor component
- [React Diff Viewer](https://github.com/praneshr/react-diff-viewer) - Diff visualization
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library

Thanks for reading till the end of this ReadMe file :)
