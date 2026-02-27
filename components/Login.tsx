import React, { useState } from "react";
import { SkinSelector } from "./SkinSelector";

interface LoginProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      onLoginSuccess();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 position-relative">
      {/* Selector de skin en la esquina superior derecha */}
      <div
        className="position-absolute top-0 end-0 m-3"
        style={{ zIndex: 1000 }}
      >
        <SkinSelector />
      </div>

      <div
        className="w-100 p-4 space-y-4 bg-white rounded-4 shadow-lg"
        style={{ maxWidth: "448px" }}
      >
        <div className="text-center">
          <i className="fas fa-book-open display-4 text-primary"></i>
          <h1 className="mt-3 h2 fw-bold text-primary-emphasis">
            Portal de Capacitación
          </h1>
          <p className="text-muted">
            Inicie sesión para acceder a los módulos.
          </p>
        </div>

        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <label
                htmlFor="email"
                className="form-label fs-5 fw-medium text-body-secondary"
              >
                Correo Electrónico
              </label>
              <button
                type="button"
                onClick={() =>
                  speak(
                    "Este es el campo para su correo electrónico. Es su dirección única en internet, como 'nombre@gmail.com'. Se utiliza para identificarle en los servicios online.",
                  )
                }
                className="btn btn-link text-primary p-0"
                aria-label="Escuchar explicación sobre el correo electrónico"
              >
                <i className="fas fa-volume-up"></i>
              </button>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control form-control-lg"
              placeholder="usuario@correo.com"
            />
          </div>

          <div>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <label
                htmlFor="password"
                className="form-label fs-5 fw-medium text-body-secondary"
              >
                Contraseña
              </label>
              <button
                type="button"
                onClick={() =>
                  speak(
                    "Introduzca su clave secreta para acceder. Recuerde no compartirla con nadie.",
                  )
                }
                className="btn btn-link text-primary p-0"
                aria-label="Escuchar explicación sobre la contraseña"
              >
                <i className="fas fa-volume-up"></i>
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control form-control-lg"
              placeholder="••••••••"
            />
          </div>

          <div className="text-end">
            <button
              type="button"
              onClick={onNavigateToForgotPassword}
              className="btn btn-link text-primary text-decoration-none small"
            >
              He olvidado mi contraseña
            </button>
          </div>

          {error && (
            <p className="text-danger text-center fw-semibold">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-100 py-3 fs-5 fw-bold"
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2">Verificando...</span>
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-muted pt-3">
          ¿No tiene una cuenta?{" "}
          <button
            onClick={onNavigateToRegister}
            className="fw-bold btn btn-link text-primary p-0 text-decoration-none"
          >
            Regístrese aquí
          </button>
        </p>
      </div>
    </div>
  );
};
