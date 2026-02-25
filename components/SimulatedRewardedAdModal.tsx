
import React, { useState, useEffect } from 'react';

interface SimulatedRewardedAdModalProps {
  onClose: () => void;
  onReward: () => void;
}

const educationalTips = [
    "Consejo: Puede aumentar el tamaño del texto en su teléfono desde los ajustes de 'Accesibilidad' o 'Pantalla'.",
    "Consejo: Hacer una captura de pantalla suele ser tan fácil como pulsar a la vez los botones de encendido y bajar volumen.",
    "Consejo: Limpie la lente de la cámara de su móvil con un paño suave para que sus fotos salgan más nítidas.",
    "Consejo: Para ahorrar batería, puede reducir el brillo de la pantalla y desactivar el Wi-Fi o Bluetooth cuando no los use.",
    "Consejo: Las actualizaciones de software son importantes porque incluyen mejoras de seguridad para proteger su dispositivo."
];

export const SimulatedRewardedAdModal: React.FC<SimulatedRewardedAdModalProps> = ({ onClose, onReward }) => {
    const [progress, setProgress] = useState(0);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    const speak = (text: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        speak(educationalTips[currentTipIndex]);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 100);

        const tipInterval = setInterval(() => {
            setCurrentTipIndex(prev => {
                const nextIndex = (prev + 1) % educationalTips.length;
                speak(educationalTips[nextIndex]);
                return nextIndex;
            });
        }, 5000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(tipInterval);
            window.speechSynthesis.cancel();
        };
    }, []);

    const isComplete = progress >= 100;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-50 d-flex align-items-center justify-content-center p-4 animate-fade-in">
            <div className="bg-dark text-white rounded-4 shadow-lg p-4 d-flex flex-column justify-content-between" style={{width: '100%', maxWidth: '672px', height: '400px'}}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="h5 fw-bold">Consejo tecnológico patrocinado</h3>
                    <button onClick={onClose} className="btn-close btn-close-white"></button>
                </div>
                
                <div className="flex-grow-1 d-flex align-items-center justify-content-center text-center">
                    <div className="p-4 bg-black bg-opacity-25 rounded-3">
                        <p className="fs-4 fst-italic">"{educationalTips[currentTipIndex]}"</p>
                    </div>
                </div>
                
                <div className="d-flex flex-column gap-3">
                    <div className="progress" style={{height: '10px'}}>
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="small text-white-50 mb-0">Viendo consejo...</p>
                        <button 
                            onClick={onReward}
                            disabled={!isComplete}
                            className="btn btn-success fw-bold rounded-pill px-4 py-2"
                        >
                            {isComplete ? '¡Recompensa Obtenida!' : 'Completando...'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};