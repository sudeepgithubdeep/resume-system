import './custom-styles.css';
import './responsive.css';
import { useState, useEffect } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import ResumeUploadScreen from './components/ResumeUploadScreen'
import SubscriptionScreen from './components/SubscriptionScreen'
import DashboardScreen from './components/DashboardScreen'
import { Toaster } from 'react-hot-toast'

function App() {
  // Initialize state from localStorage if available, otherwise default to 'login'
  const [currentScreen, setCurrentScreen] = useState(() => {
    const savedScreen = localStorage.getItem('currentScreen')
    return savedScreen || 'login'
  })
  
  // Save current screen to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentScreen', currentScreen)
  }, [currentScreen])
  
  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="app-container animate-fadeIn">
      <Toaster position="top-center" />
      
      {currentScreen === 'login' && (
        <LoginScreen onComplete={() => handleScreenChange('upload')} />
      )}
      {currentScreen === 'upload' && (
        <ResumeUploadScreen onComplete={() => handleScreenChange('subscription')} />
      )}
      {currentScreen === 'subscription' && (
        <SubscriptionScreen onComplete={() => handleScreenChange('dashboard')} />
      )}
      {currentScreen === 'dashboard' && (
        <DashboardScreen />
      )}
    </div>
  )
}

export default App
