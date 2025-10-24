import React from 'react';
<<<<<<< HEAD
import { Code2, Activity, Github, LogOut } from 'lucide-react';

function Navbar({ isBackendConnected, isCheckingConnection, githubToken, onGithubDisconnect }) {
  const handleGithubConnect = () => {
    window.location.href = 'http://localhost:3000/api/github/login';
=======
import { Code2, Github, LogOut } from 'lucide-react';

function Navbar({ githubToken, onGithubDisconnect }) {
  const handleGithubConnect = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/github/login`;
>>>>>>> 4d32dfc56f73753ccf7f3f5dafc8721e76ae536a
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AI Review Mate
              </h1>
              <p className="text-xs text-gray-500">
                Real-time code analysis and intelligent suggestions
              </p>
            </div>
          </div>

<<<<<<< HEAD
          {/* Right Side - Status & GitHub */}
          <div className="flex items-center space-x-4">
            {/* Backend Status Indicator */}
            <div className="flex items-center space-x-2">
              <Activity 
                className={`w-4 h-4 ${
                  isCheckingConnection 
                    ? 'text-yellow-500 animate-pulse' 
                    : isBackendConnected 
                      ? 'text-green-500' 
                      : 'text-red-500'
                }`} 
              />
              <span className={`text-sm font-medium ${
                isCheckingConnection 
                  ? 'text-yellow-600' 
                  : isBackendConnected 
                    ? 'text-green-600' 
                    : 'text-red-600'
              }`}>
                {isCheckingConnection 
                  ? 'Checking...' 
                  : isBackendConnected 
                    ? 'Connected' 
                    : 'Disconnected'}
              </span>
            </div>

=======
          {/* Right Side - GitHub */}
          <div className="flex items-center space-x-4">
>>>>>>> 4d32dfc56f73753ccf7f3f5dafc8721e76ae536a
            {/* GitHub Connect/Disconnect Button */}
            {githubToken ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                  <Github className="w-4 h-4 text-green-700" />
                  <span className="text-sm font-medium text-green-700">Connected to GitHub</span>
                </div>
                <button
                  onClick={onGithubDisconnect}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  title="Disconnect GitHub"
                >
                  <LogOut className="w-4 h-4 text-red-700" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGithubConnect}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                Connect GitHub
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
