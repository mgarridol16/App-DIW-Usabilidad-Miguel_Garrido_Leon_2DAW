
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
      onStepComplete(lesson.id, lesson.steps.length);
      setIsCompleted(true);
    }
  };
  
  const handleTaskComplete = () => {
      setAnswerStatus('correct');
      speak("¡Muy bien! Tarea completada.");
  }
  
  const handleAdReward = useCallback(async () => {
    await onLifeRestored();
    setShowOutOfLivesModal(false);
  }, [onLifeRestored]);

  const renderInstructionalStep = (step: Step) => (
     <>
        <div className="d-flex justify-content-between align-items-start">
            <h3 className="h4 fw-semibold text-body-secondary flex-grow-1">{step.title}</h3>
            <button 
                onClick={() => speak(step.content || '')}
                className="btn btn-light rounded-circle d-flex align-items-center justify-content-center ms-3"
                style={{ width: '50px', height: '50px' }}
                aria-label="Leer instrucción en voz alta"
            >
                <i className="fas fa-volume-up fs-4 text-primary"></i>
            </button>
        </div>
        {step.video ? <video key={step.video} src={step.video} controls className="w-100 rounded-3 shadow-sm aspect-video bg-dark" /> : 
        (
            <div className="w-100 rounded-3 shadow-sm aspect-video bg-light border d-flex align-items-center justify-content-center p-4">
            {step.image === 'logo-app' ? (
                <div className="text-center text-muted">
                    <i className="fas fa-book-open display-1 text-primary-subtle"></i>
                    <p className="mt-2 fw-semibold">Portal de Capacitación</p>
                </div>
            ) : (
                <p className="text-muted fst-italic text-center">[{step.image?.replace('// Placeholder: ', '')}]</p>
            )}
            </div>
        )}
        <p className="fs-5 lh-base text-secondary">{step.content}</p>
     </>
  );
  
  const renderMultipleChoiceStep = (step: Step) => (
    <div className="d-flex flex-column gap-4">
        <h3 className="h4 fw-bold text-body-emphasis">{step.question}</h3>
        <div className="d-flex flex-column gap-3">
            {step.options?.map((option: QuizOption) => {
                const isSelected = selectedAnswer === option.id;
                let btnClass = 'btn-outline-secondary';
                if (answerStatus !== 'unanswered' && isSelected) {
                    btnClass = answerStatus === 'correct' ? 'btn-success' : 'btn-danger';
                } else if (isSelected) {
                    btnClass = 'btn-primary active';
                }
                
                return (
                    <button key={option.id} onClick={() => handleSelectAnswer(option.id)}
                        className={`btn ${btnClass} text-start p-3 fs-5 rounded-3 d-flex align-items-center gap-3`}
                        disabled={answerStatus !== 'unanswered' || isSubmitting}>
                        <div className={`border rounded-circle d-flex flex-shrink-0 ${isSelected ? 'bg-primary border-primary' : 'border-secondary'}`} style={{width: '24px', height: '24px'}}></div>
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
        <div className="text-center p-5 bg-white rounded-4 shadow-lg">
            <h2 className="h3 fw-bold text-danger">Error en la lección</h2>
            <p className="text-muted mt-2">Ha ocurrido un problema al cargar este paso. Por favor, vuelva al inicio.</p>
            <button onClick={onGoBack} className="btn btn-primary mt-4 px-4 py-2">Volver al Menú</button>
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
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border">
            <header className="mb-4 pb-4 border-bottom">
                 <div className="d-flex justify-content-between align-items-start">
                    <h2 className="h1 fw-bold text-primary-emphasis flex-grow-1 pe-4">{lesson.title}</h2>
                    <div className="d-flex align-items-center gap-2">
                        {Array.from({ length: MAX_LIVES }).map((_, i) => (
                            <i key={i} className={`fas fa-heart fs-2 ${i < lives ? 'text-danger' : 'text-light'}`}></i>
                        ))}
                    </div>
                 </div>
                <div className="progress mt-4" style={{height: '10px'}}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${(currentStepIndex / (lesson.steps.length - 1)) * 100}%` }} aria-valuenow={(currentStepIndex / (lesson.steps.length - 1)) * 100} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
            </header>
            
            <div className="d-flex flex-column gap-4" style={{minHeight: '350px'}}>
                {currentStep.type === 'instructional' && renderInstructionalStep(currentStep)}
                {currentStep.type === 'multipleChoice' && renderMultipleChoiceStep(currentStep)}
                {currentStep.type === 'simulatorTask' && <PracticeSimulator key={`${lesson.id}-${currentStepIndex}`} step={currentStep} onTaskComplete={handleTaskComplete}/>}
            </div>
        </div>
        
        <div className={`mt-2 rounded-bottom-3 transition-all duration-300
            ${answerStatus === 'correct' ? 'bg-success-subtle text-success-emphasis p-3' : ''}
            ${answerStatus === 'incorrect' ? 'bg-danger-subtle text-danger-emphasis p-3' : ''}
        `}>
            {answerStatus === 'correct' && <p className="fw-bold fs-5 mb-0">{currentStep.feedbackCorrect || '¡Buen trabajo!'}</p>}
            {answerStatus === 'incorrect' && <p className="fw-bold fs-5 mb-0">{currentStep.feedbackIncorrect || '¡Ups! Inténtalo de nuevo.'}</p>}
        </div>

        <div className="mt-4 pt-4 d-flex justify-content-between align-items-center gap-4">
             <button onClick={onGoBack} className="btn btn-link text-secondary fw-semibold">
                Salir
            </button>
            <button 
                onClick={() => {
                    if (currentStep.type === 'instructional' || answerStatus === 'correct') handleContinue();
                    else if (answerStatus === 'incorrect') { setSelectedAnswer(null); setAnswerStatus('unanswered'); }
                    else handleCheckAnswer();
                }}
                disabled={isSubmitting || (currentStep.type === 'multipleChoice' && !selectedAnswer) || (currentStep.type === 'simulatorTask' && answerStatus !== 'correct')}
                className={`btn btn-lg rounded-pill fw-bold
                ${answerStatus === 'correct' ? 'btn-success' : 'btn-primary'}
                `}
                style={{padding: '0.75rem 2rem'}}
                >
                {getButtonText()} <i className="fas fa-chevron-right ms-2 small"></i>
            </button>
        </div>
    </div>
  );
};