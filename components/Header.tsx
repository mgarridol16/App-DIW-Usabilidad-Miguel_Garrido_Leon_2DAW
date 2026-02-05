
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onGoHome: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onGoHome, onLogout }) => {
  return (
    <header className="bg-indigo-800 text-white shadow-md p-4 sticky top-0 z-10 flex items-center justify-between">
      <button onClick={onGoHome} className="flex items-center gap-4 group">
        <i className="fas fa-book-open text-3xl md:text-4xl group-hover:text-indigo-300 transition-colors"></i>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          Portal de Capacitación
        </h1>
      </button>
      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden sm:block text-right">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-indigo-300">{user.email}</p>
          </div>
        )}
        {user && (
          <button 
            onClick={onLogout}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-full text-lg p-3 w-12 h-12 flex items-center justify-center transition-colors"
            aria-label="Cerrar sesión"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        )}
      </div>
    </header>
  );
};
