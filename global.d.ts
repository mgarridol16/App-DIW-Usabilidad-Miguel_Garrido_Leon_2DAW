// This file provides global type definitions for browser APIs that might not be
// included in the default TypeScript DOM library, such as the Web Speech API.

// By declaring these in a global scope, we avoid having to redeclare them in
// multiple components and fix related TypeScript errors.

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
}

// FIX: Add googletag types to fix TypeScript errors in useRewardedAd hook.
// The namespace defines all the types, interfaces, and enums used by the API.
declare namespace googletag {
  interface Slot {
    addService(service: any): Slot;
    makeRewardedVisible(): void;
  }

  interface RewardedSlotReadyEvent {
    slot: Slot;
  }

  interface RewardedSlotGrantedEvent {
    slot: Slot;
    reward: {
      amount: number;
      type: string;
    } | null;
  }

  interface RewardedSlotClosedEvent {
    slot: Slot;
  }

  interface PubAdsService {
    addEventListener(
      eventType: 'rewardedSlotReady',
      listener: (event: RewardedSlotReadyEvent) => void
    ): PubAdsService;
    addEventListener(
      eventType: 'rewardedSlotGranted',
      listener: (event: RewardedSlotGrantedEvent) => void
    ): PubAdsService;
    addEventListener(
      eventType: 'rewardedSlotClosed',
      listener: (event: RewardedSlotClosedEvent) => void
    ): PubAdsService;
  }

  enum OutOfPageFormat {
    REWARDED,
  }

  namespace enums {
    export { OutOfPageFormat };
  }
}

// I've removed the `declare var googletag` that caused a "Duplicate identifier" error.
// The global `googletag` object is now defined on the `Window` interface below.
// This is a cleaner approach that avoids polluting the global scope directly in TS
// and makes the typings more explicit.

interface Window {
  SpeechRecognition?: SpeechRecognitionStatic;
  webkitSpeechRecognition?: SpeechRecognitionStatic;
  googletag?: {
    cmd: Array<() => void>;
    defineOutOfPageSlot(
      adUnitPath: string,
      outOfPageFormat: googletag.enums.OutOfPageFormat
    ): googletag.Slot | null;
    pubads(): googletag.PubAdsService;
    enableServices(): void;
    display(slotOrDivId: googletag.Slot | string): void;
    destroySlots(slots?: googletag.Slot[]): boolean;
    enums: {
      OutOfPageFormat: {
        REWARDED: googletag.enums.OutOfPageFormat;
      };
    };
  };
}
