import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';
import { reviewCode } from '../services/api';

function CodeEditor({ onReviewResult, onReviewError }) {
  const [code, setCode] = useState('// Start typing or paste your code here...\n');
  const [language, setLanguage] = useState('javascript');
  const [isReviewing, setIsReviewing] = useState(false);
  
  const debounceTimerRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleCodeChange = (value) => {
    setCode(value || '');

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Don't review empty or very short code
    if (!value || value.trim().length < 10) {
      return;
    }

    // Set new debounce timer (500ms)
    debounceTimerRef.current = setTimeout(() => {
      triggerReview(value);
    }, 500);
  };

  const triggerReview = async (codeToReview) => {
    try {
      setIsReviewing(true);

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      const result = await reviewCode(codeToReview, language, {
        signal: abortControllerRef.current.signal
      });

      // If we got here, request completed successfully
      if (onReviewResult) {
        onReviewResult(result);
      }
    } catch (error) {
      // Ignore abort errors (they're expected when cancelling)
      if (error.name === 'AbortError' || error.name === 'CanceledError') {
        console.log('Review request cancelled');
        return;
      }

      console.error('Review error:', error);
      if (onReviewError) {
        onReviewError(error.message || 'Failed to review code');
      }
    } finally {
      setIsReviewing(false);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Code Editor</h2>
        
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
          </select>

          {/* Loading Indicator */}
          {isReviewing && (
            <div className="flex items-center gap-2 text-primary-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-medium">Reviewing your code...</span>
            </div>
          )}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
