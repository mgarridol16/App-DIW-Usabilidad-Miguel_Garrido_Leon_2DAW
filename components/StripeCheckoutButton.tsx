
import React, { useState } from 'react';
import { apiService } from '../services/apiService';

interface StripeCheckoutButtonProps {
  productId: 'premium_subscription' | 'buy_lives_pack';
  className?: string;
  children: React.ReactNode;
}

export const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ productId, className, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { url } = await apiService.createCheckoutSession(productId);
      
      if (!url) {
        throw new Error('No se pudo crear la sesión de pago.');
      }

      window.open(url, '_blank', 'noopener,noreferrer');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Un error desconocido ha ocurrido.';
      setError(errorMessage);
      console.error('Stripe Checkout error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${className} disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
            <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="ms-2">Procesando...</span>
            </>
        ) : children}
      </button>
      {error && <p className="text-danger small mt-2">{error}</p>}
    </div>
  );
};