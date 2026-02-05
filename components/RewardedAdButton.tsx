
import React, { useCallback } from 'react';
import { useRewardedAd } from '../hooks/useRewardedAd';
import { apiService } from '../services/apiService';

interface RewardedAdButtonProps {
  onReward: () => void;
}

export const RewardedAdButton: React.FC<RewardedAdButtonProps> = ({ onReward }) => {
  const handleRewardGranted = useCallback(() => {
    // The ad SDK confirmed the user watched the ad.
    // Now, we tell our backend to grant the reward.
    apiService.claimAdReward()
      .then(response => {
        console.log(`[App] Reward claimed successfully! New lives: ${response.newLives}`);
        onReward(); // Update the UI state
      })
      .catch(err => {
        console.error('[App] Failed to claim reward from backend.', err);
        // Optionally, show an error to the user
      });
  }, [onReward]);
  
  const { adState, showAd, error } = useRewardedAd(handleRewardGranted);

  const isDisabled = adState !== 'ready';
  
  let buttonText = 'Cargando Anuncio...';
  if (adState === 'ready') buttonText = 'Recuperar una vida';
  if (adState === 'error') buttonText = 'Anuncio no disponible';
  if (adState === 'loading') buttonText = 'Cargando Anuncio...';
  if (adState === 'shown') buttonText = 'Viendo anuncio...';
  
  return (
    <div>
        <button
            onClick={showAd}
            disabled={isDisabled}
            className="w-full text-left p-4 bg-green-100 text-green-800 rounded-xl border-2 border-green-300 shadow-sm hover:bg-green-200 transition-colors flex items-center gap-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            <i className="fas fa-video text-2xl"></i>
            <div>
            <p className="font-bold text-lg">{buttonText}</p>
            <p className="text-sm">Mira un anuncio corto para continuar practicando.</p>
            </div>
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};
