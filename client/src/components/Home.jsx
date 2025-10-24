import React, { useState, useRef } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';
import DiffView from './DiffView';

function Home({ githubToken }) {
  const [reviewResult, setReviewResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentCode, setCurrentCode] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  
  const editorRef = useRef(null);

  const handleReviewResult = (result) => {
    setReviewResult(result);
    setError(null);
    setIsAccepted(false);
  };

  const handleAccept = () => {
    if (reviewResult && editorRef.current) {
      editorRef.current.updateCode(reviewResult.improvedCode);
      setIsAccepted(true);
    }
  };

  const handleDecline = () => {
    setReviewResult(null);
    setError(null);
    setIsAccepted(false);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
      {/* Left Panel - Code Editor */}
      <CodeEditor 
        ref={editorRef}
        onReviewResult={handleReviewResult}
        onReviewError={setError}
        onCodeChange={setCurrentCode}
      />

      {/* Right Panel - AI Suggestions or Diff View */}
      {reviewResult && !error ? (
        <DiffView
          originalCode={currentCode}
          improvedCode={reviewResult.improvedCode}
          explanation={reviewResult.explanation}
          category={reviewResult.category}
          onAccept={handleAccept}
          onDecline={handleDecline}
          githubToken={githubToken}
          isAccepted={isAccepted}
        />
      ) : (
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

            {!error && (
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
