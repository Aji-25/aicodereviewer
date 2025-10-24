import React, { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { CheckCircle, XCircle, Clipboard, Check, GitPullRequest } from 'lucide-react';
import CreatePRModal from './CreatePRModal';

function DiffView({ originalCode, improvedCode, explanation, category, onAccept, onDecline, githubToken, isAccepted }) {
  const [copied, setCopied] = useState(false);
  const [showPRModal, setShowPRModal] = useState(false);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(improvedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const customStyles = {
    variables: {
      dark: {
        diffViewerBackground: '#1e1e1e',
        diffViewerColor: '#e4e4e4',
        addedBackground: '#044B53',
        addedColor: '#e4e4e4',
        removedBackground: '#632F34',
        removedColor: '#e4e4e4',
        wordAddedBackground: '#055d67',
        wordRemovedBackground: '#7d383f',
        addedGutterBackground: '#034148',
        removedGutterBackground: '#632b30',
        gutterBackground: '#2e2e2e',
        gutterBackgroundDark: '#262626',
        highlightBackground: '#2a3f5f',
        highlightGutterBackground: '#2d4566',
      },
    },
    line: {
      padding: '10px 2px',
      fontSize: '13px',
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    },
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <h2 className="text-sm font-semibold text-gray-700">AI Suggestions</h2>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 AI Suggestion</h4>
            <p className="text-sm text-blue-800 whitespace-pre-wrap">{explanation}</p>
          </div>

          {/* Diff Viewer */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactDiffViewer
              oldValue={originalCode}
              newValue={improvedCode}
              splitView={true}
              useDarkTheme={true}
              styles={customStyles}
              leftTitle="Original Code"
              rightTitle="Improved Code"
              showDiffOnly={false}
              hideLineNumbers={false}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onAccept}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              disabled={isAccepted}
            >
              <CheckCircle className="w-4 h-4" />
              {isAccepted ? 'Changes Accepted' : 'Accept Changes'}
            </button>
            
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Clipboard className="w-4 h-4" />
                  Copy to Clipboard
                </>
              )}
            </button>
            
            <button
              onClick={onDecline}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
          </div>

          {/* Create Pull Request Button - Only visible after acceptance */}
          {isAccepted && githubToken && (
            <div className="pt-3 border-t border-gray-200 mt-3">
              <button
                onClick={() => setShowPRModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
              >
                <GitPullRequest className="w-4 h-4" />
                Create Pull Request on GitHub
              </button>
            </div>
          )}

          {/* Info message if not connected to GitHub */}
          {isAccepted && !githubToken && (
            <div className="pt-3 border-t border-gray-200 mt-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="text-sm text-blue-800">
                  Connect to GitHub to create a pull request with these changes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create PR Modal */}
      {showPRModal && (
        <CreatePRModal
          improvedCode={improvedCode}
          category={category}
          explanation={explanation}
          githubToken={githubToken}
          onClose={() => setShowPRModal(false)}
        />
      )}
    </div>
  );
}

export default DiffView;
