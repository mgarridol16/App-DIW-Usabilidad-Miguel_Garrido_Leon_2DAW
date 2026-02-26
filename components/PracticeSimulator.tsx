import React, { useState, useEffect, useRef } from "react";
import type { Step } from "../types";
import { useSkin } from "../contexts/SkinContext";

interface PracticeSimulatorProps {
  step: Step;
  onTaskComplete: () => void;
}

export const PracticeSimulator: React.FC<PracticeSimulatorProps> = ({
  step,
  onTaskComplete,
}) => {
  const { currentSkin } = useSkin();
  const [simulatorState, setSimulatorState] = useState(
    step.simulatorConfig?.initialState || {},
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSimulatorState(step.simulatorConfig?.initialState || {});

    document
      .querySelectorAll(".sim-element.highlight-animation")
      .forEach((el) => el.classList.remove("highlight-animation"));

    const targetElement = document.querySelector(
      step.simulatorConfig?.highlightElement || "",
    );
    if (targetElement) {
      targetElement.classList.add("highlight-animation");
    }
  }, [step]);

  const speak = (text: string) => {
    if (currentSkin === "alternative") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleAction = (
    actionType: "click" | "input",
    elementId: string,
    value?: string,
  ) => {
    const { expectedAction, highlightElement } = step.simulatorConfig || {};
    if (highlightElement !== `#${elementId}`) return;

    if (actionType === "click" && expectedAction?.type === "click") {
      onTaskComplete();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    const { expectedAction, highlightElement } = step.simulatorConfig || {};

    setSimulatorState((prev) => ({ ...prev, [id]: value }));

    if (expectedAction?.type === "input" && highlightElement === `#${id}`) {
      if (value.toLowerCase() === expectedAction.value?.toLowerCase()) {
        onTaskComplete();
      }
    }
  };

  const renderPhoneShell = (content: React.ReactNode, darkBg = false) => (
    <div
      className={`w-100 mx-auto border-8 ${darkBg ? "border-black" : "border-dark"} rounded-4 p-2 d-flex flex-column`}
      style={{ maxWidth: "24rem", height: "550px", backgroundColor: "white" }}
    >
      {content}
    </div>
  );

  const renderWhatsApp = () =>
    renderPhoneShell(
      <>
        <header
          style={{ backgroundColor: "#075E54" }}
          className="text-white p-2 d-flex align-items-center gap-3 rounded-top-3"
        >
          <i className="fas fa-arrow-left"></i>
          <div
            className="rounded-circle bg-light d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
          >
            <svg viewBox="0 0 64 64" style={{ width: "24px", height: "24px" }}>
              <circle cx="32" cy="22" r="12" fill="#94a3b8" />
              <path d="M 12 56 Q 32 38 52 56" fill="#94a3b8" />
            </svg>
          </div>
          <p className="fw-semibold mb-0">
            {simulatorState.contactName || "Contactos"}
          </p>
        </header>

        {simulatorState.view === "attachment_menu" && (
          <div className="p-4 row g-4 bg-light rounded-bottom-3 flex-grow-1">
            <div
              id="attachment-gallery"
              className="sim-element col-4 d-flex flex-column align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleAction("click", "attachment-gallery")}
            >
              <div
                className="bg-purple text-white rounded-circle d-flex align-items-center justify-content-center fs-3"
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#9b59b6",
                }}
              >
                <i className="fas fa-images"></i>
              </div>
              <p>Galería</p>
            </div>
          </div>
        )}
        {simulatorState.view === "gallery_view" && (
          <div className="p-2 row g-2 bg-light rounded-bottom-3 flex-grow-1">
            <div
              id="gallery-photo-1"
              className="sim-element col-auto rounded-2 d-flex align-items-center justify-content-center overflow-hidden"
              style={{
                cursor: "pointer",
                width: "96px",
                height: "96px",
                background:
                  "linear-gradient(to bottom, #87ceeb 0%, #e0ffff 70%, #90ee90 70%, #7cb342 100%)",
              }}
              onClick={() => handleAction("click", "gallery-photo-1")}
            >
              <svg
                viewBox="0 0 200 200"
                style={{ width: "100%", height: "100%" }}
              >
                {/* Cielo */}
                <rect x="0" y="0" width="200" height="140" fill="url(#sky)" />
                <defs>
                  <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87ceeb" />
                    <stop offset="100%" stopColor="#b0e0e6" />
                  </linearGradient>
                </defs>

                {/* Sol */}
                <circle cx="160" cy="40" r="20" fill="#ffd700" />

                {/* Montañas */}
                <polygon points="0,140 60,60 120,140" fill="#8b7355" />
                <polygon points="80,140 140,80 200,140" fill="#a0826d" />

                {/* Pasto */}
                <rect x="0" y="140" width="200" height="60" fill="#7cb342" />

                {/* Flores */}
                <circle cx="40" cy="155" r="6" fill="#ff69b4" />
                <circle cx="150" cy="160" r="6" fill="#ffeb3b" />
              </svg>
            </div>
          </div>
        )}

        {(simulatorState.view === "chat" || !simulatorState.view) && (
          <>
            <main
              className="flex-grow-1 bg-cover p-3 d-flex flex-column gap-2"
              style={{
                backgroundImage:
                  "url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)",
              }}
            >
              {simulatorState.view === "chat" ? (
                <div className="d-flex flex-column gap-2">
                  <div
                    id="received-message"
                    className="sim-element bg-white p-2 rounded-3 align-self-start shadow-sm"
                    style={{ maxWidth: "80%", cursor: "pointer" }}
                    onClick={() => handleAction("click", "received-message")}
                  >
                    {simulatorState.receivedMessage}
                  </div>
                  {simulatorState.messageSent && (
                    <div
                      style={{ backgroundColor: "#DCF8C6", maxWidth: "80%" }}
                      className="p-2 rounded-3 align-self-end shadow-sm"
                    >
                      {simulatorState.message}
                    </div>
                  )}
                  {simulatorState.photoSent && (
                    <div
                      style={{ backgroundColor: "#DCF8C6" }}
                      className="p-1 rounded-3 align-self-end shadow-sm w-50"
                    >
                      <div className="rounded-2 overflow-hidden">
                        <svg
                          viewBox="0 0 300 200"
                          style={{ width: "100%", display: "block" }}
                        >
                          {/* Cielo */}
                          <rect
                            x="0"
                            y="0"
                            width="300"
                            height="140"
                            fill="url(#skySent)"
                          />
                          <defs>
                            <linearGradient
                              id="skySent"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#87ceeb" />
                              <stop offset="100%" stopColor="#b0e0e6" />
                            </linearGradient>
                          </defs>

                          {/* Sol */}
                          <circle cx="240" cy="50" r="30" fill="#ffd700" />

                          {/* Montañas */}
                          <polygon
                            points="0,140 90,60 180,140"
                            fill="#8b7355"
                          />
                          <polygon
                            points="120,140 210,90 300,140"
                            fill="#a0826d"
                          />

                          {/* Pasto */}
                          <rect
                            x="0"
                            y="140"
                            width="300"
                            height="60"
                            fill="#7cb342"
                          />

                          {/* Flores */}
                          <circle cx="60" cy="160" r="8" fill="#ff69b4" />
                          <circle cx="220" cy="165" r="8" fill="#ffeb3b" />

                          {/* Árbol */}
                          <rect
                            x="250"
                            y="120"
                            width="15"
                            height="40"
                            fill="#6b4423"
                          />
                          <circle cx="257" cy="115" r="25" fill="#4caf50" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  id="contact-ana-garcia"
                  className="sim-element bg-white p-2 rounded-3 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAction("click", "contact-ana-garcia")}
                >
                  <p className="fw-bold mb-0">Ana García</p>
                </div>
              )}
            </main>
            <footer className="p-2 d-flex align-items-center gap-2 bg-light">
              <button
                id="whatsapp-attachment-button"
                className="sim-element btn btn-secondary rounded-circle"
                onClick={() =>
                  handleAction("click", "whatsapp-attachment-button")
                }
              >
                <i className="fas fa-paperclip"></i>
              </button>
              <input
                id="whatsapp-input"
                type="text"
                value={simulatorState["whatsapp-input"] || ""}
                onChange={handleInputChange}
                placeholder="Mensaje"
                className="sim-element form-control rounded-pill"
              />
              <button
                id="whatsapp-send-button"
                style={{ backgroundColor: "#128C7E" }}
                className="sim-element btn text-white rounded-circle"
                onClick={() => handleAction("click", "whatsapp-send-button")}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </footer>
          </>
        )}
      </>,
    );

  const renderEmail = () => (
    <div className="w-100 h-100 bg-white border rounded-3 shadow-sm p-2 d-flex flex-column">
      {simulatorState.view === "file_explorer" && (
        <div className="p-2">
          <div
            id="file-informe-trimestral.pdf"
            className="sim-element d-flex align-items-center gap-2 p-2 rounded-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleAction("click", "file-informe-trimestral.pdf")}
          >
            <i className="fas fa-file-pdf text-danger"></i>
            <p className="mb-0">informe-trimestral.pdf</p>
          </div>
        </div>
      )}
      {simulatorState.view === "compose" || !simulatorState.view ? (
        simulatorState.view === "compose" ? (
          <div className="d-flex flex-column h-100">
            <header className="p-2 border-bottom fw-bold fs-5">
              Correo Nuevo
            </header>
            <div className="p-2 border-bottom">
              <input
                id="email-to-input"
                type="text"
                value={simulatorState["email-to-input"] || ""}
                onChange={handleInputChange}
                placeholder="Para"
                className="sim-element form-control border-0"
              />
            </div>
            <div className="p-2 border-bottom">
              <input
                id="email-subject-input"
                type="text"
                value={simulatorState["email-subject-input"] || ""}
                onChange={handleInputChange}
                placeholder="Asunto"
                className="sim-element form-control border-0"
              />
            </div>
            <div className="p-2 flex-grow-1">
              <textarea
                value={simulatorState.body || ""}
                className="w-100 h-100 border-0"
                style={{ resize: "none" }}
                placeholder="Escriba su mensaje aquí..."
              />
            </div>
            {simulatorState.attachment && (
              <div className="p-2 border-top small text-muted d-flex align-items-center gap-2">
                <i className="fas fa-paperclip"></i>
                {simulatorState.attachment}
              </div>
            )}
            <footer className="p-2 d-flex justify-content-between align-items-center">
              <button
                id="email-send-button"
                className="sim-element btn btn-primary"
                onClick={() => handleAction("click", "email-send-button")}
              >
                Enviar
              </button>
              <button
                id="email-attachment-button"
                className="sim-element btn btn-light fs-4"
                onClick={() => handleAction("click", "email-attachment-button")}
              >
                <i className="fas fa-paperclip"></i>
              </button>
            </footer>
          </div>
        ) : (
          <div className="p-2">
            <button
              id="email-compose-button"
              className="sim-element btn btn-light shadow-sm d-flex align-items-center gap-2"
              onClick={() => handleAction("click", "email-compose-button")}
            >
              <i className="fas fa-pencil-alt"></i> Redactar
            </button>
          </div>
        )
      ) : null}
    </div>
  );

  const renderWord = () => (
    <div
      className="w-100 bg-light border rounded-3 shadow-sm p-2 d-flex flex-column"
      style={{ height: "500px" }}
    >
      {simulatorState.view === "editor" ? (
        <div className="d-flex flex-column h-100 bg-white">
          <header className="p-2 border-bottom bg-light d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <button
                id="word-bold-button"
                className="sim-element btn btn-light border"
                onClick={() => handleAction("click", "word-bold-button")}
              >
                <i className="fas fa-bold"></i>
              </button>
              <button
                id="word-italic-button"
                className="sim-element btn btn-light border"
                onClick={() => handleAction("click", "word-italic-button")}
              >
                <i className="fas fa-italic"></i>
              </button>
            </div>
            <button
              id="word-save-button"
              className="sim-element btn btn-light border border-2 text-dark fs-4 shadow-sm"
              onClick={() => handleAction("click", "word-save-button")}
            >
              <svg
                viewBox="0 0 64 64"
                style={{ width: "24px", height: "24px", display: "block" }}
                aria-hidden="true"
              >
                <rect
                  x="8"
                  y="8"
                  width="48"
                  height="48"
                  rx="4"
                  fill="#111827"
                />
                <rect x="16" y="12" width="24" height="16" fill="#e5e7eb" />
                <rect x="42" y="12" width="6" height="12" fill="#9ca3af" />
                <rect
                  x="16"
                  y="34"
                  width="32"
                  height="18"
                  rx="2"
                  fill="#f9fafb"
                />
                <rect x="20" y="38" width="24" height="4" fill="#d1d5db" />
                <rect x="20" y="46" width="20" height="4" fill="#d1d5db" />
              </svg>
            </button>
          </header>
          <div className="p-4 flex-grow-1">
            <textarea
              id="word-text-area"
              ref={textAreaRef}
              value={simulatorState["word-text-area"] || ""}
              onChange={handleInputChange}
              className="sim-element form-control h-100 fs-5 border-0"
              style={{ resize: "none" }}
            />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div
            id="word-app-icon"
            className="sim-element d-flex flex-column align-items-center gap-1"
            style={{ cursor: "pointer", width: "100px" }}
            onClick={() => handleAction("click", "word-app-icon")}
          >
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px" }}
            >
              <svg
                viewBox="0 0 100 120"
                style={{ width: "100%", height: "100%" }}
              >
                {/* Documento */}
                <rect
                  x="20"
                  y="10"
                  width="60"
                  height="90"
                  rx="4"
                  fill="white"
                  stroke="#0d6efd"
                  strokeWidth="3"
                />

                {/* Esquina doblada */}
                <path
                  d="M 65 10 L 65 25 L 80 25 Z"
                  fill="#e7f1ff"
                  stroke="#0d6efd"
                  strokeWidth="3"
                />

                {/* Líneas de texto */}
                <line
                  x1="28"
                  y1="30"
                  x2="60"
                  y2="30"
                  stroke="#0d6efd"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <line
                  x1="28"
                  y1="40"
                  x2="60"
                  y2="40"
                  stroke="#0d6efd"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <line
                  x1="28"
                  y1="50"
                  x2="72"
                  y2="50"
                  stroke="#0d6efd"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <line
                  x1="28"
                  y1="60"
                  x2="72"
                  y2="60"
                  stroke="#dee2e6"
                  strokeWidth="2"
                />
                <line
                  x1="28"
                  y1="70"
                  x2="55"
                  y2="70"
                  stroke="#dee2e6"
                  strokeWidth="2"
                />

                {/* Letra W grande */}
                <text
                  x="50"
                  y="95"
                  fontSize="20"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#0d6efd"
                >
                  W
                </text>
              </svg>
            </div>
            <p className="small fw-semibold">Documento</p>
          </div>
          <button
            id="word-new-button"
            className="sim-element mt-4 btn btn-secondary"
            onClick={() => handleAction("click", "word-new-button")}
          >
            + Nuevo
          </button>
        </div>
      )}
    </div>
  );

  const renderCamera = () =>
    renderPhoneShell(
      simulatorState.view === "gallery_open" ? (
        <div className="flex-grow-1 bg-black rounded-bottom-3 d-flex flex-column">
          <header className="p-2 text-white">
            <button
              id="camera-back-button"
              className="sim-element btn btn-dark"
              onClick={() => handleAction("click", "camera-back-button")}
            >
              <i className="fas fa-arrow-left"></i> Volver
            </button>
          </header>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <svg
              viewBox="0 0 400 300"
              style={{ width: "100%", height: "100%" }}
            >
              {/* Cielo */}
              <defs>
                <linearGradient
                  id="cameraSkyd"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#87ceeb" />
                  <stop offset="100%" stopColor="#b0e0e6" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="0"
                width="400"
                height="210"
                fill="url(#cameraSkyd)"
              />

              {/* Sol */}
              <circle cx="320" cy="60" r="40" fill="#ffd700" />

              {/* Montañas */}
              <polygon points="0,210 120,80 240,210" fill="#8b7355" />
              <polygon points="160,210 280,120 400,210" fill="#a0826d" />

              {/* Pasto */}
              <rect x="0" y="210" width="400" height="90" fill="#7cb342" />

              {/* Flores */}
              <circle cx="80" cy="240" r="10" fill="#ff69b4" />
              <circle cx="300" cy="250" r="10" fill="#ffeb3b" />

              {/* Árbol */}
              <rect x="330" y="180" width="20" height="60" fill="#6b4423" />
              <circle cx="340" cy="170" r="35" fill="#4caf50" />
            </svg>
          </div>
        </div>
      ) : simulatorState.view === "camera_open" ||
        simulatorState.view === "video_mode" ? (
        <div
          className="bg-black flex-grow-1 d-flex flex-column justify-content-between align-items-center rounded-bottom-3 position-relative"
          style={{
            background:
              "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #87ceeb 100%)",
          }}
        >
          <div className="w-100 p-4 d-flex justify-content-end text-white fs-4">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="w-100 p-4 d-flex flex-column align-items-center gap-4">
            <div className="text-white bg-dark bg-opacity-50 px-2 py-1 rounded-pill small">
              1x
            </div>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div
                id="camera-gallery-preview"
                className={`sim-element rounded-2 border-2 border-white ${simulatorState.photoTaken ? "" : "bg-secondary"}`}
                style={{
                  width: "48px",
                  height: "48px",
                  cursor: "pointer",
                  background: simulatorState.photoTaken
                    ? "linear-gradient(to bottom, #87ceeb 0%, #e0ffff 70%, #7cb342 100%)"
                    : "#6c757d",
                }}
                onClick={() => handleAction("click", "camera-gallery-preview")}
              ></div>
              <button
                id={
                  simulatorState.view === "video_mode"
                    ? "camera-record-button"
                    : "camera-shutter-button"
                }
                className={`sim-element rounded-circle border-4 border-light ${simulatorState.view === "video_mode" ? "bg-danger" : "bg-white"}`}
                style={{ width: "64px", height: "64px" }}
                onClick={() =>
                  handleAction(
                    "click",
                    simulatorState.view === "video_mode"
                      ? "camera-record-button"
                      : "camera-shutter-button",
                  )
                }
              ></button>
              <button
                id="camera-flip-button"
                className="sim-element btn text-white fs-4"
                style={{ width: "48px", height: "48px" }}
                onClick={() => handleAction("click", "camera-flip-button")}
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
            <div className="d-flex gap-4 text-white fw-semibold">
              <p>FOTO</p>
              <p
                id="camera-video-mode"
                className="sim-element opacity-75"
                style={{ cursor: "pointer" }}
                onClick={() => handleAction("click", "camera-video-mode")}
              >
                VÍDEO
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4 p-4">
          <div
            id="camera-app-icon"
            className="sim-element col-3 d-flex flex-column align-items-center gap-1"
            style={{ cursor: "pointer" }}
            onClick={() => handleAction("click", "camera-app-icon")}
          >
            <div
              className="w-100 rounded-3 d-flex align-items-center justify-content-center aspect-ratio-1x1"
              style={{ aspectRatio: "1" }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{ width: "80%", height: "80%" }}
              >
                {/* Cuerpo de la cámara */}
                <rect
                  x="15"
                  y="30"
                  width="70"
                  height="50"
                  rx="8"
                  fill="#374151"
                />

                {/* Lente */}
                <circle cx="50" cy="55" r="20" fill="#1f2937" />
                <circle cx="50" cy="55" r="15" fill="#4b5563" />
                <circle cx="50" cy="55" r="10" fill="#6b7280" />

                {/* Flash */}
                <circle cx="75" cy="40" r="5" fill="#fef3c7" />

                {/* Visor superior */}
                <rect
                  x="35"
                  y="20"
                  width="30"
                  height="12"
                  rx="4"
                  fill="#4b5563"
                />
              </svg>
            </div>
            <p className="small fw-semibold">Cámara</p>
          </div>
        </div>
      ),
      true,
    );

  const renderVideoCall = () =>
    renderPhoneShell(
      <>
        {simulatorState.view === "in_call" && (
          <div
            className="flex-grow-1 text-white d-flex flex-column align-items-center justify-content-between p-4 rounded-bottom-3"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <p className="bg-dark bg-opacity-50 px-3 py-1 rounded-pill">
              Llamada con {simulatorState.contactName}
            </p>
            <div className="d-flex gap-3">
              <button
                id="videocall-mute-button"
                className={`sim-element btn rounded-circle d-flex align-items-center justify-content-center fs-4 ${simulatorState.muted ? "btn-light text-dark" : "btn-secondary"}`}
                style={{ width: "56px", height: "56px" }}
                onClick={() => handleAction("click", "videocall-mute-button")}
              >
                <i className="fas fa-microphone-slash"></i>
              </button>
              <button
                id="videocall-end-button"
                className="sim-element btn btn-danger rounded-circle d-flex align-items-center justify-content-center fs-4"
                style={{ width: "64px", height: "64px" }}
                onClick={() => handleAction("click", "videocall-end-button")}
              >
                <i className="fas fa-phone-slash"></i>
              </button>
              <button
                className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center fs-4"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="fas fa-video-slash"></i>
              </button>
            </div>
          </div>
        )}
        {simulatorState.view === "contact_details" && (
          <div className="p-4 text-center">
            <h2 className="h1 fw-bold mt-4">{simulatorState.contactName}</h2>
            <p className="text-muted">Móvil</p>
            <div className="mt-5 d-flex justify-content-center gap-4">
              <button
                className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center fs-3"
                style={{ width: "64px", height: "64px" }}
              >
                <i className="fas fa-phone"></i>
              </button>
              <button
                id="videocall-start-button"
                className="sim-element btn btn-success rounded-circle d-flex align-items-center justify-content-center fs-3"
                onClick={() => handleAction("click", "videocall-start-button")}
                style={{ width: "64px", height: "64px" }}
              >
                <i className="fas fa-video"></i>
              </button>
            </div>
          </div>
        )}
        {simulatorState.view === "contact_list" && (
          <div className="list-group list-group-flush">
            <div
              id="contact-juan-perez"
              className="sim-element list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => handleAction("click", "contact-juan-perez")}
            >
              <p className="fw-bold mb-0">Juan Pérez</p>
            </div>
            <div
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
            >
              <p className="fw-bold mb-0">María Gómez</p>
            </div>
          </div>
        )}
        {!simulatorState.view && (
          <div className="row g-4 p-4">
            <div
              id="videocall-app-icon"
              className="sim-element col-3 d-flex flex-column align-items-center gap-1"
              style={{ cursor: "pointer" }}
              onClick={() => handleAction("click", "videocall-app-icon")}
            >
              <div
                className="w-100 rounded-3 d-flex align-items-center justify-content-center aspect-ratio-1x1"
                style={{ aspectRatio: "1" }}
              >
                <svg
                  viewBox="0 0 100 100"
                  style={{ width: "80%", height: "80%" }}
                >
                  {/* Base del teléfono */}
                  <path
                    d="M 25 35 Q 20 30 25 25 L 35 15 Q 40 10 45 15 L 55 25 Q 60 30 55 35 L 50 40 Q 48 42 50 44 L 60 54 Q 62 56 64 54 L 70 48 Q 75 43 80 48 L 90 58 Q 95 63 90 68 L 80 78 Q 75 83 70 78 L 30 38 Q 25 35 25 35 Z"
                    fill="#198754"
                  />

                  {/* Icono de videocámara */}
                  <rect
                    x="50"
                    y="55"
                    width="30"
                    height="20"
                    rx="3"
                    fill="#ffffff"
                    opacity="0.9"
                  />
                  <polygon
                    points="80,60 80,70 90,67.5"
                    fill="#ffffff"
                    opacity="0.9"
                  />
                </svg>
              </div>
              <p className="small fw-semibold">Teléfono</p>
            </div>
          </div>
        )}
      </>,
    );

  return (
    <div className="row g-4 align-items-center">
      <div className="col-lg-6">
        {step.simulatorConfig?.app === "whatsapp" && renderWhatsApp()}
        {step.simulatorConfig?.app === "email" && renderEmail()}
        {step.simulatorConfig?.app === "camera" && renderCamera()}
        {step.simulatorConfig?.app === "videocall" && renderVideoCall()}
        {step.simulatorConfig?.app === "word" && renderWord()}
      </div>
      <div className="col-lg-6">
        <div className="p-4 bg-primary-subtle border-2 border-dashed border-primary-light rounded-3 text-center">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
            <i className="fas fa-robot fs-3 text-primary"></i>
            <h4 className="h5 fw-bold text-primary-emphasis mb-0">
              Guía del Asistente
            </h4>
          </div>
          <p className="fs-5 text-body-secondary">
            {step.simulatorConfig?.taskDescription}
          </p>
          {currentSkin !== "alternative" && (
            <button
              onClick={() => speak(step.simulatorConfig?.taskDescription || "")}
              className="btn btn-primary rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 mx-auto mt-4 simulator-tts-button"
            >
              <i className="fas fa-volume-up"></i>
              Leer Instruccion
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
