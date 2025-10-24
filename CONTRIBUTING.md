# Contributing to AI Review Mate

First off, thank you for considering contributing to AI Review Mate! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots** if relevant
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Follow the coding style** of the project
3. **Write clear commit messages**
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Ensure the code passes all checks**

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Setup Steps

1. Clone your fork:
```bash
git clone https://github.com/your-username/aicode.git
cd aicode
```

2. Install dependencies:
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. Set up environment variables (see `.env.example` files)

4. Start development servers:
```bash
# Backend (from server/)
npm run dev

# Frontend (from client/)
npm run dev
```

## Coding Guidelines

### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Keep components focused and small
- Use meaningful variable and function names
- Add comments for complex logic

### File Organization
- Place new React components in `client/src/components/`
- Place new API routes in `server/src/routes/`
- Place business logic in `server/src/services/`

### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when relevant

Examples:
```
✨ Add dark mode toggle
🐛 Fix code review timeout issue
📚 Update installation instructions
♻️ Refactor GitHub OAuth flow
```

### Code Style

#### Frontend (React)
- Use functional components
- Prefer arrow functions
- Use optional chaining (`?.`)
- Follow existing TailwindCSS patterns

#### Backend (Node.js/Express)
- Use ES modules (import/export)
- Use async/await over promises
- Add error handling for all routes
- Validate input data

## Testing

Before submitting a PR:

1. Test the code review flow
2. Test GitHub OAuth (if modified)
3. Verify UI responsiveness
4. Check console for errors
5. Test with different programming languages

## Project Structure

```
aicode/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── package.json
└── server/          # Express backend
    ├── src/
    │   ├── routes/
    │   ├── services/
    │   └── server.js
    └── package.json
```

## Need Help?

Feel free to:
- Open an issue with your question
- Join our community discussions
- Reach out to maintainers

## Recognition

Contributors will be recognized in our README and release notes.

Thank you for your contributions! 🚀
