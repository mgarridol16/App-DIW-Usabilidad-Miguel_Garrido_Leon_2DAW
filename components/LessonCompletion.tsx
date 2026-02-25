
import React, { useEffect } from 'react';
import type { Lesson } from '../types';

interface LessonCompletionProps {
  lesson: Lesson;
  onGoBack: () => void;
}

export const LessonCompletion: React.FC<LessonCompletionProps> = ({ lesson, onGoBack }) => {
  useEffect(() => {
    const speak = (text: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
    speak(`¡Enhorabuena! Ha completado la lección: ${lesson.title}`);
  }, [lesson.title]);

  const Confetti: React.FC = () => {
    const confettiPieces = Array.from({ length: 100 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        transform: `scale(${Math.random() * 0.8 + 0.5})`
      };
      return <div key={i} className="confetti" style={style}></div>;
    });
    return <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden z-0">{confettiPieces}</div>;
  };

  return (
    <div className="position-relative text-center bg-white p-5 rounded-4 shadow-lg border animate-fade-in d-flex flex-column align-items-center justify-content-center" style={{minHeight: '500px'}}>
      <Confetti />
      <div className="position-relative z-1">
        <div className="mx-auto mb-4 bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center display-1" style={{width: '96px', height: '96px'}}>
          <i className="fas fa-check"></i>
        </div>
        <h1 className="display-5 fw-bold text-primary-emphasis">¡Lección Completada!</h1>
        <h2 className="h3 fw-semibold text-body-secondary mt-2">{lesson.title}</h2>
        <p className="fs-5 text-muted mt-4 mx-auto" style={{maxWidth: '500px'}}>
          Ha dominado con éxito los conceptos de esta lección. ¡Siga así para convertirse en un experto digital!
        </p>
        <button 
          onClick={onGoBack}
          className="btn btn-primary btn-lg rounded-pill fw-bold mt-5 px-5 py-3"
        >
          Volver al Menú Principal
        </button>
      </div>
    </div>
  );
};