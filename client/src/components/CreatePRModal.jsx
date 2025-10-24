import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, Github, FolderGit2, FileCode } from 'lucide-react';

function CreatePRModal({ improvedCode, category, explanation, githubToken, onClose }) {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [filePath, setFilePath] = useState('');
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [isCreatingPR, setIsCreatingPR] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch repositories on mount
  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    setIsLoadingRepos(true);
    setError(null);

    try {
<<<<<<< HEAD
      const response = await fetch('http://localhost:3000/api/github/repos', {
=======
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/github/repos`, {
>>>>>>> 4d32dfc56f73753ccf7f3f5dafc8721e76ae536a
        headers: {
          'Authorization': `Bearer ${githubToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const data = await response.json();
      setRepos(data.repos || []);
    } catch (err) {
      setError(err.message || 'Failed to load repositories');
      console.error('Error fetching repos:', err);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleCreatePR = async (e) => {
    e.preventDefault();
    
    if (!selectedRepo || !filePath) {
      setError('Please select a repository and enter a file path');
      return;
    }

    setIsCreatingPR(true);
    setError(null);
    setSuccess(null);

    try {
      // Parse owner and repo from full_name (e.g., "owner/repo")
      const [owner, repo] = selectedRepo.split('/');

<<<<<<< HEAD
      const response = await fetch('http://localhost:3000/api/github/pull-request', {
=======
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/github/pull-request`, {
>>>>>>> 4d32dfc56f73753ccf7f3f5dafc8721e76ae536a
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken: githubToken,
          owner,
          repo,
          filePath,
          improvedCode,
          category,
          explanation
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to create pull request');
      }

      setSuccess({
        url: data.url,
        number: data.number
      });
    } catch (err) {
      setError(err.message || 'Failed to create pull request');
      console.error('Error creating PR:', err);
    } finally {
      setIsCreatingPR(false);
    }
  };

<<<<<<< HEAD
  // Get the selected repo object for display
  const selectedRepoObj = repos.find(r => r.full_name === selectedRepo);

=======
>>>>>>> 4d32dfc56f73753ccf7f3f5dafc8721e76ae536a
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Github className="w-6 h-6" />
            <h2 className="text-xl font-bold">Create Pull Request</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isCreatingPR}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {success ? (
            // Success State
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Pull Request Created Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                PR #{success.number} has been created in your repository
              </p>
              <a
                href={success.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5" />
                View Pull Request on GitHub
              </a>
              <button
                onClick={onClose}
                className="block w-full mt-4 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleCreatePR} className="space-y-6">
              {/* Repository Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FolderGit2 className="w-4 h-4" />
                  Select Repository
                </label>
                {isLoadingRepos ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
                    <span className="ml-2 text-gray-600">Loading repositories...</span>
                  </div>
                ) : repos.length === 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-yellow-800">No repositories found</p>
                  </div>
                ) : (
                  <select
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    required
                    disabled={isCreatingPR}
                  >
                    <option value="">-- Choose a repository --</option>
                    {repos.map((repo) => (
                      <option key={repo.full_name} value={repo.full_name}>
                        {repo.full_name}
                      </option>
                    ))}
                  </select>
                )}

<<<<<<< HEAD
                {selectedRepoObj && (
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Default Branch:</span>
                      <span className="font-medium text-gray-900">{selectedRepoObj.default_branch}</span>
=======
                {selectedRepo && (
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Default Branch:</span>
                      <span className="font-medium text-gray-900">
                        {repos.find(r => r.full_name === selectedRepo)?.default_branch}
                      </span>
>>>>>>> 4d32dfc56f73753ccf7f3f5dafc8721e76ae536a
                    </div>
                  </div>
                )}
              </div>

              {/* File Path Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileCode className="w-4 h-4" />
                  File Path
                </label>
                <input
                  type="text"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="e.g., src/components/Example.jsx"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  required
                  disabled={isCreatingPR}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Enter the path to the file you want to update in the repository
                </p>
              </div>

              {/* PR Details Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Pull Request Details</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Title:</strong> AI Review Suggestion: {category}</p>
                  <p><strong>Description:</strong> {explanation.substring(0, 100)}...</p>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-900 mb-1">Error</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isCreatingPR || !selectedRepo || !filePath || isLoadingRepos}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingPR ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating PR...
                    </>
                  ) : (
                    <>
                      <Github className="w-5 h-5" />
                      Create Pull Request
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isCreatingPR}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePRModal;
