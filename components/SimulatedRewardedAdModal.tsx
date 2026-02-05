
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
        // Start speaking the first tip
        speak(educationalTips[currentTipIndex]);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 100); // 10 seconds total duration

        const tipInterval = setInterval(() => {
            setCurrentTipIndex(prev => {
                const nextIndex = (prev + 1) % educationalTips.length;
                speak(educationalTips[nextIndex]);
                return nextIndex;
            });
        }, 5000); // Change tip every 5 seconds

        return () => {
            clearInterval(progressInterval);
            clearInterval(tipInterval);
            window.speechSynthesis.cancel();
        };
    }, []);

    const isComplete = progress >= 100;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 text-white w-full max-w-2xl h-[400px] rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Consejo tecnológico patrocinado</h3>
                    <button onClick={onClose} className="text-2xl text-slate-400 hover:text-white">&times;</button>
                </div>
                
                <div className="flex-1 flex items-center justify-center text-center">
                    <div className="p-4 bg-black/30 rounded-lg">
                        <p className="text-2xl italic">"{educationalTips[currentTipIndex]}"</p>
                    </div>
                </div>
                
                <div className="space-y-3">
                     <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-slate-400">Viendo consejo...</p>
                        <button 
                            onClick={onReward}
                            disabled={!isComplete}
                            className="px-6 py-2 bg-green-600 text-white font-bold rounded-full disabled:bg-slate-500 disabled:cursor-not-allowed hover:bg-green-700"
                        >
                            {isComplete ? '¡Recompensa Obtenida!' : 'Completando...'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
