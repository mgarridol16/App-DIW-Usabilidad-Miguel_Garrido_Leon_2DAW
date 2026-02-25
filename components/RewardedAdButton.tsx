
import React, { useCallback } from 'react';
import { useRewardedAd } from '../hooks/useRewardedAd';
import { apiService } from '../services/apiService';

interface RewardedAdButtonProps {
  onReward: () => void;
}

export const RewardedAdButton: React.FC<RewardedAdButtonProps> = ({ onReward }) => {
  const handleRewardGranted = useCallback(() => {
    apiService.claimAdReward()
      .then(response => {
        console.log(`[App] Reward claimed successfully! New lives: ${response.newLives}`);
        onReward();
      })
      .catch(err => {
        console.error('[App] Failed to claim reward from backend.', err);
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
            className="w-100 text-start p-3 btn btn-light text-success-emphasis bg-success-subtle rounded-3 border-2 border-success-subtle shadow-sm d-flex align-items-center gap-3"
        >
            <i className="fas fa-video fs-3"></i>
            <div>
                <p className="fw-bold fs-5 mb-0">{buttonText}</p>
                <p className="small mb-0">Mira un anuncio corto para continuar practicando.</p>
            </div>
        </button>
        {error && <p className="text-danger small mt-2">{error}</p>}
    </div>
  );
};