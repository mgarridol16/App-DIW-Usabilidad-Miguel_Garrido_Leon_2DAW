import React, { useState } from "react";
import { videoCategories } from "../data/videos";
import type { VideoData } from "../data/videos";

interface ProjectVideosProps {
  onGoBack: () => void;
}

export const ProjectVideos: React.FC<ProjectVideosProps> = ({ onGoBack }) => {
  const [openCategory, setOpenCategory] = useState<number | null>(0); // Primera categoría abierta por defecto

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <main className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      {/* BACK BUTTON */}
      <div className="mb-4">
        <button
          onClick={onGoBack}
          className="btn btn-outline-secondary btn-sm"
          aria-label="Volver a la página anterior"
        >
          <i className="fas fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>

      {/* HEADER */}
      <header className="mb-5 pb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <h1 className="display-5 fw-bold text-primary-emphasis mb-3">
              <i className="fas fa-video me-3"></i>
              Vídeos del Proyecto
            </h1>
            <p className="fs-5 text-secondary mb-3">
              Documentación audiovisual del proyecto académico
            </p>
            <div className="alert alert-info d-flex align-items-start gap-2">
              <i className="fas fa-info-circle mt-1"></i>
              <div>
                <strong>Proyecto académico:</strong> Práctica de Usabilidad -
                Diseño de Interfaces Web
                <br />
                <strong>Total de vídeos:</strong> 31 (1 demo + 10 responsive +
                10 usabilidad + 10 accesibilidad)
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* INTRODUCTION */}
      <section className="mb-5">
        <p className="lead">
          Esta página recopila las evidencias audiovisuales del desarrollo del
          Portal de Capacitación Digital, organizadas en 4 categorías
          principales que documentan los aspectos clave del proyecto.
        </p>
      </section>

      {/* VIDEO CATEGORIES ACCORDION */}
      <section>
        <div className="accordion" id="videosAccordion">
          {videoCategories.map((category, categoryIndex) => {
            const isOpen = openCategory === categoryIndex;
            const accordionId = `category-${categoryIndex}`;

            return (
              <div
                key={categoryIndex}
                className="accordion-item mb-3 border rounded-3 shadow-sm"
              >
                {/* ACCORDION HEADER */}
                <h2 className="accordion-header" id={`heading-${accordionId}`}>
                  <button
                    className={`accordion-button ${isOpen ? "" : "collapsed"} fs-4 fw-semibold`}
                    type="button"
                    onClick={() => toggleCategory(categoryIndex)}
                    aria-expanded={isOpen}
                    aria-controls={`collapse-${accordionId}`}
                    style={{
                      backgroundColor: isOpen ? "#e7f3ff" : "#f8f9fa",
                      borderRadius: isOpen ? "0.5rem 0.5rem 0 0" : "0.5rem",
                    }}
                  >
                    <span className="me-3" style={{ fontSize: "1.5rem" }}>
                      {category.icon.includes("play-circle") && "🎬"}
                      {category.icon.includes("mobile") && "📱"}
                      {category.icon.includes("users") && "🧠"}
                      {category.icon.includes("universal-access") && "♿"}
                    </span>
                    <div className="flex-grow-1">
                      <div>{category.title}</div>
                      <small className="text-muted d-block fw-normal">
                        {category.videos.length} vídeo
                        {category.videos.length > 1 ? "s" : ""}
                      </small>
                    </div>
                  </button>
                </h2>

                {/* ACCORDION BODY */}
                <div
                  id={`collapse-${accordionId}`}
                  className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                  aria-labelledby={`heading-${accordionId}`}
                  data-bs-parent="#videosAccordion"
                >
                  <div className="accordion-body p-4">
                    {/* CATEGORY DESCRIPTION */}
                    <div className="alert alert-light border mb-4">
                      <p className="mb-0">{category.description}</p>
                    </div>

                    {/* VIDEOS LIST */}
                    <div className="row row-cols-1 g-4">
                      {category.videos.map((video) => (
                        <div key={video.id} className="col">
                          <VideoCard video={video} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER INFO */}
      <footer className="mt-5 pt-4 border-top">
        <div className="alert alert-warning d-flex align-items-start gap-2">
          <i className="fas fa-exclamation-triangle mt-1"></i>
          <div>
            <strong>Nota:</strong> Los archivos de vídeo deben colocarse en la
            carpeta <code>public/videos/</code> siguiendo la estructura y
            nomenclatura especificada en el README. Los vídeos se cargarán
            automáticamente cuando los archivos estén presentes.
          </div>
        </div>
      </footer>
    </main>
  );
};

// Componente para cada tarjeta de vídeo
const VideoCard: React.FC<{ video: VideoData }> = ({ video }) => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        {/* VIDEO HEADER */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 className="h5 fw-bold text-primary mb-0">{video.title}</h3>
          {video.duration && (
            <span className="badge bg-secondary ms-2 flex-shrink-0">
              <i className="fas fa-clock me-1"></i>
              {video.duration}
            </span>
          )}
        </div>

        {/* VIDEO DESCRIPTION */}
        <p className="text-secondary mb-3">{video.description}</p>

        {/* VIDEO PLAYER */}
        <div className="ratio ratio-16x9 bg-dark rounded-3 overflow-hidden position-relative">
          {!videoError ? (
            <>
              {isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle text-white">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando vídeo...</span>
                  </div>
                  <p className="mt-2 small">Esperando archivo de vídeo...</p>
                </div>
              )}
              <video
                controls
                preload="metadata"
                className={`w-100 h-100 ${isLoading ? "d-none" : ""}`}
                onLoadedMetadata={() => setIsLoading(false)}
                onError={() => {
                  setVideoError(true);
                  setIsLoading(false);
                }}
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
                Tu navegador no soporta la reproducción de vídeos HTML5.
              </video>
            </>
          ) : (
            <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-75">
              <i className="fas fa-video-slash fa-3x mb-3 opacity-50"></i>
              <p className="mb-2">
                <strong>Vídeo pendiente de subir</strong>
              </p>
              <p className="small mb-0 opacity-75">
                Archivo esperado:{" "}
                <code className="text-warning">{video.src}</code>
              </p>
            </div>
          )}
        </div>

        {/* VIDEO FOOTER */}
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <i className="fas fa-film me-1"></i>
            Vídeo #{video.id + 1}
          </small>
          {!videoError && !isLoading && (
            <small className="text-success">
              <i className="fas fa-check-circle me-1"></i>
              Vídeo disponible
            </small>
          )}
        </div>
      </div>
    </div>
  );
};
