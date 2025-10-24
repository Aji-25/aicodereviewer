import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import useBackendStatus from './hooks/useBackendStatus'

function App() {
  const { isConnected, isChecking } = useBackendStatus()
  const [githubToken, setGithubToken] = useState(localStorage.getItem('github_token'))

  // Handle GitHub OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    if (token) {
      // Store token in localStorage
      localStorage.setItem('github_token', token)
      setGithubToken(token)
      
      // Clean up URL by removing token parameter
      window.history.replaceState({}, document.title, window.location.pathname)
      
      // Show success notification
      console.log('✅ Successfully connected to GitHub')
    }
  }, [])

  const handleGithubDisconnect = () => {
    localStorage.removeItem('github_token')
    setGithubToken(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        isBackendConnected={isConnected} 
        isCheckingConnection={isChecking}
        githubToken={githubToken}
        onGithubDisconnect={handleGithubDisconnect}
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto overflow-hidden">
        <Home githubToken={githubToken} />
      </main>
    </div>
  )
}

export default App
