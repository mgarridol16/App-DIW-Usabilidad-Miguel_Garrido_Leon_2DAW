
import React, { useState } from 'react';
import type { User } from '../types';

interface RegisterProps {
  onRegisterSuccess: (name: string, email: string) => void;
  onNavigateToLogin: () => void;
}

// Función para evaluar la fortaleza de la contraseña
const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 2) return { text: 'Débil', color: 'bg-red-500', width: 'w-1/3' };
    if (score < 4) return { text: 'Aceptable', color: 'bg-yellow-500', width: 'w-2/3' };
    return { text: 'Segura', color: 'bg-green-500', width: 'w-full' };
};


export const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ text: '', color: '', width: 'w-0' });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
        setPasswordStrength(checkPasswordStrength(newPassword));
    } else {
        setPasswordStrength({ text: '', color: '', width: 'w-0' });
    }
  }

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

    if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    
    setIsLoading(true);

    // Simulación de llamada a una API real para registrar un nuevo usuario
    setTimeout(() => {
        console.log(`Registrando usuario: ${name}, ${email}`);
        onRegisterSuccess(name, email);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
            <i className="fas fa-user-plus text-5xl text-indigo-700"></i>
            <h1 className="mt-4 text-3xl font-bold text-indigo-900">Crear una Cuenta</h1>
            <p className="text-slate-600">Complete el formulario para acceder al portal.</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between mb-1">
                <label htmlFor="name" className="block text-lg font-medium text-slate-700">
                Nombre Completo
                </label>
                <button type="button" onClick={() => speak("Por favor, escriba su nombre y apellidos en este campo.")} className="text-indigo-600 hover:text-indigo-800" aria-label="Escuchar explicación sobre el nombre completo">
                    <i className="fas fa-volume-up"></i>
                </button>
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Su nombre y apellidos"
            />
          </div>

          <div>
             <div className="flex items-center justify-between mb-1">
                <label htmlFor="email-register" className="block text-lg font-medium text-slate-700">
                Correo Electrónico
                </label>
                <button type="button" onClick={() => speak("Escriba aquí su dirección de correo electrónico. Será su nombre de usuario para entrar a la plataforma.")} className="text-indigo-600 hover:text-indigo-800" aria-label="Escuchar explicación sobre el correo electrónico">
                    <i className="fas fa-volume-up"></i>
                </button>
            </div>
            <input
              id="email-register"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
                <label htmlFor="password-register" className="block text-lg font-medium text-slate-700">
                Contraseña
                </label>
                <button type="button" onClick={() => speak("Vamos a crear una contraseña segura. Piense en ella como una llave secreta muy difícil de adivinar. Para que sea fuerte, debe tener al menos 8 caracteres y mezclar letras mayúsculas, minúsculas, números y símbolos, como el arroba o el signo de exclamación. Evite usar su nombre o fechas importantes. Por ejemplo, una contraseña como 'MiPerroLucas_2024!' es mucho más segura que 'lucas123'.")} className="text-indigo-600 hover:text-indigo-800" aria-label="Escuchar explicación sobre cómo crear una contraseña segura">
                    <i className="fas fa-volume-up"></i>
                </button>
            </div>
            <input
              id="password-register"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Mínimo 8 caracteres"
            />
            {password && (
                <div className="mt-2">
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}></div>
                    </div>
                    <p className="text-sm text-right font-semibold mt-1" style={{ color: passwordStrength.color.replace('bg-', '').replace('-500', '') }}>
                        {passwordStrength.text}
                    </p>
                </div>
            )}
          </div>

          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
          </div>
        </form>
        
        <p className="text-center text-slate-600">
          ¿Ya tiene una cuenta?{' '}
          <button onClick={onNavigateToLogin} className="font-bold text-indigo-700 hover:underline">
            Inicie sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};
