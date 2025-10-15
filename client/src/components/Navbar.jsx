import React from 'react';
import { Code2, Activity } from 'lucide-react';

function Navbar({ isBackendConnected, isCheckingConnection }) {
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
