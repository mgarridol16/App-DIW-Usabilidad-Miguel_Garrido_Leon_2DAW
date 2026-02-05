
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
    return <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">{confettiPieces}</div>;
  };

  return (
    <div className="relative text-center bg-white p-8 rounded-xl shadow-lg border border-slate-200 animate-fade-in flex flex-col items-center justify-center min-h-[500px]">
      <Confetti />
      <div className="relative z-10">
        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl">
          <i className="fas fa-check"></i>
        </div>
        <h1 className="text-4xl font-bold text-indigo-900">¡Lección Completada!</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mt-2">{lesson.title}</h2>
        <p className="text-lg text-slate-600 mt-4 max-w-md mx-auto">
          Ha dominado con éxito los conceptos de esta lección. ¡Siga así para convertirse en un experto digital!
        </p>
        <button 
          onClick={onGoBack}
          className="mt-8 px-8 py-4 text-lg font-bold text-white bg-indigo-700 rounded-full transition-all duration-150 hover:bg-indigo-800 active:scale-95"
        >
          Volver al Menú Principal
        </button>
      </div>
    </div>
  );
};
