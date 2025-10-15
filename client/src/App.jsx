import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import useBackendStatus from './hooks/useBackendStatus'

function App() {
  const { isConnected, isChecking } = useBackendStatus()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        isBackendConnected={isConnected} 
        isCheckingConnection={isChecking} 
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto overflow-hidden">
        <Home />
      </main>
    </div>
  )
}

export default App
