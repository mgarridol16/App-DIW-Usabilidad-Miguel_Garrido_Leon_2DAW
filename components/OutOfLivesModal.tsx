
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
    // This function is called after the payment simulation is successfully completed.
    // It triggers the main app logic for handling a "subscription" as a reward.
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
      
      {/* FIX: Only render the main modal content if no simulation modal is active */}
      {!showPaymentSim && !showAdSim && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 text-center space-y-6">
            <i className="fas fa-heart-broken text-6xl text-red-500"></i>
            <h2 className="text-4xl font-bold text-indigo-900">¡Te has quedado sin vidas!</h2>
            <p className="text-xl text-slate-600">
              Has cometido varios errores. Para continuar, puedes elegir una de las siguientes opciones educativas.
            </p>

            <div className="space-y-4 pt-4">
              <button
                onClick={() => setShowPaymentSim(true)}
                className="w-full text-left p-4 bg-yellow-400 text-yellow-900 rounded-xl border-2 border-yellow-500 shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-4"
              >
                <i className="fas fa-credit-card text-2xl"></i>
                <div>
                  <p className="font-bold text-lg">Aprender a Pagar Online</p>
                  <p className="text-sm">Practique en un simulador de pago seguro y aprenda a protegerse.</p>
                </div>
              </button>
              
              <button
                onClick={() => setShowAdSim(true)}
                className="w-full text-left p-4 bg-green-100 text-green-800 rounded-xl border-2 border-green-300 shadow-sm hover:bg-green-200 transition-colors flex items-center gap-4"
              >
                  <i className="fas fa-video text-2xl"></i>
                  <div>
                      <p className="font-bold text-lg">Ver un Consejo y Recuperar Vida</p>
                      <p className="text-sm">Mire un breve consejo tecnológico para continuar practicando.</p>
                  </div>
              </button>
            </div>

            <div className="pt-4">
              <button onClick={onExit} className="text-slate-600 hover:underline font-semibold">
                No, gracias. Salir de la lección
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};