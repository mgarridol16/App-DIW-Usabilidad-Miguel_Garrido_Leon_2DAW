
import React from 'react';
import type { Lesson, User } from '../types';

interface HomeProps {
  lessons: Lesson[];
  user: User;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateToDashboard: () => void;
}

export const Home: React.FC<HomeProps> = ({ lessons, user, onSelectLesson, onNavigateToDashboard }) => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">Bienvenido de nuevo, {user.name.split(' ')[0]}</h2>
        <p className="text-lg text-slate-600">
          Seleccione un módulo para continuar su formación o revise su progreso.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dashboard Card */}
        <div className="lg:col-span-1">
           <button
            onClick={onNavigateToDashboard}
            className="group w-full text-left p-6 bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-indigo-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 active:scale-95 h-full flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white mb-4">
                <i className="fas fa-chart-line text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">Mi Progreso</h3>
              <p className="opacity-80">Vea sus logros y próximas lecciones recomendadas.</p>
            </div>
            <div className="mt-4">
                <p className="font-semibold">{user.progress.completedLessons.length} lecciones completadas</p>
            </div>
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
            <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className="group text-left p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-slate-200 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 active:scale-95"
            >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-4 transition-colors group-hover:bg-indigo-700 group-hover:text-white">
                <i className={`${lesson.icon} text-3xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{lesson.title}</h3>
                <p className="text-slate-600">{lesson.description}</p>
            </button>
            ))}
        </div>
      </div>
    </div>
  );
};
