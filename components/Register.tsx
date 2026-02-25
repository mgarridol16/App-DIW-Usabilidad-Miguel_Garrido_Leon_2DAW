
import React, { useState } from 'react';

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

    if (score < 2) return { text: 'Débil', color: 'bg-danger', width: '33%' };
    if (score < 4) return { text: 'Aceptable', color: 'bg-warning', width: '66%' };
    return { text: 'Segura', color: 'bg-success', width: '100%' };
};


export const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ text: '', color: 'bg-danger', width: '0%' });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
        setPasswordStrength(checkPasswordStrength(newPassword));
    } else {
        setPasswordStrength({ text: '', color: 'bg-danger', width: '0%' });
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

    setTimeout(() => {
        console.log(`Registrando usuario: ${name}, ${email}`);
        onRegisterSuccess(name, email);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="w-100 p-4 bg-white rounded-4 shadow-lg" style={{maxWidth: '448px'}}>
        <div className="text-center mb-4">
            <i className="fas fa-user-plus display-4 text-primary"></i>
            <h1 className="mt-3 h2 fw-bold text-primary-emphasis">Crear una Cuenta</h1>
            <p className="text-muted">Complete el formulario para acceder al portal.</p>
        </div>
        
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-1">
                <label htmlFor="name" className="form-label fs-5 fw-medium text-body-secondary">
                Nombre Completo
                </label>
                <button type="button" onClick={() => speak("Por favor, escriba su nombre y apellidos en este campo.")} className="btn btn-link text-primary p-0" aria-label="Escuchar explicación sobre el nombre completo">
                    <i className="fas fa-volume-up"></i>
                </button>
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control form-control-lg"
              placeholder="Su nombre y apellidos"
            />
          </div>

          <div>
             <div className="d-flex align-items-center justify-content-between mb-1">
                <label htmlFor="email-register" className="form-label fs-5 fw-medium text-body-secondary">
                Correo Electrónico
                </label>
                <button type="button" onClick={() => speak("Escriba aquí su dirección de correo electrónico. Será su nombre de usuario para entrar a la plataforma.")} className="btn btn-link text-primary p-0" aria-label="Escuchar explicación sobre el correo electrónico">
                    <i className="fas fa-volume-up"></i>
                </button>
            </div>
            <input
              id="email-register"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control form-control-lg"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <div className="d-flex align-items-center justify-content-between mb-1">
                <label htmlFor="password-register" className="form-label fs-5 fw-medium text-body-secondary">
                Contraseña
                </label>
                <button type="button" onClick={() => speak("Vamos a crear una contraseña segura. Piense en ella como una llave secreta muy difícil de adivinar. Para que sea fuerte, debe tener al menos 8 caracteres y mezclar letras mayúsculas, minúsculas, números y símbolos, como el arroba o el signo de exclamación. Evite usar su nombre o fechas importantes. Por ejemplo, una contraseña como 'MiPerroLucas_2024!' es mucho más segura que 'lucas123'.")} className="btn btn-link text-primary p-0" aria-label="Escuchar explicación sobre cómo crear una contraseña segura">
                    <i className="fas fa-volume-up"></i>
                </button>
            </div>
            <input
              id="password-register"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="form-control form-control-lg"
              placeholder="Mínimo 8 caracteres"
            />
            {password && (
                <div className="mt-2">
                    <div className="progress" style={{height: '8px'}}>
                        <div className={`progress-bar ${passwordStrength.color}`} role="progressbar" style={{ width: passwordStrength.width, transition: 'width 0.3s ease' }} aria-valuenow={parseInt(passwordStrength.width)} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                    <p className={`text-end small fw-semibold mt-1 text-${passwordStrength.color.replace('bg-','')}`}>
                        {passwordStrength.text}
                    </p>
                </div>
            )}
          </div>

          {error && <p className="text-danger text-center fw-semibold">{error}</p>}
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-100 py-3 fs-5 fw-bold"
            >
             {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="ms-2">Creando cuenta...</span>
                  </>
              ) : 'Registrarse'}
            </button>
          </div>
        </form>
        
        <p className="text-center text-muted pt-3">
          ¿Ya tiene una cuenta?{' '}
          <button onClick={onNavigateToLogin} className="fw-bold btn btn-link text-primary p-0 text-decoration-none">
            Inicie sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};