
import React, { useState } from 'react';

interface ForgotPasswordProps {
  onNavigateToLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de llamada a API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <i className="fas fa-key text-5xl text-indigo-700"></i>
          <h1 className="mt-4 text-3xl font-bold text-indigo-900">Recuperar Contraseña</h1>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-slate-700">
              Si existe una cuenta asociada a <strong>{email}</strong>, hemos enviado un correo con las instrucciones para restablecer su contraseña.
            </p>
            <p className="text-slate-600">Por favor, revise su bandeja de entrada.</p>
            <button onClick={onNavigateToLogin} className="font-bold text-indigo-700 hover:underline">
              &larr; Volver a Iniciar Sesión
            </button>
          </div>
        ) : (
          <>
            <p className="text-slate-600 text-center">
              Introduzca su correo electrónico y le enviaremos un enlace para recuperar su cuenta.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="email-forgot" className="block text-lg font-medium text-slate-700">
                    Correo Electrónico
                  </label>
                  <button type="button" onClick={() => speak("Escriba el correo electrónico con el que se registró para que podamos enviarle las instrucciones de recuperación.")} className="text-indigo-600 hover:text-indigo-800" aria-label="Escuchar explicación sobre el correo electrónico">
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
                <input
                  id="email-forgot"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                </button>
              </div>
            </form>

            <p className="text-center text-slate-600">
              ¿Recordó su contraseña?{' '}
              <button onClick={onNavigateToLogin} className="font-bold text-indigo-700 hover:underline">
                Iniciar Sesión
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
