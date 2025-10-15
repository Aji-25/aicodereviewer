import React from 'react';
import { Sparkles } from 'lucide-react';

function Home() {
  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
      {/* Left Panel - Code Editor */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-700">Code Editor</h2>
        </div>
        <div className="flex-1 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">1</div>
            <p className="text-sm">Monaco Editor will be placed here</p>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Suggestions */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-700">AI Suggestions</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-50 rounded-full mb-4">
              <Sparkles className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Start typing or paste your code
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              The AI will automatically review your code and suggest improvements as you type
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                Best Practices
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Better Performance
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                Bug Fix
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
