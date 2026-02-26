import React, { useState } from "react";

interface WebMapProps {
  onGoBack: () => void;
}

type MapViewType = "list" | "diagram";

export const WebMap: React.FC<WebMapProps> = ({ onGoBack }) => {
  const [viewType, setViewType] = useState<MapViewType>("list");

  return (
    <article className="bg-white rounded-4 shadow-sm border p-4 p-lg-5">
      {/* Encabezado con Selector de Vista */}
      <div className="mb-5">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <button
            onClick={onGoBack}
            className="btn btn-outline-secondary btn-sm"
            aria-label="Volver a la página anterior"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Volver
          </button>

          {/* Selector de Vista */}
          <div
            className="btn-group"
            role="group"
            aria-label="Selector de vista del mapa web"
          >
            <button
              type="button"
              className={`btn ${
                viewType === "list" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setViewType("list")}
            >
              <i className="fas fa-list me-2"></i>
              Vista de Lista
            </button>
            <button
              type="button"
              className={`btn ${
                viewType === "diagram" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setViewType("diagram")}
            >
              <i className="fas fa-diagram-project me-2"></i>
              Vista de Esquema
            </button>
          </div>
        </div>

        <h1 className="display-5 fw-bold text-primary-emphasis mb-3">
          Mapa Web - Portal de Capacitación Digital
        </h1>
        <p className="fs-5 text-secondary">
          {viewType === "list"
            ? "Estructura jerárquica de todas las secciones y vistas de la aplicación."
            : "Diagrama de navegación mostrando cómo se conectan las diferentes vistas."}
        </p>
      </div>

      {/* VISTA DE LISTA */}
      {viewType === "list" && <ListaView />}

      {/* VISTA DE ESQUEMA/DIAGRAMA */}
      {viewType === "diagram" && <DiagramView />}
    </article>
  );
};

// ========================================
// COMPONENTE: VISTA DE LISTA
// ========================================
const ListaView: React.FC = () => {
  return (
    <nav aria-label="Mapa web de la aplicación - Vista de lista">
      <section className="mb-5">
        {/* 1. PORTAL (RAÍZ) */}
        <div className="ps-0 mb-4">
          <h2 className="h3 fw-bold text-primary mb-4">
            <i className="fas fa-globe me-2"></i>
            Portal de Capacitación Digital
          </h2>

          <ul className="list-unstyled ps-0 ms-2 border-start border-3 border-primary ps-3">
            {/* 1.1 SISTEMA DE AUTENTICACIÓN */}
            <li className="mb-4">
              <div className="mb-3">
                <h3 className="h5 fw-bold text-dark d-flex align-items-center">
                  <i className="fas fa-lock text-warning me-2"></i>
                  Sistema de Autenticación
                </h3>
                <p className="text-muted small mb-3">
                  Acceso inicial a la aplicación antes de autenticarse
                </p>
              </div>
              <ul className="list-unstyled ps-3 ms-2 border-start border-2 border-warning">
                <li className="mb-2">
                  <span className="fw-semibold text-dark">Login</span>
                  <p className="text-muted small mb-0">
                    Formulario de acceso con email y contraseña
                  </p>
                </li>
                <li className="mb-2">
                  <span className="fw-semibold text-dark">Registro</span>
                  <p className="text-muted small mb-0">
                    Crear nueva cuenta de usuario
                  </p>
                </li>
                <li className="mb-2">
                  <span className="fw-semibold text-dark">
                    Recuperar Contraseña
                  </span>
                  <p className="text-muted small mb-0">
                    Restablecer acceso olvidado
                  </p>
                </li>
                <li>
                  <span className="fw-semibold text-dark">
                    Asistente de Autenticación
                  </span>
                  <p className="text-muted small mb-0">
                    Chat de soporte en pantalla de login
                  </p>
                </li>
              </ul>
            </li>

            {/* 1.2 ÁREA AUTENTICADA */}
            <li className="mb-4">
              <div className="mb-3">
                <h3 className="h5 fw-bold text-dark d-flex align-items-center">
                  <i className="fas fa-user-check text-success me-2"></i>
                  Área Autenticada
                </h3>
                <p className="text-muted small mb-3">
                  Todas las vistas disponibles para usuarios autenticados
                </p>
              </div>
              <ul className="list-unstyled ps-3 ms-2 border-start border-2 border-success">
                {/* 1.2.1 NAVEGACIÓN PRINCIPAL */}
                <li className="mb-4">
                  <div className="mb-2">
                    <span className="fw-bold text-dark d-flex align-items-center">
                      <i className="fas fa-home text-info me-2"></i>
                      Navegación Principal
                    </span>
                  </div>
                  <ul className="list-unstyled ps-3 ms-2 border-start border-2 border-info">
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">Home</span>
                      <p className="text-muted small mb-0">
                        Vista principal con bienvenida, acceso a módulos y
                        tarjeta de progreso rápido
                      </p>
                    </li>
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">Mi Progreso</span>
                      <p className="text-muted small mb-0">
                        Dashboard con estadísticas, módulos completados, en
                        curso y recomendaciones
                      </p>
                    </li>
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">Mapa Web</span>
                      <p className="text-muted small mb-0">
                        Esta página - Estructura jerárquica completa de la
                        aplicación
                      </p>
                    </li>
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">
                        Sobre Nosotros
                      </span>
                      <p className="text-muted small mb-0">
                        Currículum del alumno, contexto académico y experiencia
                        profesional
                      </p>
                    </li>
                  </ul>
                </li>

                {/* 1.2.2 LECCIONES Y MÓDULOS */}
                <li className="mb-4">
                  <div className="mb-2">
                    <span className="fw-bold text-dark d-flex align-items-center">
                      <i className="fas fa-book text-primary me-2"></i>
                      Módulos Educativos
                    </span>
                  </div>
                  <ul className="list-unstyled ps-3 ms-2 border-start border-2 border-primary">
                    <li className="mb-3">
                      <span className="fw-semibold text-dark">
                        Comunicación por WhatsApp
                      </span>
                      <p className="text-muted small mb-2">
                        Aprenda a usar WhatsApp: mensajes, fotos, notas de voz
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="fw-semibold text-dark">
                        Correo Electrónico
                      </span>
                      <p className="text-muted small mb-2">
                        Domina el envío y recepción de emails
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="fw-semibold text-dark">
                        Cámara y Fotografía
                      </span>
                      <p className="text-muted small mb-2">
                        Aprenda a capturar y compartir fotos
                      </p>
                    </li>
                    <li className="mb-3">
                      <span className="fw-semibold text-dark">
                        Videollamadas
                      </span>
                      <p className="text-muted small mb-2">
                        Realizar videollamadas efectivas
                      </p>
                    </li>
                    <li>
                      <span className="fw-semibold text-dark">
                        Microsoft Word
                      </span>
                      <p className="text-muted small mb-2">
                        Domina el procesamiento de textos
                      </p>
                    </li>
                  </ul>
                </li>

                {/* 1.2.3 VISTAS DE LECCIÓN */}
                <li className="mb-4">
                  <div className="mb-2">
                    <span className="fw-bold text-dark d-flex align-items-center">
                      <i className="fas fa-graduation-cap text-danger me-2"></i>
                      Experiencia de Lección
                    </span>
                  </div>
                  <ul className="list-unstyled ps-3 ms-2 border-start border-2 border-danger">
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">
                        Vista de Lección
                      </span>
                      <p className="text-muted small mb-0">
                        Interfaz interactiva con pasos, barra de progreso y
                        sistema de vidas
                      </p>
                    </li>
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">
                        Lección Completada
                      </span>
                      <p className="text-muted small mb-0">
                        Pantalla de celebración con confeti y feedback positivo
                      </p>
                    </li>
                  </ul>
                </li>

                {/* 1.2.4 LOGROS Y RECOMPENSAS */}
                <li className="mb-4">
                  <div className="mb-2">
                    <span className="fw-bold text-dark d-flex align-items-center">
                      <i className="fas fa-trophy text-warning me-2"></i>
                      Sistema de Logros
                    </span>
                  </div>
                  <ul className="list-unstyled ps-3 ms-2 border-start border-2 border-warning">
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">
                        Pantalla de Logros
                      </span>
                      <p className="text-muted small mb-0">
                        Mostrados en el Dashboard con iconos y descripciones
                      </p>
                    </li>
                    <li>
                      <span className="fw-semibold text-dark">
                        Anuncios Recompensados
                      </span>
                      <p className="text-muted small mb-0">
                        Ver video para restaurar vidas
                      </p>
                    </li>
                  </ul>
                </li>

                {/* 1.2.5 CARACTERÍSTICAS AUXILIARES */}
                <li>
                  <div className="mb-2">
                    <span className="fw-bold text-dark d-flex align-items-center">
                      <i className="fas fa-cogs text-secondary me-2"></i>
                      Características Auxiliares
                    </span>
                  </div>
                  <ul className="list-unstyled ps-3 ms-2 border-start border-2 border-secondary">
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">
                        Asistente IA
                      </span>
                      <p className="text-muted small mb-0">
                        Chat flotante para ayuda contextual
                      </p>
                    </li>
                    <li className="mb-2">
                      <span className="fw-semibold text-dark">
                        Sistema de Skins
                      </span>
                      <p className="text-muted small mb-0">
                        Selector de temas en Header
                      </p>
                    </li>
                    <li>
                      <span className="fw-semibold text-dark">
                        Cerrar Sesión
                      </span>
                      <p className="text-muted small mb-0">
                        Botón en Header para salir
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* LEYENDA Y ACCESIBILIDAD */}
      <section className="mt-5 pt-4 border-top">
        <h2 className="h5 fw-bold text-dark mb-3">
          <i className="fas fa-info-circle me-2 text-info"></i>
          Navegación y Accesibilidad
        </h2>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 border">
              <h3 className="h6 fw-bold text-dark mb-2">
                <i className="fas fa-lock-open text-warning me-2"></i>
                Sin Autenticación
              </h3>
              <p className="text-muted small mb-0">
                Solo acceso al Sistema de Autenticación
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 border">
              <h3 className="h6 fw-bold text-dark mb-2">
                <i className="fas fa-user-check text-success me-2"></i>
                Con Autenticación
              </h3>
              <p className="text-muted small mb-0">
                Acceso completo a todas las vistas
              </p>
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};

// ========================================
// COMPONENTE: VISTA DE DIAGRAMA/ESQUEMA (MEJORADA)
// ========================================
const DiagramView: React.FC = () => {
  return (
    <nav aria-label="Mapa web de la aplicación - Vista de diagrama">
      <section className="mb-5">
        {/* ENCABEZADO MEJORADO */}
        <div className="mb-5">
          <div
            className="alert d-flex align-items-center mb-4 border-start border-5 border-primary"
            style={{
              background: "#ffffff",
              color: "#212529",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <i
              className="fas fa-diagram-project me-3 text-primary"
              style={{ fontSize: "28px" }}
            ></i>
            <div>
              <strong style={{ fontSize: "18px", color: "#212529" }}>
                Flujo de Navegación Completo
              </strong>
              <p
                className="mb-0 mt-1 text-secondary"
                style={{ fontSize: "14px" }}
              >
                Estructura visual de cómo se conectan todas las vistas y módulos
                de la aplicación
              </p>
            </div>
          </div>
        </div>

        {/* CONTENEDOR DEL DIAGRAMA SVG */}
        <div
          className="overflow-auto rounded-3 border p-4"
          style={{
            minHeight: "820px",
            background: "#ffffff",
            border: "2px solid #e0e0e0",
          }}
        >
          <svg
            viewBox="0 0 1600 950"
            className="w-100"
            style={{ minWidth: "1200px" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* GRADIENTES PARA LAS CAJAS */}
              <linearGradient id="gradAuth" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#FFD700", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#FFC107", stopOpacity: 1 }}
                />
              </linearGradient>
              <linearGradient id="gradNav" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#00D4FF", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#0dcaf0", stopOpacity: 1 }}
                />
              </linearGradient>
              <linearGradient id="gradLesson" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#FF6B6B", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#dc3545", stopOpacity: 1 }}
                />
              </linearGradient>
              <linearGradient
                id="gradSuccess"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#51CF66", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#28a745", stopOpacity: 1 }}
                />
              </linearGradient>
              <linearGradient id="gradInfo" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#339AF0", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#0d6efd", stopOpacity: 1 }}
                />
              </linearGradient>
              <linearGradient id="gradAbout" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#A78BFA", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#8B5CF6", stopOpacity: 1 }}
                />
              </linearGradient>

              {/* SOMBRAS */}
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="8"
                  floodOpacity="0.25"
                />
              </filter>

              {/* ESTILOS CSS */}
              <style>
                {`
                  .diagram-box { stroke-width: 2.5; filter: url(#shadow); }
                  .diagram-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; fill: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
                  .diagram-text-small { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; text-anchor: middle; fill: white; font-weight: 600; }
                  .diagram-text-label { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; text-anchor: middle; fill: #555; font-weight: 600; }
                  .diagram-arrow { stroke: #444; stroke-width: 2.5; fill: none; marker-end: url(#arrowhead); }
                  .diagram-arrow-success { stroke: #28a745; stroke-width: 3; fill: none; marker-end: url(#arrowhead-success); }
                  .diagram-arrow-dashed { stroke: #aaa; stroke-width: 2; fill: none; stroke-dasharray: 7,5; marker-end: url(#arrowhead-dashed); opacity: 0.6; }
                `}
              </style>

              {/* MARCADORES DE FLECHA */}
              <marker
                id="arrowhead"
                markerWidth="13"
                markerHeight="13"
                refX="11"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 13 3, 0 6" fill="#444" />
              </marker>
              <marker
                id="arrowhead-success"
                markerWidth="13"
                markerHeight="13"
                refX="11"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 13 3, 0 6" fill="#28a745" />
              </marker>
              <marker
                id="arrowhead-dashed"
                markerWidth="13"
                markerHeight="13"
                refX="11"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 13 3, 0 6" fill="#aaa" />
              </marker>
            </defs>

            {/* ===== NIVEL 1: AUTENTICACIÓN ===== */}
            <g>
              <rect
                x="480"
                y="20"
                width="340"
                height="110"
                rx="14"
                className="diagram-box"
                fill="url(#gradAuth)"
                stroke="#D4AF37"
                strokeWidth="2.5"
              />
              <rect
                x="495"
                y="32"
                width="310"
                height="86"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="650" y="65">
                🔐 AUTENTICACIÓN
              </text>
              <text className="diagram-text-small" x="650" y="85">
                Login • Registro • Recuperar Contraseña
              </text>
              <text className="diagram-text-label" x="650" y="108">
                Sin autenticarse
              </text>
            </g>

            {/* FLECHA: AUTH -> HOME */}
            <path className="diagram-arrow" d="M 650 130 Q 650 155 650 190" />
            <text className="diagram-text-label" x="680" y="160">
              Acceso
            </text>

            {/* ===== NIVEL 2: HOME ===== */}
            <g>
              <rect
                x="480"
                y="190"
                width="340"
                height="110"
                rx="14"
                className="diagram-box"
                fill="url(#gradNav)"
                stroke="#0099CC"
                strokeWidth="2.5"
              />
              <rect
                x="495"
                y="202"
                width="310"
                height="86"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="650" y="225">
                🏠 HOME & NAVEGACIÓN
              </text>
              <text className="diagram-text-small" x="650" y="245">
                Centro de control • Punto de entrada
              </text>
              <text className="diagram-text-label" x="650" y="268">
                Hub principal
              </text>
            </g>

            {/* FLECHAS: HOME -> CUATRO OPCIONES */}
            <path className="diagram-arrow" d="M 480 245 Q 330 245 280 360" />
            <text className="diagram-text-label" x="370" y="240">
              Aprender
            </text>

            <path className="diagram-arrow" d="M 650 300 L 650 360" />
            <text className="diagram-text-label" x="680" y="335">
              Ver progreso
            </text>

            <path
              className="diagram-arrow-dashed"
              d="M 820 245 Q 970 245 1020 360"
              strokeWidth="2"
            />
            <text
              className="diagram-text-label"
              x="900"
              y="235"
              style={{ fill: "#666", fontSize: "11px" }}
            >
              [Alternativo]
            </text>
            <text className="diagram-text-label" x="900" y="250">
              Explorar
            </text>

            {/* ===== NIVEL 3: MÓDULOS ===== */}
            <g>
              <rect
                x="110"
                y="360"
                width="340"
                height="130"
                rx="14"
                className="diagram-box"
                fill="url(#gradLesson)"
                stroke="#BB0000"
                strokeWidth="2.5"
              />
              <rect
                x="125"
                y="372"
                width="310"
                height="106"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="280" y="395">
                📚 MÓDULOS
              </text>
              <text className="diagram-text-small" x="280" y="415">
                WhatsApp • Email
              </text>
              <text className="diagram-text-small" x="280" y="430">
                Cámara • Videollamadas
              </text>
              <text className="diagram-text-small" x="280" y="445">
                Microsoft Word
              </text>
              <text className="diagram-text-label" x="280" y="468">
                5 módulos completos
              </text>
            </g>

            {/* ===== NIVEL 3: DASHBOARD ===== */}
            <g>
              <rect
                x="480"
                y="360"
                width="340"
                height="130"
                rx="14"
                className="diagram-box"
                fill="url(#gradInfo)"
                stroke="#004199"
                strokeWidth="2.5"
              />
              <rect
                x="495"
                y="372"
                width="310"
                height="106"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="650" y="395">
                📊 MI PROGRESO
              </text>
              <text className="diagram-text-small" x="650" y="415">
                Estadísticas • Logros
              </text>
              <text className="diagram-text-small" x="650" y="430">
                Vidas • Recomendaciones
              </text>
              <text className="diagram-text-small" x="650" y="445">
                Ver historial
              </text>
              <text className="diagram-text-label" x="650" y="468">
                Panel de control
              </text>
            </g>

            {/* ===== NIVEL 3: MAPA WEB ===== */}
            <g>
              <rect
                x="850"
                y="360"
                width="340"
                height="130"
                rx="14"
                className="diagram-box"
                fill="url(#gradSuccess)"
                stroke="#1B7D00"
                strokeWidth="2.5"
              />
              <rect
                x="865"
                y="372"
                width="310"
                height="106"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="1020" y="395">
                🗺️ MAPA WEB
              </text>
              <text className="diagram-text-small" x="1020" y="415">
                Estructura visual
              </text>
              <text className="diagram-text-small" x="1020" y="430">
                Vista de Lista • Esquema
              </text>
              <text className="diagram-text-small" x="1020" y="445">
                Documentación interactiva
              </text>
              <text className="diagram-text-label" x="1020" y="468">
                Esta página
              </text>
            </g>

            {/* ===== NIVEL 3: ABOUT US ===== */}
            <g>
              <rect
                x="1220"
                y="360"
                width="340"
                height="130"
                rx="14"
                className="diagram-box"
                fill="url(#gradAbout)"
                stroke="#7C3AED"
                strokeWidth="2.5"
              />
              <rect
                x="1235"
                y="372"
                width="310"
                height="106"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="1390" y="395">
                👤 SOBRE NOSOTROS
              </text>
              <text className="diagram-text-small" x="1390" y="415">
                Currículum del alumno
              </text>
              <text className="diagram-text-small" x="1390" y="430">
                Contexto académico
              </text>
              <text className="diagram-text-small" x="1390" y="445">
                Experiencia profesional
              </text>
              <text className="diagram-text-label" x="1390" y="468">
                Práctica DIW • Europass
              </text>
            </g>

            {/* FLECHA: HOME -> SOBRE NOSOTROS */}
            <path
              className="diagram-arrow-dashed"
              d="M 820 245 Q 1100 245 1220 420"
              strokeWidth="2"
              stroke="#8B5CF6"
              markerEnd="url(#arrowhead-dashed)"
              opacity="0.7"
            />
            <text
              className="diagram-text-label"
              x="1040"
              y="235"
              style={{ fill: "#666", fontSize: "11px" }}
            >
              [Alternativo]
            </text>
            <text className="diagram-text-label" x="1060" y="250">
              Perfil
            </text>

            {/* FLECHA: MÓDULOS -> LECCIÓN */}
            <path className="diagram-arrow" d="M 280 490 L 280 550" />
            <text className="diagram-text-label" x="310" y="520">
              Seleccionar
            </text>

            {/* ===== NIVEL 4: VISTA DE LECCIÓN ===== */}
            <g>
              <rect
                x="110"
                y="550"
                width="340"
                height="130"
                rx="14"
                className="diagram-box"
                fill="url(#gradLesson)"
                stroke="#BB0000"
                strokeWidth="2.5"
              />
              <rect
                x="125"
                y="562"
                width="310"
                height="106"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="280" y="585">
                👨‍🎓 LECCIÓN ACTIVA
              </text>
              <text className="diagram-text-small" x="280" y="605">
                Pasos interactivos • Quiz
              </text>
              <text className="diagram-text-small" x="280" y="620">
                Simuladores • Sistema de Vidas
              </text>
              <text className="diagram-text-small" x="280" y="635">
                Retroalimentación interactiva
              </text>
              <text className="diagram-text-label" x="280" y="658">
                Modo aprendizaje
              </text>
            </g>

            {/* FLECHA: LECCIÓN -> COMPLETADA */}
            <path
              className="diagram-arrow-success"
              d="M 280 680 L 280 750"
              strokeDasharray="none"
            />
            <text
              className="diagram-text-label"
              x="315"
              y="720"
              style={{ fill: "#28a745", fontWeight: "bold", fontSize: "12px" }}
            >
              ✓ Completar
            </text>

            {/* ===== NIVEL 5: LECCIÓN COMPLETADA ===== */}
            <g>
              <rect
                x="110"
                y="750"
                width="340"
                height="110"
                rx="14"
                className="diagram-box"
                fill="url(#gradSuccess)"
                stroke="#1B7D00"
                strokeWidth="2.5"
              />
              <rect
                x="125"
                y="762"
                width="310"
                height="86"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="280" y="790">
                🎉 LECCIÓN COMPLETADA
              </text>
              <text className="diagram-text-small" x="280" y="810">
                Confeti • Puntos • Logro desbloqueado
              </text>
              <text className="diagram-text-label" x="280" y="833">
                Siguiente módulo
              </text>
            </g>

            {/* FLECHA: COMPLETADA -> HOME (regreso) */}
            <path
              className="diagram-arrow-dashed"
              d="M 80 800 Q 20 500 480 245"
            />
            <text
              className="diagram-text-label"
              x="200"
              y="530"
              style={{ fill: "#999" }}
            >
              Continuar
            </text>

            {/* ===== CARACTERÍSTICAS AUXILIARES - FILA INFERIOR ===== */}
            {/* ASISTENTE IA */}
            <g>
              <rect
                x="480"
                y="750"
                width="280"
                height="110"
                rx="14"
                className="diagram-box"
                fill="url(#gradInfo)"
                stroke="#004199"
                strokeWidth="2.5"
              />
              <rect
                x="495"
                y="762"
                width="250"
                height="86"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="620" y="790">
                🤖 ASISTENTE IA
              </text>
              <text className="diagram-text-small" x="620" y="810">
                Chat flotante • Ayuda contextual
              </text>
              <text className="diagram-text-label" x="620" y="833">
                Disponible en toda la app
              </text>
            </g>

            {/* SELECTOR DE SKINS */}
            <g>
              <rect
                x="800"
                y="750"
                width="280"
                height="110"
                rx="14"
                className="diagram-box"
                fill="url(#gradNav)"
                stroke="#0099CC"
                strokeWidth="2.5"
              />
              <rect
                x="815"
                y="762"
                width="250"
                height="86"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="940" y="790">
                🎨 PERSONALIZACIÓN
              </text>
              <text className="diagram-text-small" x="940" y="810">
                3 Temas • Base • Alt • Final
              </text>
              <text className="diagram-text-label" x="940" y="833">
                En Header
              </text>
            </g>

            {/* CERRAR SESIÓN */}
            <g>
              <rect
                x="1110"
                y="750"
                width="280"
                height="110"
                rx="14"
                className="diagram-box"
                fill="url(#gradAuth)"
                stroke="#D4AF37"
                strokeWidth="2.5"
              />
              <rect
                x="1125"
                y="762"
                width="250"
                height="86"
                rx="12"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
              />
              <text className="diagram-text" x="1250" y="790">
                🚪 CERRAR SESIÓN
              </text>
              <text className="diagram-text-small" x="1250" y="810">
                Logout • Volver a Login
              </text>
              <text className="diagram-text-label" x="1250" y="833">
                Salir seguro
              </text>
            </g>

            {/* LÍNEAS CONEXIÓN AUXILIARES (SUTILES) */}
            <path className="diagram-arrow-dashed" d="M 650 490 L 620 750" />
            <path className="diagram-arrow-dashed" d="M 650 360 L 940 750" />
            <path className="diagram-arrow-dashed" d="M 650 490 L 1250 750" />
          </svg>
        </div>

        {/* LEYENDA DETALLADA */}
        <div className="mt-5 pt-5 border-top">
          <h3 className="h4 fw-bold text-dark mb-4">
            <i className="fas fa-book me-2 text-primary"></i>
            Leyenda Detallada
          </h3>

          <div className="row g-3 mb-4">
            {/* TARJETA 1 */}
            <div className="col-lg-6">
              <div
                className="p-4 rounded-4 border-2 border-start-4"
                style={{
                  background:
                    "linear-gradient(135deg, #fff8e1 0%, #fff9e6 100%)",
                  borderLeftColor: "#FFD700",
                }}
              >
                <h4 className="h6 fw-bold d-flex align-items-center mb-3">
                  <span
                    className="badge bg-warning text-dark me-2"
                    style={{ fontSize: "12px" }}
                  >
                    1
                  </span>
                  <span>Acceso y Autenticación</span>
                </h4>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="fas fa-check-circle me-2 text-success"></i>
                    <strong>Login:</strong> Ingreso con email y contraseña
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle me-2 text-success"></i>
                    <strong>Registro:</strong> Crear nueva cuenta
                  </li>
                  <li>
                    <i className="fas fa-check-circle me-2 text-success"></i>
                    <strong>Recuperación:</strong> Restablecer acceso olvidado
                  </li>
                </ul>
              </div>
            </div>

            {/* TARJETA 2 */}
            <div className="col-lg-6">
              <div
                className="p-4 rounded-4 border-2 border-start-4"
                style={{
                  background:
                    "linear-gradient(135deg, #e3f2fd 0%, #f3f8ff 100%)",
                  borderLeftColor: "#0dcaf0",
                }}
              >
                <h4 className="h6 fw-bold d-flex align-items-center mb-3">
                  <span
                    className="badge bg-info text-white me-2"
                    style={{ fontSize: "12px" }}
                  >
                    2
                  </span>
                  <span>Centro de Control</span>
                </h4>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="fas fa-arrow-right me-2 text-info"></i>
                    <strong>Home:</strong> Punto de entrada principal
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-arrow-right me-2 text-info"></i>
                    <strong>Acceso:</strong> A todas las secciones
                  </li>
                  <li>
                    <i className="fas fa-arrow-right me-2 text-info"></i>
                    <strong>Navegación:</strong> Control centralizado
                  </li>
                </ul>
              </div>
            </div>

            {/* TARJETA 3 */}
            <div className="col-lg-6">
              <div
                className="p-4 rounded-4 border-2 border-start-4"
                style={{
                  background:
                    "linear-gradient(135deg, #ffebee 0%, #fff5f7 100%)",
                  borderLeftColor: "#dc3545",
                }}
              >
                <h4 className="h6 fw-bold d-flex align-items-center mb-3">
                  <span
                    className="badge bg-danger text-white me-2"
                    style={{ fontSize: "12px" }}
                  >
                    3
                  </span>
                  <span>Módulos Educativos</span>
                </h4>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="fas fa-star me-2 text-danger"></i>
                    <strong>5 Módulos:</strong> WhatsApp, Email, Cámara...
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-star me-2 text-danger"></i>
                    <strong>Progresivo:</strong> Dificultad creciente
                  </li>
                  <li>
                    <i className="fas fa-star me-2 text-danger"></i>
                    <strong>Certificación:</strong> Reconocimiento finalizado
                  </li>
                </ul>
              </div>
            </div>

            {/* TARJETA 4 */}
            <div className="col-lg-6">
              <div
                className="p-4 rounded-4 border-2 border-start-4"
                style={{
                  background:
                    "linear-gradient(135deg, #e8f5e9 0%, #f1f8f6 100%)",
                  borderLeftColor: "#28a745",
                }}
              >
                <h4 className="h6 fw-bold d-flex align-items-center mb-3">
                  <span
                    className="badge bg-success text-white me-2"
                    style={{ fontSize: "12px" }}
                  >
                    4
                  </span>
                  <span>Panel de Progreso</span>
                </h4>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="fas fa-chart-line me-2 text-success"></i>
                    <strong>Estadísticas:</strong> Seguimiento detallado
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-chart-line me-2 text-success"></i>
                    <strong>Logros:</strong> Sistema de recompensas
                  </li>
                  <li>
                    <i className="fas fa-chart-line me-2 text-success"></i>
                    <strong>Inteligentes:</strong> Recomendaciones
                    personalizadas
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* TIPO DE FLUJOS */}
          <div
            className="alert border-0 p-4 rounded-3"
            style={{
              background: "linear-gradient(135deg, #f5f7fa 0%, #f9fafb 100%)",
            }}
          >
            <h5 className="fw-bold text-dark mb-4">
              <i className="fas fa-directions me-2 text-primary"></i>
              Tipos de Flujo
            </h5>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <svg width="50" height="4" className="me-3">
                    <line
                      x1="0"
                      y1="2"
                      x2="50"
                      y2="2"
                      stroke="#444"
                      strokeWidth="2.5"
                    />
                    <polygon points="50,2 45,0 45,4" fill="#444" />
                  </svg>
                  <div>
                    <strong className="text-dark d-block">Normal</strong>
                    <small className="text-muted">Flujo principal</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <svg width="50" height="4" className="me-3">
                    <line
                      x1="0"
                      y1="2"
                      x2="50"
                      y2="2"
                      stroke="#aaa"
                      strokeWidth="2"
                      strokeDasharray="7,5"
                    />
                  </svg>
                  <div>
                    <strong className="text-muted d-block">Condicional</strong>
                    <small className="text-muted">Flujo alternativo</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <svg width="50" height="4" className="me-3">
                    <line
                      x1="0"
                      y1="2"
                      x2="50"
                      y2="2"
                      stroke="#28a745"
                      strokeWidth="3"
                    />
                    <polygon points="50,2 45,0 45,4" fill="#28a745" />
                  </svg>
                  <div>
                    <strong className="text-success d-block">Éxito</strong>
                    <small className="text-success">Completado</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};
