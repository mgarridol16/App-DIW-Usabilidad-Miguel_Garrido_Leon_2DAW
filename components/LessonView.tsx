
import React, { useState, useEffect, useCallback } from 'react';
import type { Lesson, Step, QuizOption, LessonState } from '../types';
import { PracticeSimulator } from './PracticeSimulator';
import { LessonCompletion } from './LessonCompletion';
import { OutOfLivesModal } from './OutOfLivesModal';

const MAX_LIVES = 3;

interface LessonViewProps {
  lesson: Lesson;
  initialState: LessonState;
  onGoBack: () => void;
  onStepComplete: (lessonId: string, newStepIndex: number) => void;
  onSubmission: (lessonId: string, stepIndex: number, answer: string) => Promise<boolean>;
  onLifeRestored: () => void;
  onSubscriptionSuccess: () => void;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

export const LessonView: React.FC<LessonViewProps> = ({ lesson, initialState, onGoBack, onStepComplete, onSubmission, onLifeRestored, onSubscriptionSuccess }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialState.currentStep);
  const [lives, setLives] = useState(initialState.lives);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showOutOfLivesModal, setShowOutOfLivesModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentStepIndex(initialState.currentStep);
    setLives(initialState.lives);
  }, [initialState]);

  useEffect(() => {
    setShowOutOfLivesModal(lives <= 0);
  }, [lives]);

  const currentStep = lesson.steps[currentStepIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerStatus('unanswered');
    window.speechSynthesis.cancel();
  }, [currentStepIndex, lesson]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };
  
  const handleSelectAnswer = (optionId: string) => {
      if (answerStatus === 'unanswered') {
          setSelectedAnswer(optionId);
      }
  }

  const handleCheckAnswer = async () => {
    if (currentStep.type !== 'multipleChoice' || !selectedAnswer || isSubmitting) return;

    setIsSubmitting(true);
    const isCorrect = await onSubmission(lesson.id, currentStepIndex, selectedAnswer);
    setIsSubmitting(false);

    if (isCorrect) {
      setAnswerStatus('correct');
      speak(currentStep.feedbackCorrect || '¡Correcto!');
    } else {
      setAnswerStatus('incorrect');
      speak(currentStep.feedbackIncorrect || 'Inténtelo de nuevo.');
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleContinue = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      const newStepIndex = currentStepIndex + 1;
      onStepComplete(lesson.id, newStepIndex);
    } else {
      // Final step should be handled by onStepComplete in App.tsx
      // which would call an API to mark lesson as complete
      onStepComplete(lesson.id, lesson.steps.length);
      setIsCompleted(true);
    }
  };
  
  const handleTaskComplete = () => {
      // In a real app, simulator tasks might also be validated by the backend
      setAnswerStatus('correct');
      speak("¡Muy bien! Tarea completada.");
  }
  
  const handleAdReward = useCallback(async () => {
    await onLifeRestored();
    setShowOutOfLivesModal(false);
  }, [onLifeRestored]);

  const renderInstructionalStep = (step: Step) => (
     <>
        <div className="flex justify-between items-start">
            <h3 className="text-2xl font-semibold text-slate-700 flex-1">{step.title}</h3>
            <button 
                onClick={() => speak(step.content || '')}
                className="flex-shrink-0 ml-4 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors active:scale-90"
                aria-label="Leer instrucción en voz alta"
            >
                <i className="fas fa-volume-up text-2xl"></i>
            </button>
        </div>
        {step.video ? <video key={step.video} src={step.video} controls className="w-full rounded-lg shadow-md aspect-video bg-slate-800" /> : 
        (
            <div className="w-full rounded-lg shadow-md aspect-video bg-slate-200 border flex items-center justify-center p-4">
            {step.image === 'logo-app' ? (
                <div className="text-center text-slate-500">
                    <i className="fas fa-book-open text-6xl text-indigo-300"></i>
                    <p className="mt-2 font-semibold">Portal de Capacitación</p>
                </div>
            ) : (
                <p className="text-slate-500 italic text-center">[{step.image?.replace('// Placeholder: ', '')}]</p>
            )}
            </div>
        )}
        <p className="text-lg md:text-xl leading-relaxed text-slate-600">{step.content}</p>
     </>
  );
  
  const renderMultipleChoiceStep = (step: Step) => (
    <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-800">{step.question}</h3>
        <div className="space-y-3">
            {step.options?.map((option: QuizOption) => {
                const isSelected = selectedAnswer === option.id;
                let buttonClass = 'border-slate-300 bg-white hover:bg-slate-100';
                if (answerStatus !== 'unanswered' && isSelected) {
                    buttonClass = answerStatus === 'correct' ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100';
                } else if (isSelected) {
                    buttonClass = 'border-indigo-500 bg-indigo-100 ring-2 ring-indigo-400';
                }
                
                return (
                    <button key={option.id} onClick={() => handleSelectAnswer(option.id)}
                        className={`w-full text-left p-4 text-lg rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${buttonClass}`}
                        disabled={answerStatus !== 'unanswered' || isSubmitting}>
                        <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-slate-400'}`}></div>
                        <span>{option.text}</span>
                    </button>
                )
            })}
        </div>
    </div>
  );

  const getButtonText = () => {
    if (isSubmitting) return 'Verificando...';
    if (currentStep.type === 'instructional' || (answerStatus === 'correct')) {
        if (currentStepIndex === lesson.steps.length - 1) return 'Finalizar Lección';
        return 'Continuar';
    }
    if (answerStatus === 'incorrect') return 'Intentar de nuevo';
    return 'Comprobar';
  }
  
  if (isCompleted) {
      return <LessonCompletion lesson={lesson} onGoBack={onGoBack} />;
  }
  
  if (!currentStep) {
    return (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-red-600">Error en la lección</h2>
            <p className="text-slate-600 mt-2">Ha ocurrido un problema al cargar este paso. Por favor, vuelva al inicio.</p>
            <button onClick={onGoBack} className="mt-4 px-6 py-2 bg-indigo-700 text-white font-semibold rounded-full">Volver al Menú</button>
        </div>
    );
  }

  return (
    <div className="animate-fade-in">
        {showOutOfLivesModal && 
            <OutOfLivesModal 
                onAdReward={handleAdReward}
                onExit={onGoBack}
                onSubscriptionSuccess={onSubscriptionSuccess}
            />
        }
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
            <header className="mb-6 pb-4 border-b border-slate-200">
                 <div className="flex justify-between items-start">
                    <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 flex-1 pr-4">{lesson.title}</h2>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: MAX_LIVES }).map((_, i) => (
                            <i key={i} className={`fas fa-heart text-3xl transition-colors ${i < lives ? 'text-red-500' : 'text-slate-300'}`}></i>
                        ))}
                    </div>
                 </div>
                 <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(currentStepIndex / (lesson.steps.length - 1)) * 100}%` }}></div>
                </div>
            </header>
            
            <div className="space-y-6 min-h-[350px]">
                {currentStep.type === 'instructional' && renderInstructionalStep(currentStep)}
                {currentStep.type === 'multipleChoice' && renderMultipleChoiceStep(currentStep)}
                {currentStep.type === 'simulatorTask' && <PracticeSimulator key={`${lesson.id}-${currentStepIndex}`} step={currentStep} onTaskComplete={handleTaskComplete}/>}
            </div>
        </div>
        
        <div className={`mt-1 rounded-b-xl transition-all duration-300
            ${answerStatus === 'correct' ? 'bg-green-100 text-green-800 p-4' : ''}
            ${answerStatus === 'incorrect' ? 'bg-red-100 text-red-800 p-4' : ''}
        `}>
            {answerStatus === 'correct' && <p className="font-bold text-lg">{currentStep.feedbackCorrect || '¡Buen trabajo!'}</p>}
            {answerStatus === 'incorrect' && <p className="font-bold text-lg">{currentStep.feedbackIncorrect || '¡Ups! Inténtalo de nuevo.'}</p>}
        </div>

        <div className="mt-4 pt-4 flex justify-between items-center gap-4">
             <button onClick={onGoBack} className="text-slate-600 hover:underline font-semibold">
                Salir
            </button>
            <button 
                onClick={() => {
                    if (currentStep.type === 'instructional' || answerStatus === 'correct') handleContinue();
                    else if (answerStatus === 'incorrect') { setSelectedAnswer(null); setAnswerStatus('unanswered'); }
                    else handleCheckAnswer();
                }}
                disabled={isSubmitting || (currentStep.type === 'multipleChoice' && !selectedAnswer) || (currentStep.type === 'simulatorTask' && answerStatus !== 'correct')}
                className={`px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                ${answerStatus === 'correct' ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-700 hover:bg-indigo-800'}
                `}>
                {getButtonText()} <i className="fas fa-chevron-right ml-2"></i>
            </button>
        </div>
    </div>
  );
};