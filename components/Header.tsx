import React from "react";
import type { User } from "../types";
import { SkinSelector } from "./SkinSelector";

interface HeaderProps {
  user: User | null;
  onGoHome: () => void;
  onLogout: () => void;
  onWebMap: () => void;
  onAboutUs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onGoHome,
  onLogout,
  onWebMap,
  onAboutUs,
}) => {
  return (
    <header className="bg-primary text-white shadow-sm p-3 sticky-top d-flex align-items-center justify-content-between">
      <button
        onClick={onGoHome}
        className="d-flex align-items-center gap-3 text-decoration-none text-white border-0 bg-transparent p-0"
        style={{ cursor: "pointer" }}
      >
        <i className="fas fa-book-open fs-2"></i>
        <h1 className="h2 mb-0 fw-bold d-none d-md-block">
          Portal de Capacitación
        </h1>
        <h1 className="h4 mb-0 fw-bold d-block d-md-none">Capacitación</h1>
      </button>
      <div className="d-flex align-items-center gap-3">
        {user && (
          <div className="d-none d-sm-block text-end">
            <p className="fw-semibold mb-0">{user.name}</p>
            <p className="small text-white-50 mb-0">{user.email}</p>
          </div>
        )}
        {user && <SkinSelector />}
        {user && (
          <button
            onClick={onWebMap}
            className="btn btn-info rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "48px", height: "48px" }}
            aria-label="Mapa web de la aplicación"
            title="Mapa Web"
          >
            <i className="fas fa-sitemap fs-5"></i>
          </button>
        )}
        {user && (
          <button
            onClick={onAboutUs}
            className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "48px", height: "48px" }}
            aria-label="Sobre nosotros"
            title="Sobre Nosotros"
          >
            <i className="fas fa-user-circle fs-5"></i>
          </button>
        )}
        {user && (
          <button
            onClick={onLogout}
            className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "48px", height: "48px" }}
            aria-label="Cerrar sesión"
          >
            <i className="fas fa-sign-out-alt fs-5"></i>
          </button>
        )}
      </div>
    </header>
  );
};
