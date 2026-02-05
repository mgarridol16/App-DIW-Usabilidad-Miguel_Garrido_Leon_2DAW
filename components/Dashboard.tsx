
import React from 'react';
import type { User, Lesson, Achievement } from '../types';

interface DashboardProps {
  user: User;
  lessons: Lesson[];
  achievements: Achievement[];
  onGoBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, lessons, achievements, onGoBack }) => {
  const completed = lessons.filter(l => user.progress.completedLessons.includes(l.id));
  const inProgress = Object.keys(user.progress.lessonsInProgress).map(id => {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return null;
    const progressPercent = Math.round((user.progress.lessonsInProgress[id].currentStep / lesson.steps.length) * 100);
    return { ...lesson, progress: progressPercent };
  }).filter(Boolean);

  const recommendations = lessons.filter(l => 
    !user.progress.completedLessons.includes(l.id) && !Object.keys(user.progress.lessonsInProgress).includes(l.id)
  );

  const unlockedAchievements = achievements.filter(ach => user.progress.achievements.includes(ach.id));

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
            <h1 className="text-4xl font-bold text-indigo-900">Mi Progreso</h1>
            <p className="text-lg text-slate-600">Aquí puede ver sus logros y próximos pasos.</p>
        </div>
        <button onClick={onGoBack} className="text-indigo-700 hover:underline font-semibold text-lg">
          &larr; Volver a los módulos
        </button>
      </header>
      
      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white rounded-xl shadow-md border">
          <p className="text-5xl font-bold text-green-600">{completed.length}</p>
          <p className="text-slate-600 font-semibold mt-2">Módulos Completados</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border">
          <p className="text-5xl font-bold text-amber-600">{inProgress.length}</p>
          <p className="text-slate-600 font-semibold mt-2">Módulos en Curso</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border">
          <p className="text-5xl font-bold text-yellow-500">{unlockedAchievements.length}</p>
          <p className="text-slate-600 font-semibold mt-2">Logros Desbloqueados</p>
        </div>
      </div>

      {/* Logros Desbloqueados */}
      {unlockedAchievements.length > 0 && (
        <div className="p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Logros Desbloqueados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {unlockedAchievements.map(ach => (
                    <div key={ach.id} className="text-center p-4 bg-slate-50 rounded-lg" title={`${ach.title}: ${ach.description}`}>
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-white mx-auto mb-2 text-3xl">
                           <i className={ach.icon}></i>
                        </div>
                        <p className="font-semibold text-slate-700 text-sm truncate">{ach.title}</p>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Módulos en Curso */}
      {inProgress.length > 0 && (
        <div className="p-6 bg-white rounded-xl shadow-md border">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Continuar Aprendiendo</h2>
          <div className="space-y-4">
            {inProgress.map(lesson => lesson && (
              <div key={lesson.id}>
                <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-slate-700">{lesson.title}</p>
                    <p className="font-bold text-indigo-700">{lesson.progress}%</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4">
                    <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Módulos Recomendados */}
      {recommendations.length > 0 && (
        <div className="p-6 bg-white rounded-xl shadow-md border">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Próximos Pasos Recomendados</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map(lesson => (
                    <div key={lesson.id} className="p-4 border rounded-lg flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex-shrink-0">
                            <i className={`${lesson.icon} text-2xl`}></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">{lesson.title}</h3>
                            <p className="text-sm text-slate-600">{lesson.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

    </div>
  );
};
