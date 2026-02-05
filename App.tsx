
import React, { useState, useEffect, useCallback } from 'react';
import { Home } from './components/Home';
import { LessonView } from './components/LessonView';
import { Header } from './components/Header';
import { AIAssistant } from './components/AIAssistant';
import { AuthAssistant } from './components/AuthAssistant';
import { lessons } from './data/lessons';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { Dashboard } from './components/Dashboard';
import type { Lesson, User, LessonState } from './types';
import { achievements } from './data/achievements';
import { apiService } from './services/apiService';

const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'forgotPassword' | 'app' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonState, setLessonState] = useState<LessonState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user session (e.g., from a token)
    // This is a placeholder for real session management
    const checkSession = async () => {
      try {
        // const user = await apiService.getMe(); // Hypothetical session check
        // setCurrentUser(user);
        // setView('app');
        setIsLoading(false); // Default to login screen if no session
      } catch (error) {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLoginSuccess = async () => {
    try {
      setIsLoading(true);
      const user = await apiService.getUser(); // Fetch user data from backend
      setCurrentUser(user);
      setView('app');
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error in UI
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegisterSuccess = (name: string, email: string) => {
    // After registration, typically the backend would log the user in
    handleLoginSuccess();
  }

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedLesson(null);
    setLessonState(null);
    setView('login');
  };

  const handleSelectLesson = async (lesson: Lesson) => {
    if (!currentUser) return;
    try {
      setIsLoading(true);
      const initialState = await apiService.startLesson(lesson.id);
      setLessonState(initialState);
      setSelectedLesson(lesson);
    } catch (error) {
      console.error(`Failed to start lesson ${lesson.id}`, error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStepComplete = (lessonId: string, newStepIndex: number) => {
    setLessonState(prevState => prevState ? { ...prevState, currentStep: newStepIndex } : null);
  };
  
  const handleSubmission = async (lessonId: string, stepIndex: number, answer: string) => {
    try {
      const result = await apiService.submitAnswer(lessonId, stepIndex, answer);
      // The backend validates the answer and returns the new number of lives.
      setLessonState(prevState => prevState ? { ...prevState, lives: result.newLives } : null);
      return result.isCorrect;
    } catch (error) {
      console.error("Error submitting answer:", error);
      return false;
    }
  };

  const handleLifeRestored = useCallback(async () => {
    try {
      const { newLives } = await apiService.claimAdReward();
      setLessonState(prevState => {
        if (!prevState) return null;
        return { ...prevState, lives: newLives };
      });
      setCurrentUser(prevUser => {
        if (!prevUser) return null;
        return { ...prevUser, lives: newLives };
      });
    } catch (error) {
      console.error("Failed to claim ad reward", error);
    }
  }, []);
  
  const handleSubscriptionSuccess = async () => {
    // The user has completed the educational payment simulation.
    // In our mock scenario, this grants them "premium" status.
    setIsLoading(true);
    try {
        const updatedUser = await apiService.subscribeUser();
        setCurrentUser(updatedUser);
        // Go back to the home screen with the new user status.
        setSelectedLesson(null);
        setLessonState(null);
        setView('app');
    } catch (error) {
        console.error("Failed to process subscription simulation:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoHome = async () => {
    setSelectedLesson(null);
    setLessonState(null);
    setView('app');
    // Refresh user data in case progress was made
    if (currentUser) {
        try {
            const user = await apiService.getUser();
            setCurrentUser(user);
        } catch (error) {
            console.error("Failed to refresh user data", error);
        }
    }
  };
  
  const handleGoToDashboard = () => {
    setSelectedLesson(null);
    setLessonState(null);
    setView('dashboard');
  }

  const renderContent = () => {
    if (isLoading && view !== 'login' && view !== 'register' && view !== 'forgotPassword') {
        return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Cargando...</p></div>
    }

    if (!currentUser) {
      return (
        <>
          {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setView('register')} onNavigateToForgotPassword={() => setView('forgotPassword')} />}
          {view === 'register' && <Register onRegisterSuccess={(name, email) => handleRegisterSuccess(name, email)} onNavigateToLogin={() => setView('login')} />}
          {view === 'forgotPassword' && <ForgotPassword onNavigateToLogin={() => setView('login')} />}
          <AuthAssistant />
        </>
      );
    }
    
    return (
     <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
       <Header user={currentUser} onGoHome={handleGoHome} onLogout={handleLogout} />
       <main className="p-4 md:p-8 max-w-5xl mx-auto">
          {view === 'app' && !selectedLesson && (
             <Home lessons={lessons} user={currentUser} onSelectLesson={handleSelectLesson} onNavigateToDashboard={handleGoToDashboard} />
          )}
          {view === 'dashboard' && !selectedLesson && (
             <Dashboard user={currentUser} lessons={lessons} achievements={achievements} onGoBack={handleGoHome} />
          )}
          {selectedLesson && lessonState && (
             <LessonView 
                 lesson={selectedLesson} 
                 initialState={lessonState}
                 onGoBack={handleGoHome}
                 onStepComplete={handleStepComplete}
                 onSubmission={handleSubmission}
                 onLifeRestored={handleLifeRestored}
                 onSubscriptionSuccess={handleSubscriptionSuccess}
             />
          )}
          {isLoading && !lessonState && selectedLesson && (
            <div className="text-center p-8"><p className="text-xl">Cargando lección...</p></div>
          )}
       </main>
       <AIAssistant />
       <footer className="text-center p-4 text-slate-500 text-sm mt-8">
         <p>&copy; 2024 Portal de Capacitación Digital. Todos los derechos reservados.</p>
       </footer>
     </div>
    );
  };

  return <>{renderContent()}</>;
};

export default App;