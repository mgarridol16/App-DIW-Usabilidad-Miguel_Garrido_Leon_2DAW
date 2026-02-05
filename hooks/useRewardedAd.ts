import { useState, useEffect, useRef } from 'react';
import { config } from '../config';

type AdState = 'uninitialized' | 'loading' | 'ready' | 'error' | 'shown';

const AD_LOAD_TIMEOUT_MS = 15000; // 15 seconds

export const useRewardedAd = (onRewardGranted: () => void) => {
  const [adState, setAdState] = useState<AdState>('uninitialized');
  const [error, setError] = useState<string | null>(null);
  const rewardedSlotRef = useRef<googletag.Slot | null>(null);
  const adLoadTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // The flow is managed by events (e.g., ad closed) which reset state to 'uninitialized'.
    if (adState !== 'uninitialized') return;

    setAdState('loading');
    setError(null);
    console.log('[GPT] Initializing new ad slot.');

    // Set a timeout to prevent getting stuck in a loading state.
    adLoadTimeoutRef.current = window.setTimeout(() => {
        setError('El anuncio tardó demasiado en cargar. Por favor, inténtelo de nuevo.');
        setAdState('error');
        console.error('[GPT] Ad load timeout.');
    }, AD_LOAD_TIMEOUT_MS);

    // FIX: Remove 'as any' and use globally defined types for googletag.
    // FIX: The googletag object is on the window scope. We need to reference it as window.googletag
    window.googletag = window.googletag || ({ cmd: [] } as any);

    window.googletag.cmd.push(() => {
      try {
        console.log('[GPT] Defining ad slot for path:', config.googleAdManager.adUnitPath);
        // FIX: Replaced 'googletag' with 'window.googletag!' to correctly reference the global object.
        const rewardedSlot = window.googletag!.defineOutOfPageSlot(
          config.googleAdManager.adUnitPath,
          // FIX: Replaced 'googletag' with 'window.googletag!'
          window.googletag!.enums.OutOfPageFormat.REWARDED
        );

        if (rewardedSlot) {
          console.log('[GPT] Ad slot defined successfully:', rewardedSlot);
          rewardedSlotRef.current = rewardedSlot;
          // FIX: Replaced 'googletag' with 'window.googletag!'
          rewardedSlot.addService(window.googletag!.pubads());
          
          // FIX: Add explicit types for ad events based on global definitions.
          // FIX: Replaced 'googletag' with 'window.googletag!'
          window.googletag!.pubads().addEventListener('rewardedSlotReady', (event: googletag.RewardedSlotReadyEvent) => {
            if (event.slot === rewardedSlotRef.current) {
              if (adLoadTimeoutRef.current) clearTimeout(adLoadTimeoutRef.current);
              setAdState('ready');
              console.log('[GPT] Event: rewardedSlotReady');
            }
          });

          // FIX: Replaced 'googletag' with 'window.googletag!'
          window.googletag!.pubads().addEventListener('rewardedSlotGranted', (event: googletag.RewardedSlotGrantedEvent) => {
            if (event.slot === rewardedSlotRef.current) {
              console.log('[GPT] Event: rewardedSlotGranted', event.reward);
              onRewardGranted();
            }
          });

          // FIX: Replaced 'googletag' with 'window.googletag!'
          window.googletag!.pubads().addEventListener('rewardedSlotClosed', (event: googletag.RewardedSlotClosedEvent) => {
            if (event.slot === rewardedSlotRef.current) {
              console.log('[GPT] Event: rewardedSlotClosed. Destroying slot to reload.');
              // FIX: Replaced 'googletag' with 'window.googletag!'
              window.googletag!.destroySlots([rewardedSlotRef.current!]);
              setAdState('uninitialized');
            }
          });

          // FIX: Replaced 'googletag' with 'window.googletag!'
          window.googletag!.enableServices();
          // FIX: Replaced 'googletag' with 'window.googletag!'
          window.googletag!.display(rewardedSlot);
          console.log('[GPT] Called display() to fetch ad.');
        } else {
          throw new Error('defineOutOfPageSlot returned null.');
        }
      } catch (e) {
          console.error('[GPT] Error during ad initialization:', e);
          setError('Error al inicializar el anuncio de Google.');
          setAdState('error');
      }
    });

    return () => {
      // Cleanup function to destroy the ad slot and clear timeout.
      if (adLoadTimeoutRef.current) {
        clearTimeout(adLoadTimeoutRef.current);
      }
      if (rewardedSlotRef.current) {
        // FIX: Replaced 'googletag' with 'window.googletag?' for safe access during cleanup.
        window.googletag?.cmd.push(() => {
          // FIX: Replaced 'googletag' with 'window.googletag?'
          window.googletag?.destroySlots([rewardedSlotRef.current!]);
        });
      }
    };
  }, [adState, onRewardGranted]);
  
  const showAd = () => {
    if (adState === 'ready' && rewardedSlotRef.current) {
      console.log('[GPT] Showing ad.');
      rewardedSlotRef.current.makeRewardedVisible();
      setAdState('shown');
    }
  };

  return { adState, showAd, error };
};