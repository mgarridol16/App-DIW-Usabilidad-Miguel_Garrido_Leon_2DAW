
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
      <h2 className="text-3xl font-bold text-indigo-900">Simulador de Pago Seguro</h2>
      <p className="text-slate-600">
        Esta es una simulación para aprender a pagar online. <strong>Ningún dato real es necesario ni será guardado.</strong>
      </p>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
        <h3 className="font-bold text-blue-800 flex items-center gap-2"><i className="fas fa-shield-alt"></i>Consejos de Seguridad</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Verifique siempre que la dirección web empiece con <strong>"https"</strong> y muestre un icono de candado.</li>
          <li>Nunca realice pagos conectado a una red Wi-Fi pública.</li>
          <li>Jamás comparta el código CVV o su contraseña por correo o teléfono.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
            <label className="font-semibold text-slate-700 flex items-center justify-between">
                <span>Número de Tarjeta</span>
                <button type="button" onClick={() => speak("Aquí se introduce el número largo de 16 dígitos que aparece en la parte frontal de su tarjeta.")} className="text-indigo-600 hover:text-indigo-800 text-lg" aria-label="Escuchar explicación sobre el número de tarjeta"><i className="fas fa-volume-up"></i></button>
            </label>
            <input type="text" disabled className="w-full p-3 border-2 border-slate-300 rounded-lg bg-slate-100" value="4242 4242 4242 4242" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="font-semibold text-slate-700 flex items-center justify-between">
                    <span>Fecha (MM/AA)</span>
                    <button type="button" onClick={() => speak("Introduzca el mes y los dos últimos dígitos del año de caducidad, tal como aparecen en su tarjeta.")} className="text-indigo-600 hover:text-indigo-800 text-lg" aria-label="Escuchar explicación sobre la fecha de caducidad"><i className="fas fa-volume-up"></i></button>
                </label>
                <input type="text" disabled className="w-full p-3 border-2 border-slate-300 rounded-lg bg-slate-100" value="12/28" />
            </div>
            <div>
                <label className="font-semibold text-slate-700 flex items-center justify-between">
                    <span>CVV</span>
                    <button type="button" onClick={() => speak("El CVV es un código de seguridad de 3 dígitos que se encuentra en la parte trasera de su tarjeta. Es una capa extra de protección.")} className="text-indigo-600 hover:text-indigo-800 text-lg" aria-label="Escuchar explicación sobre el CVV"><i className="fas fa-volume-up"></i></button>
                </label>
                <input type="text" disabled className="w-full p-3 border-2 border-slate-300 rounded-lg bg-slate-100" value="123" />
            </div>
        </div>
        <div>
            <label className="font-semibold text-slate-700 flex items-center justify-between">
                <span>Nombre del Titular</span>
                <button type="button" onClick={() => speak("Escriba su nombre completo tal y como aparece en la tarjeta.")} className="text-indigo-600 hover:text-indigo-800 text-lg" aria-label="Escuchar explicación sobre el nombre del titular"><i className="fas fa-volume-up"></i></button>
            </label>
            <input type="text" disabled className="w-full p-3 border-2 border-slate-300 rounded-lg bg-slate-100" value="USUARIO EJEMPLO" />
        </div>
        
        <div className="pt-4 space-y-2">
            <button type="submit" className="w-full py-3 bg-indigo-700 text-white font-bold text-lg rounded-lg hover:bg-indigo-800 transition-colors">
                Pagar de forma segura (Simulación)
            </button>
            <button type="button" onClick={onClose} className="w-full text-slate-600 hover:underline font-semibold">
                Cancelar
            </button>
        </div>
      </form>
    </>
  );

  const renderProcessing = () => (
    <div className="flex flex-col items-center justify-center h-64">
        <i className="fas fa-spinner fa-spin text-6xl text-indigo-600"></i>
        <p className="mt-4 text-2xl font-semibold text-slate-700">Procesando pago simulado...</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <i className="fas fa-check text-5xl text-green-600"></i>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-indigo-900">¡Simulación Completada!</h2>
        <p className="mt-2 text-lg text-slate-600">Ha completado el proceso de pago simulado de forma correcta.</p>
        <button onClick={onPaymentSuccess} className="mt-6 w-full py-3 bg-indigo-700 text-white font-bold text-lg rounded-lg hover:bg-indigo-800 transition-colors">
            Entendido
        </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center space-y-6">
        {step === 'form' && renderForm()}
        {step === 'processing' && renderProcessing()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
};
