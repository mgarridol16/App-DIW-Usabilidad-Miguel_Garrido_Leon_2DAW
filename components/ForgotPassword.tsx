import React, { useState } from "react";
import { SkinSelector } from "./SkinSelector";

interface ForgotPasswordProps {
  onNavigateToLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onNavigateToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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
        className="w-100 p-4 p-md-5 bg-white rounded-4 shadow-lg"
        style={{ maxWidth: "448px" }}
      >
        <div className="text-center">
          <i className="fas fa-key display-4 text-primary"></i>
          <h1 className="mt-3 h2 fw-bold text-primary-emphasis">
            Recuperar Contraseña
          </h1>
        </div>

        {isSubmitted ? (
          <div className="text-center d-flex flex-column gap-3 mt-4">
            <p className="fs-5 text-body-secondary">
              Si existe una cuenta asociada a <strong>{email}</strong>, hemos
              enviado un correo con las instrucciones para restablecer su
              contraseña.
            </p>
            <p className="text-muted">
              Por favor, revise su bandeja de entrada.
            </p>
            <button
              onClick={onNavigateToLogin}
              className="btn btn-link text-primary fw-bold text-decoration-none"
            >
              &larr; Volver a Iniciar Sesión
            </button>
          </div>
        ) : (
          <>
            <p className="text-muted text-center mt-3">
              Introduzca su correo electrónico y le enviaremos un enlace para
              recuperar su cuenta.
            </p>
            <form
              className="d-flex flex-column gap-4 mt-4"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <label
                    htmlFor="email-forgot"
                    className="form-label fs-5 fw-medium text-body-secondary"
                  >
                    Correo Electrónico
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      speak(
                        "Escriba el correo electrónico con el que se registró para que podamos enviarle las instrucciones de recuperación.",
                      )
                    }
                    className="btn btn-link text-primary p-0"
                    aria-label="Escuchar explicación sobre el correo electrónico"
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
                <input
                  id="email-forgot"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control form-control-lg"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
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
                      <span className="ms-2">Enviando...</span>
                    </>
                  ) : (
                    "Enviar Enlace de Recuperación"
                  )}
                </button>
              </div>
            </form>

            <p className="text-center text-muted mt-4">
              ¿Recordó su contraseña?{" "}
              <button
                onClick={onNavigateToLogin}
                className="fw-bold btn btn-link text-primary p-0 text-decoration-none"
              >
                Iniciar Sesión
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
