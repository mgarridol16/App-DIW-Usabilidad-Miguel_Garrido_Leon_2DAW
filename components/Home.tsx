
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
    <div className="d-flex flex-column gap-5">
      <div className="p-4 bg-white rounded-4 shadow-sm border">
        <h2 className="display-6 fw-bold text-primary-emphasis mb-2">Bienvenido de nuevo, {user.name.split(' ')[0]}</h2>
        <p className="fs-5 text-secondary">
          Seleccione un módulo para continuar su formación o revise su progreso.
        </p>
      </div>
      
      <div className="row g-4">
        {/* Dashboard Card */}
        <div className="col-lg-4">
           <button
            onClick={onNavigateToDashboard}
            className="w-100 text-start p-4 bg-primary text-white rounded-4 shadow-lg border-0 h-100 d-flex flex-column justify-content-between card-hover-effect"
          >
            <div>
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary-emphasis mb-4" style={{width: '64px', height: '64px'}}>
                <i className="fas fa-chart-line fs-2"></i>
              </div>
              <h3 className="h2 fw-bold mb-2">Mi Progreso</h3>
              <p className="opacity-75">Vea sus logros y próximas lecciones recomendadas.</p>
            </div>
            <div className="mt-4">
                <p className="fw-semibold">{user.progress.completedLessons.length} lecciones completadas</p>
            </div>
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="col-lg-8">
            <div className="row g-4">
                {lessons.map((lesson) => (
                <div key={lesson.id} className="col-md-6">
                    <button
                        onClick={() => onSelectLesson(lesson)}
                        className="w-100 text-start p-4 bg-white rounded-4 shadow-lg border-0 h-100 card-hover-effect"
                    >
                        <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary-emphasis mb-4" style={{width: '64px', height: '64px'}}>
                            <i className={`${lesson.icon} fs-2`}></i>
                        </div>
                        <h3 className="h4 fw-bold text-body-emphasis mb-2">{lesson.title}</h3>
                        <p className="text-secondary">{lesson.description}</p>
                    </button>
                </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// Simple CSS for hover effect, can be added to index.html style tag if needed.
const cardHoverStyle = `
  .card-hover-effect {
    transition: all 0.3s ease;
  }
  .card-hover-effect:hover {
    transform: translateY(-8px);
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = cardHoverStyle;
document.head.appendChild(styleSheet);