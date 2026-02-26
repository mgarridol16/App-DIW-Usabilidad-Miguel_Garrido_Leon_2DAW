import React from "react";
import type { User, Lesson, Achievement } from "../types";

interface DashboardProps {
  user: User;
  lessons: Lesson[];
  achievements: Achievement[];
  onGoBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  lessons,
  achievements,
  onGoBack,
}) => {
  const completed = lessons.filter((l) =>
    user.progress.completedLessons.includes(l.id),
  );
  const inProgress = Object.keys(user.progress.lessonsInProgress)
    .map((id) => {
      const lesson = lessons.find((l) => l.id === id);
      if (!lesson) return null;
      const progressPercent = Math.round(
        (user.progress.lessonsInProgress[id].currentStep /
          lesson.steps.length) *
          100,
      );
      return { ...lesson, progress: progressPercent };
    })
    .filter(Boolean);

  const recommendations = lessons.filter(
    (l) =>
      !user.progress.completedLessons.includes(l.id) &&
      !Object.keys(user.progress.lessonsInProgress).includes(l.id),
  );

  const unlockedAchievements = achievements.filter((ach) =>
    user.progress.achievements.includes(ach.id),
  );

  return (
    <div className="d-flex flex-column gap-4 animate-fade-in">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 bg-primary text-white p-4 rounded-4 shadow-sm">
        <div>
          <h1 className="display-5 fw-bold text-white">Mi Progreso</h1>
          <p className="fs-5 text-white">
            Aquí puede ver sus logros y próximos pasos.
          </p>
        </div>
        <button onClick={onGoBack} className="btn btn-light fw-semibold">
          <i className="fas fa-arrow-left me-2"></i>
          Volver a los módulos
        </button>
      </div>

      {/* Resumen General */}
      <div className="row g-4 text-center">
        <div className="col-md-4">
          <div className="p-4 bg-white rounded-4 shadow-sm border h-100">
            <p className="display-4 fw-bold text-success">{completed.length}</p>
            <p className="text-muted fw-semibold mt-2 mb-0">
              Módulos Completados
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-white rounded-4 shadow-sm border h-100">
            <p className="display-4 fw-bold text-warning-emphasis">
              {inProgress.length}
            </p>
            <p className="text-muted fw-semibold mt-2 mb-0">Módulos en Curso</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-white rounded-4 shadow-sm border h-100">
            <p className="display-4 fw-bold text-warning">
              {unlockedAchievements.length}
            </p>
            <p className="text-muted fw-semibold mt-2 mb-0">
              Logros Desbloqueados
            </p>
          </div>
        </div>
      </div>

      {/* Logros Desbloqueados */}
      {unlockedAchievements.length > 0 && (
        <div className="p-4 bg-white rounded-4 shadow-sm border">
          <h2 className="h4 fw-bold text-primary-emphasis mb-4">
            Logros Desbloqueados
          </h2>
          <div className="row g-3">
            {unlockedAchievements.map((ach) => (
              <div key={ach.id} className="col-6 col-md-4 col-lg-2">
                <div
                  className="text-center p-3 bg-light rounded-3"
                  title={`${ach.title}: ${ach.description}`}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-warning text-white mx-auto mb-2 fs-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <i className={ach.icon}></i>
                  </div>
                  <p className="fw-semibold text-body-secondary small text-truncate">
                    {ach.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Módulos en Curso */}
      {inProgress.length > 0 && (
        <div className="p-4 bg-white rounded-4 shadow-sm border">
          <h2 className="h4 fw-bold text-primary-emphasis mb-4">
            Continuar Aprendiendo
          </h2>
          <div className="d-flex flex-column gap-3">
            {inProgress.map(
              (lesson) =>
                lesson && (
                  <div key={lesson.id}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <p className="fw-semibold text-body-secondary mb-0">
                        {lesson.title}
                      </p>
                      <p className="fw-bold text-primary mb-0">
                        {lesson.progress}%
                      </p>
                    </div>
                    <div className="progress" style={{ height: "1rem" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${lesson.progress}%` }}
                        aria-valuenow={lesson.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Módulos Recomendados */}
      {recommendations.length > 0 && (
        <div className="p-4 bg-white rounded-4 shadow-sm border">
          <h2 className="h4 fw-bold text-primary-emphasis mb-4">
            Próximos Pasos Recomendados
          </h2>
          <div className="row g-3">
            {recommendations.map((lesson) => (
              <div key={lesson.id} className="col-md-6">
                <div className="p-3 border rounded-3 d-flex align-items-center gap-3 h-100">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary flex-shrink-0"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <i className={`${lesson.icon} fs-5`}></i>
                  </div>
                  <div>
                    <h3 className="fw-bold h6 text-body-emphasis mb-1">
                      {lesson.title}
                    </h3>
                    <p className="small text-muted mb-0">
                      {lesson.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
