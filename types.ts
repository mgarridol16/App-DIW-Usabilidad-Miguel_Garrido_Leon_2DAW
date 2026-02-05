// Define la configuración para un paso de simulación práctica
export interface SimulatorConfig {
  app: 'whatsapp' | 'email' | 'camera' | 'videocall' | 'word'; // La aplicación a simular
  initialState?: any; // Estado inicial del simulador para este paso
  highlightElement: string; // Selector CSS del elemento a resaltar
  taskDescription: string; // Instrucción de la IA para este paso
  expectedAction: { type: 'click' | 'input'; value?: string }; // Acción que el usuario debe realizar
}

// Opciones para preguntas de opción múltiple
export interface QuizOption {
  id: string;
  text: string;
}

export interface Step {
  title: string;
  // El tipo de paso determina cómo se renderiza y se interactúa
  type: 'instructional' | 'multipleChoice' | 'simulatorTask';
  
  // Contenido para pasos de instrucción
  content?: string;
  image?: string;
  video?: string;

  // Contenido para preguntas de opción múltiple
  question?: string;
  options?: QuizOption[];
  correctAnswer?: string; // ID de la opción correcta
  feedbackCorrect?: string;
  feedbackIncorrect?: string;

  // Configuración para tareas del simulador
  simulatorConfig?: SimulatorConfig;
}

export interface Lesson {
  id: string;
  title:string;
  description: string;
  icon: string;
  steps: Step[];
  unlocksAchievement?: string; // ID del logro que se desbloquea al completar
}

export interface ChatMessage {
    sender: 'user' | 'ai' | 'system';
    text: string;
}

// Define la estructura de un logro
export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
}

// Representa el estado del usuario almacenado en la base de datos del backend.
export interface User {
  id: string;
  name: string;
  email: string;
  lives: number;
  lastLifeRechargeTimestamp: number; // UNIX timestamp
  subscriptionStatus: 'active' | 'inactive';
  progress: {
    completedLessons: string[]; // IDs de lecciones completadas
    achievements: string[]; // IDs de logros desbloqueados
    // FIX: Add lessonsInProgress to track lessons that have been started but not completed.
    lessonsInProgress: { [lessonId: string]: { currentStep: number } };
  };
}

// Representa el estado de una lección en curso.
// Esto sería devuelto por la API al iniciar una lección.
export interface LessonState {
    lessonId: string;
    currentStep: number;
    lives: number;
}