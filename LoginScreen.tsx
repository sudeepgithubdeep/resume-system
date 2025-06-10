import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Send } from "lucide-react";
import toast from 'react-hot-toast';
import { auth } from '../firebase';

interface LoginScreenProps {
  onComplete: () => void;
}

const LoginScreen = ({ onComplete }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Using Firebase Auth for Google OAuth
      const provider = new GoogleAuthProvider();
      
      // For demo purposes, we'll simulate the authentication
      // In production, uncomment the real implementation below
      setTimeout(() => {
        toast.success('Successfully signed in!', {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
          },
          icon: '👋',
        });
        setIsLoading(false);
        onComplete();
      }, 1500);
      
      // Real implementation:
      // const result = await signInWithPopup(auth, provider);
      // if (result.user) {
      //   toast.success(`Welcome, ${result.user.displayName || 'User'}!`, {
      //     duration: 3000,
      //     style: {
      //       background: '#10B981',
      //       color: '#fff',
      //     },
      //     icon: '👋',
      //   });
      //   onComplete();
      // }
    } catch (error) {
      setIsLoading(false);
      toast.error('Sign in failed. Please try again.', {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          {/* Logo */}
          <div className="flex items-center mb-4">
            <Send className="h-10 w-10 text-[#50A7F9]" />
            <span className="ml-2 text-3xl font-bold text-[#495057]">AutoResume Sender</span>
          </div>
          
          {/* Welcome Message */}
          <h1 className="text-2xl md:text-3xl font-medium text-center text-[#495057] mb-3">
            Welcome to AutoResume Sender!
          </h1>
          
          {/* App Description */}
          <p className="text-center text-[#868E96] mb-8">
            Streamline your job search. Automatically send your polished resume to our network of partnered companies and track your application progress effortlessly.
          </p>
          
          {/* Login Button - Enhanced with animation and better styling */}
          <button 
            className={`flex items-center justify-center w-full md:w-auto px-6 py-3 bg-[#50A7F9] text-white rounded-md shadow-md hover:bg-[#3b86c4] transition-all transform hover:scale-105 active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
