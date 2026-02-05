
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToRegister, onNavigateToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulación de llamada a una API real con un retardo
    setTimeout(() => {
      // En una app real, aquí se validaría con el backend.
      // Para la demo, cualquier credencial válida funciona.
      // if (email === 'usuario@correo.com' && password === 'password123') {
        onLoginSuccess();
      // } else {
      //   setError('El correo electrónico o la contraseña no son correctos.');
      // }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
            <i className="fas fa-book-open text-5xl text-indigo-700"></i>
            <h1 className="mt-4 text-3xl font-bold text-indigo-900">Portal de Capacitación</h1>
            <p className="text-slate-600">Inicie sesión para acceder a los módulos.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="email" className="block text-lg font-medium text-slate-700">
                Correo Electrónico
              </label>
              <button type="button" onClick={() => speak("Este es el campo para su correo electrónico. Es su dirección única en internet, como 'nombre@gmail.com'. Se utiliza para identificarle en los servicios online.")} className="text-indigo-600 hover:text-indigo-800" aria-label="Escuchar explicación sobre el correo electrónico">
                <i className="fas fa-volume-up"></i>
              </button>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="usuario@correo.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-lg font-medium text-slate-700">
                Contraseña
              </label>
              <button type="button" onClick={() => speak("Introduzca su clave secreta para acceder. Recuerde no compartirla con nadie.")} className="text-indigo-600 hover:text-indigo-800" aria-label="Escuchar explicación sobre la contraseña">
                 <i className="fas fa-volume-up"></i>
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
          
          <div className="text-right">
            <button type="button" onClick={onNavigateToForgotPassword} className="text-sm font-medium text-indigo-700 hover:underline">
              He olvidado mi contraseña
            </button>
          </div>

          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
        
        <p className="text-center text-slate-600">
          ¿No tiene una cuenta?{' '}
          <button onClick={onNavigateToRegister} className="font-bold text-indigo-700 hover:underline">
            Regístrese aquí
          </button>
        </p>
      </div>
    </div>
  );
};
