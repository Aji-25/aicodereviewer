import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';

function Home() {
  const [reviewResult, setReviewResult] = useState(null);
  const [error, setError] = useState(null);

  const handleReviewResult = (result) => {
    setReviewResult(result);
    setError(null);
  };

  const handleReviewError = (errorMessage) => {
    setError(errorMessage);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Best Practices': 'bg-blue-100 text-blue-700 border-blue-200',
      'Better Performance': 'bg-green-100 text-green-700 border-green-200',
      'Bug Fix': 'bg-red-100 text-red-700 border-red-200',
      'Code Quality': 'bg-purple-100 text-purple-700 border-purple-200',
      'Security': 'bg-orange-100 text-orange-700 border-orange-200',
      'Readability': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
      {/* Left Panel - Code Editor */}
      <CodeEditor 
        onReviewResult={handleReviewResult}
        onReviewError={handleReviewError}
      />

      {/* Right Panel - AI Suggestions */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-700">AI Suggestions</h2>
        </div>
        
        <div className="flex-1 overflow-auto">
          {error && (
            <div className="p-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900 mb-1">Review Failed</h4>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!reviewResult && !error && (
            <div className="flex items-center justify-center h-full p-8">
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
          )}

          {reviewResult && !error && (
            <div className="p-4 space-y-4">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(reviewResult.category)}`}>
                  {reviewResult.category}
                </span>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 AI Suggestion</h4>
                <p className="text-sm text-blue-800 whitespace-pre-wrap">{reviewResult.explanation}</p>
              </div>

              {/* Improved Code Preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">✨ Improved Code</h4>
                <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                  <code>{reviewResult.improvedCode}</code>
                </pre>
              </div>

              {/* Action Buttons - Placeholder for next step */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                  Accept Changes
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
