import React from "react";
import type { User } from "../types";
import { SkinSelector } from "./SkinSelector";

interface HeaderProps {
  user: User | null;
  onGoHome: () => void;
  onLogout: () => void;
  onWebMap: () => void;
  onAboutUs: () => void;
  onProjectVideos: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onGoHome,
  onLogout,
  onWebMap,
  onAboutUs,
  onProjectVideos,
}) => {
  return (
    <header className="bg-primary text-white shadow-sm p-2 p-md-3 sticky-top d-flex align-items-center justify-content-between flex-wrap">
      <button
        onClick={onGoHome}
        className="d-flex align-items-center gap-2 text-decoration-none text-white border-0 bg-transparent p-0"
        style={{ cursor: "pointer" }}
      >
        <i className="fas fa-book-open fs-3 fs-md-2"></i>
        <h1 className="h5 h-md-4 h-lg-2 mb-0 fw-bold d-none d-sm-block">
          Portal de Capacitación
        </h1>
      </button>
      <div className="d-flex align-items-center gap-1 gap-md-2 gap-lg-3 flex-wrap">
        {user && (
          <div className="d-none d-lg-block text-end">
            <p className="fw-semibold mb-0 small">{user.name}</p>
            <p className="small text-white-50 mb-0">{user.email}</p>
          </div>
        )}
        {user && <SkinSelector />}
        {user && (
          <button
            onClick={onWebMap}
            className="btn btn-info rounded-circle d-flex align-items-center justify-content-center header-btn-responsive"
            aria-label="Mapa web de la aplicación"
            title="Mapa Web"
          >
            <i className="fas fa-sitemap"></i>
          </button>
        )}
        {user && (
          <button
            onClick={onProjectVideos}
            className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center header-btn-responsive"
            aria-label="Vídeos del proyecto"
            title="Vídeos del Proyecto"
          >
            <i className="fas fa-video"></i>
          </button>
        )}
        {user && (
          <button
            onClick={onAboutUs}
            className="btn btn-success rounded-circle d-flex align-items-center justify-content-center header-btn-responsive"
            aria-label="Sobre nosotros"
            title="Sobre Nosotros"
          >
            <i className="fas fa-user-circle"></i>
          </button>
        )}
        {user && (
          <button
            onClick={onLogout}
            className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center header-btn-responsive"
            aria-label="Cerrar sesión"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        )}
      </div>
    </header>
  );
};
