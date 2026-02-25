
import React, { useState } from 'react';

interface SimulatedPaymentModalProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const SimulatedPaymentModal: React.FC<SimulatedPaymentModalProps> = ({ onClose, onPaymentSuccess }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
        setStep('success');
    }, 2500);
  };

  const renderForm = () => (
    <>
      <h2 className="h3 fw-bold text-primary-emphasis">Simulador de Pago Seguro</h2>
      <p className="text-secondary">
        Esta es una simulación para aprender a pagar online. <strong>Ningún dato real es necesario ni será guardado.</strong>
      </p>

      <div className="alert alert-primary text-start">
        <h4 className="alert-heading h6 fw-bold d-flex align-items-center gap-2"><i className="fas fa-shield-alt"></i>Consejos de Seguridad</h4>
        <ul className="list-unstyled mb-0 small">
          <li><i className="fas fa-check-circle text-primary me-2"></i>Verifique siempre que la dirección web empiece con <strong>"https"</strong> y muestre un icono de candado.</li>
          <li><i className="fas fa-check-circle text-primary me-2"></i>Nunca realice pagos conectado a una red Wi-Fi pública.</li>
          <li><i className="fas fa-check-circle text-primary me-2"></i>Jamás comparta el código CVV o su contraseña por correo o teléfono.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 text-start">
        <div>
            <label className="form-label fw-semibold d-flex align-items-center justify-content-between">
                <span>Número de Tarjeta</span>
                <button type="button" onClick={() => speak("Aquí se introduce el número largo de 16 dígitos que aparece en la parte frontal de su tarjeta.")} className="btn btn-link p-0" aria-label="Escuchar explicación sobre el número de tarjeta"><i className="fas fa-volume-up"></i></button>
            </label>
            <input type="text" disabled className="form-control form-control-lg bg-light" value="4242 4242 4242 4242" />
        </div>
        <div className="row g-3">
            <div className="col">
                <label className="form-label fw-semibold d-flex align-items-center justify-content-between">
                    <span>Fecha (MM/AA)</span>
                    <button type="button" onClick={() => speak("Introduzca el mes y los dos últimos dígitos del año de caducidad, tal como aparecen en su tarjeta.")} className="btn btn-link p-0" aria-label="Escuchar explicación sobre la fecha de caducidad"><i className="fas fa-volume-up"></i></button>
                </label>
                <input type="text" disabled className="form-control form-control-lg bg-light" value="12/28" />
            </div>
            <div className="col">
                <label className="form-label fw-semibold d-flex align-items-center justify-content-between">
                    <span>CVV</span>
                    <button type="button" onClick={() => speak("El CVV es un código de seguridad de 3 dígitos que se encuentra en la parte trasera de su tarjeta. Es una capa extra de protección.")} className="btn btn-link p-0" aria-label="Escuchar explicación sobre el CVV"><i className="fas fa-volume-up"></i></button>
                </label>
                <input type="text" disabled className="form-control form-control-lg bg-light" value="123" />
            </div>
        </div>
        <div>
            <label className="form-label fw-semibold d-flex align-items-center justify-content-between">
                <span>Nombre del Titular</span>
                <button type="button" onClick={() => speak("Escriba su nombre completo tal y como aparece en la tarjeta.")} className="btn btn-link p-0" aria-label="Escuchar explicación sobre el nombre del titular"><i className="fas fa-volume-up"></i></button>
            </label>
            <input type="text" disabled className="form-control form-control-lg bg-light" value="USUARIO EJEMPLO" />
        </div>
        
        <div className="pt-3 d-flex flex-column gap-2">
            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
                Pagar de forma segura (Simulación)
            </button>
            <button type="button" onClick={onClose} className="btn btn-link text-secondary fw-semibold">
                Cancelar
            </button>
        </div>
      </form>
    </>
  );

  const renderProcessing = () => (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{height: '256px'}}>
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 fs-4 fw-semibold text-secondary">Procesando pago simulado...</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center" style={{width: '96px', height: '96px'}}>
            <i className="fas fa-check display-3 text-success"></i>
        </div>
        <h2 className="mt-4 h3 fw-bold text-primary-emphasis">¡Simulación Completada!</h2>
        <p className="mt-2 fs-5 text-secondary">Ha completado el proceso de pago simulado de forma correcta.</p>
        <button onClick={onPaymentSuccess} className="mt-4 btn btn-primary btn-lg w-100 fw-bold">
            Entendido
        </button>
    </div>
  );

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-50 d-flex align-items-center justify-content-center p-4 animate-fade-in">
      <div className="bg-white rounded-4 shadow-lg p-5 text-center d-flex flex-column gap-4" style={{maxWidth: '500px'}}>
        {step === 'form' && renderForm()}
        {step === 'processing' && renderProcessing()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};