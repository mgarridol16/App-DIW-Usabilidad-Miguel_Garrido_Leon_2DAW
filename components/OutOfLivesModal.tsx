
import React, { useState } from 'react';
import { SimulatedPaymentModal } from './SimulatedPaymentModal';
import { SimulatedRewardedAdModal } from './SimulatedRewardedAdModal';

interface OutOfLivesModalProps {
  onAdReward: () => void;
  onExit: () => void;
  onSubscriptionSuccess: () => void;
}

export const OutOfLivesModal: React.FC<OutOfLivesModalProps> = ({ onAdReward, onExit, onSubscriptionSuccess }) => {
  const [showPaymentSim, setShowPaymentSim] = useState(false);
  const [showAdSim, setShowAdSim] = useState(false);

  const handlePaymentSuccess = () => {
    setShowPaymentSim(false);
    onSubscriptionSuccess();
  };

  const handleAdRewardAndClose = () => {
    onAdReward();
    setShowAdSim(false);
  }

  return (
    <>
      {showPaymentSim && <SimulatedPaymentModal onClose={() => setShowPaymentSim(false)} onPaymentSuccess={handlePaymentSuccess} />}
      {showAdSim && <SimulatedRewardedAdModal onClose={() => setShowAdSim(false)} onReward={handleAdRewardAndClose} />}
      
      {!showPaymentSim && !showAdSim && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-50 d-flex align-items-center justify-content-center p-4 animate-fade-in">
          <div className="bg-white rounded-4 shadow-lg p-5 text-center d-flex flex-column gap-4" style={{maxWidth: '512px'}}>
            <i className="fas fa-heart-broken display-1 text-danger"></i>
            <h2 className="h1 fw-bold text-primary-emphasis">¡Te has quedado sin vidas!</h2>
            <p className="fs-5 text-secondary">
              Has cometido varios errores. Para continuar, puedes elegir una de las siguientes opciones educativas.
            </p>

            <div className="d-flex flex-column gap-3 pt-3">
              <button
                onClick={() => setShowPaymentSim(true)}
                className="w-100 text-start p-3 btn btn-warning text-dark rounded-3 border-2 border-warning-subtle shadow-sm d-flex align-items-center gap-3"
              >
                <i className="fas fa-credit-card fs-3"></i>
                <div>
                  <p className="fw-bold fs-5 mb-0">Aprender a Pagar Online</p>
                  <p className="small mb-0">Practique en un simulador de pago seguro y aprenda a protegerse.</p>
                </div>
              </button>
              
              <button
                onClick={() => setShowAdSim(true)}
                className="w-100 text-start p-3 btn btn-light text-success-emphasis bg-success-subtle rounded-3 border-2 border-success-subtle shadow-sm d-flex align-items-center gap-3"
              >
                  <i className="fas fa-video fs-3"></i>
                  <div>
                      <p className="fw-bold fs-5 mb-0">Ver un Consejo y Recuperar Vida</p>
                      <p className="small mb-0">Mire un breve consejo tecnológico para continuar practicando.</p>
                  </div>
              </button>
            </div>

            <div className="pt-3">
              <button onClick={onExit} className="btn btn-link text-secondary fw-semibold">
                No, gracias. Salir de la lección
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};