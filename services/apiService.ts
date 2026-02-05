import type { User, LessonState } from '../types';
import { lessons } from '../data/lessons';

// This is a MOCK API service. In a real application, this would make
// actual fetch calls to a backend server (e.g., a Node.js/Express API).
// The purpose of this file is to demonstrate the architecture and how
// frontend components would interact with a real backend.

const MOCK_USER: User = {
    id: 'user-123',
    name: 'Usuario Ejemplo',
    email: 'usuario@correo.com',
    lives: 3,
    lastLifeRechargeTimestamp: Date.now(),
    subscriptionStatus: 'inactive',
    progress: {
        completedLessons: ['online-security'],
        achievements: ['experto-en-seguridad'],
        lessonsInProgress: {
            'whatsapp-intro': { currentStep: 3 },
        },
    }
};

const apiService = {
  // Simulate a network delay
  _request: async <T>(data: T, delay = 500): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
  },

  /**
   * Fetches the current user's data from the backend.
   */
  getUser: async (): Promise<User> => {
    console.log('API CALL: getUser');
    // MOCK: In a real app: const response = await fetch('/api/user/me');
    return apiService._request(MOCK_USER);
  },

  /**
   * Informs the backend that a user is starting a lesson.
   * The backend would create a new progress entry if needed and return the initial state.
   */
  startLesson: async (lessonId: string): Promise<LessonState> => {
    console.log(`API CALL: startLesson with lessonId: ${lessonId}`);
    // MOCK: The backend would check if the user has enough lives.
    if (MOCK_USER.lives <= 0 && MOCK_USER.subscriptionStatus !== 'active') {
        throw new Error("No lives left");
    }
    const initialState: LessonState = {
      lessonId,
      currentStep: 0,
      lives: MOCK_USER.lives,
    };
    return apiService._request(initialState, 800);
  },

  /**
   * Submits a user's answer to the backend for validation.
   * The backend checks if the answer is correct and decrements a life if it's not.
   */
  submitAnswer: async (lessonId: string, stepIndex: number, answer: string): Promise<{ isCorrect: boolean; newLives: number; }> => {
    console.log(`API CALL: submitAnswer for lesson ${lessonId}, step ${stepIndex}`, { answer });
    
    // FIX: Implement correct answer validation logic instead of random result.
    const lesson = lessons.find(l => l.id === lessonId);
    const step = lesson?.steps[stepIndex];
    const isCorrect = step?.type === 'multipleChoice' && step.correctAnswer === answer;

    if (!isCorrect && MOCK_USER.lives > 0) {
        MOCK_USER.lives--; // This mutation is for mock purposes only
    }
    return apiService._request({ isCorrect, newLives: MOCK_USER.lives });
  },

  /**
   * Informs the backend that a rewarded ad was completed.
   * The backend should validate this (e.g., with server-side verification if available)
   * and grant the user one life.
   */
  claimAdReward: async (): Promise<{ newLives: number; }> => {
    console.log('API CALL: claimAdReward');
    // MOCK: Backend increments the user's life count.
    if (MOCK_USER.lives < 3) {
        MOCK_USER.lives++;
    }
    return apiService._request({ newLives: MOCK_USER.lives });
  },

  /**
   * Simulates a successful subscription purchase after completing the payment tutorial.
   * The user's status becomes 'active', and they no longer need lives to proceed.
   */
  subscribeUser: async (): Promise<User> => {
    console.log('API CALL: subscribeUser');
    MOCK_USER.subscriptionStatus = 'active';
    MOCK_USER.lives = 3; // Also restore lives for good measure.
    return apiService._request(MOCK_USER);
  },

  /**
   * Simulates creating a Stripe checkout session on the backend.
   * In a real app, this would call an endpoint that uses the Stripe Node.js library.
   */
  // FIX: Added missing 'createCheckoutSession' method to the apiService object.
  createCheckoutSession: async (productId: string): Promise<{ url: string }> => {
    console.log(`API CALL: createCheckoutSession for productId: ${productId}`);
    // MOCK: In a real app, this would return a real Stripe session URL.
    return apiService._request({ url: 'https://checkout.stripe.com/mock-session' });
  },
};

export { apiService };