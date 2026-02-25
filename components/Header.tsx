
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onGoHome: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onGoHome, onLogout }) => {
  return (
    <header className="bg-primary text-white shadow-sm p-3 sticky-top d-flex align-items-center justify-content-between">
      <button onClick={onGoHome} className="d-flex align-items-center gap-3 text-decoration-none text-white group">
        <i className="fas fa-book-open fs-2"></i>
        <h1 className="h2 mb-0 fw-bold d-none d-md-block">
          Portal de Capacitación
        </h1>
         <h1 className="h4 mb-0 fw-bold d-block d-md-none">
          Capacitación
        </h1>
      </button>
      <div className="d-flex align-items-center gap-3">
        {user && (
          <div className="d-none d-sm-block text-end">
            <p className="fw-semibold mb-0">{user.name}</p>
            <p className="small text-white-50 mb-0">{user.email}</p>
          </div>
        )}
        {user && (
          <button 
            onClick={onLogout}
            className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '48px', height: '48px' }}
            aria-label="Cerrar sesión"
          >
            <i className="fas fa-sign-out-alt fs-5"></i>
          </button>
        )}
      </div>
    </header>
  );
};