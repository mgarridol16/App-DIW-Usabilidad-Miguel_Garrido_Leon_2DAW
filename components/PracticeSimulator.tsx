
import React, { useState, useEffect, useRef } from 'react';
import type { Step } from '../types';

interface PracticeSimulatorProps {
  step: Step;
  onTaskComplete: () => void;
}

export const PracticeSimulator: React.FC<PracticeSimulatorProps> = ({ step, onTaskComplete }) => {
  const [simulatorState, setSimulatorState] = useState(step.simulatorConfig?.initialState || {});
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSimulatorState(step.simulatorConfig?.initialState || {});
    
    document.querySelectorAll('.sim-element.highlight-animation').forEach(el => el.classList.remove('highlight-animation'));
    
    const targetElement = document.querySelector(step.simulatorConfig?.highlightElement || '');
    if (targetElement) {
        targetElement.classList.add('highlight-animation');
    }
  }, [step]);
  
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };
  
  const handleAction = (actionType: 'click' | 'input', elementId: string, value?: string) => {
    const { expectedAction, highlightElement } = step.simulatorConfig || {};
    if (highlightElement !== `#${elementId}`) return;

    if (actionType === 'click' && expectedAction?.type === 'click') {
        onTaskComplete();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const { expectedAction, highlightElement } = step.simulatorConfig || {};
    
    setSimulatorState(prev => ({ ...prev, [id]: value }));

    if (expectedAction?.type === 'input' && highlightElement === `#${id}`) {
      if (value.toLowerCase() === expectedAction.value?.toLowerCase()) {
        onTaskComplete();
      }
    }
  };

  const renderPhoneShell = (content: React.ReactNode, darkBg = false) => (
     <div className={`w-100 mx-auto border-8 ${darkBg ? 'border-black' : 'border-dark'} rounded-4 p-2 d-flex flex-column`} style={{maxWidth: '24rem', height: '550px', backgroundColor: 'white'}}>
        {content}
    </div>
  );

  const renderWhatsApp = () => renderPhoneShell(
    <>
      <header style={{backgroundColor: '#075E54'}} className="text-white p-2 d-flex align-items-center gap-3 rounded-top-3">
        <i className="fas fa-arrow-left"></i><div className="rounded-circle bg-light" style={{width: '32px', height: '32px'}}></div>
        <p className="fw-semibold mb-0">{simulatorState.contactName || 'Contactos'}</p>
      </header>

      {simulatorState.view === 'attachment_menu' && <div className="p-4 row g-4 bg-light rounded-bottom-3 flex-grow-1"><div id="attachment-gallery" className="sim-element col-4 d-flex flex-column align-items-center gap-2" style={{cursor: 'pointer'}} onClick={() => handleAction('click', 'attachment-gallery')}><div className="bg-purple text-white rounded-circle d-flex align-items-center justify-content-center fs-3" style={{width: '64px', height: '64px', backgroundColor: '#9b59b6'}}><i className="fas fa-images"></i></div><p>Galería</p></div></div>}
      {simulatorState.view === 'gallery_view' && <div className="p-2 row g-2 bg-light rounded-bottom-3 flex-grow-1"><div id="gallery-photo-1" className="sim-element col-4 aspect-square bg-cover bg-center rounded-2" style={{backgroundImage: 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)', cursor: 'pointer'}} onClick={() => handleAction('click', 'gallery-photo-1')}></div></div>}

      {(simulatorState.view === 'chat' || !simulatorState.view) && (
        <>
            <main className="flex-grow-1 bg-cover p-3 d-flex flex-column gap-2" style={{backgroundImage: 'url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)'}}>
                {simulatorState.view === 'chat' ? (
                <div className="d-flex flex-column gap-2">
                    <div id="received-message" className="sim-element bg-white p-2 rounded-3 align-self-start shadow-sm" style={{maxWidth: '80%', cursor: 'pointer'}} onClick={() => handleAction('click', 'received-message')}>{simulatorState.receivedMessage}</div>
                    {simulatorState.messageSent && <div style={{backgroundColor: '#DCF8C6', maxWidth: '80%'}} className="p-2 rounded-3 align-self-end shadow-sm">{simulatorState.message}</div>}
                    {simulatorState.photoSent && <div style={{backgroundColor: '#DCF8C6'}} className="p-1 rounded-3 align-self-end shadow-sm w-50"><img src="https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg" className="rounded-2" alt="paisaje"/></div>}
                </div>
                ) : ( <div id="contact-ana-garcia" className="sim-element bg-white p-2 rounded-3 shadow-sm" style={{cursor: 'pointer'}} onClick={() => handleAction('click', 'contact-ana-garcia')}><p className="fw-bold mb-0">Ana García</p></div> )}
            </main>
            <footer className="p-2 d-flex align-items-center gap-2 bg-light">
                <button id="whatsapp-attachment-button" className="sim-element btn btn-secondary rounded-circle" onClick={() => handleAction('click', 'whatsapp-attachment-button')}><i className="fas fa-paperclip"></i></button>
                <input id="whatsapp-input" type="text" value={simulatorState['whatsapp-input'] || ''} onChange={handleInputChange} placeholder="Mensaje" className="sim-element form-control rounded-pill" />
                <button id="whatsapp-send-button" style={{backgroundColor: '#128C7E'}} className="sim-element btn text-white rounded-circle" onClick={() => handleAction('click', 'whatsapp-send-button')}><i className="fas fa-paper-plane"></i></button>
            </footer>
        </>
      )}
    </>
  );

  const renderEmail = () => (
     <div className="w-100 h-100 bg-white border rounded-3 shadow-sm p-2 d-flex flex-column">
        { simulatorState.view === 'file_explorer' && <div className="p-2"><div id="file-informe-trimestral.pdf" className="sim-element d-flex align-items-center gap-2 p-2 rounded-2" style={{cursor: 'pointer'}} onClick={() => handleAction('click', 'file-informe-trimestral.pdf')}><i className="fas fa-file-pdf text-danger"></i><p className="mb-0">informe-trimestral.pdf</p></div></div> }
        { simulatorState.view === 'compose' || !simulatorState.view ? (
             simulatorState.view === 'compose' ? (
                <div className="d-flex flex-column h-100">
                    <header className="p-2 border-bottom fw-bold fs-5">Correo Nuevo</header>
                    <div className="p-2 border-bottom"><input id="email-to-input" type="text" value={simulatorState['email-to-input'] || ''} onChange={handleInputChange} placeholder="Para" className="sim-element form-control border-0" /></div>
                    <div className="p-2 border-bottom"><input id="email-subject-input" type="text" value={simulatorState['email-subject-input'] || ''} onChange={handleInputChange} placeholder="Asunto" className="sim-element form-control border-0" /></div>
                    <div className="p-2 flex-grow-1"><textarea value={simulatorState.body || ''} className="w-100 h-100 border-0" style={{resize: 'none'}} placeholder="Escriba su mensaje aquí..."/></div>
                    {simulatorState.attachment && <div className="p-2 border-top small text-muted d-flex align-items-center gap-2"><i className="fas fa-paperclip"></i>{simulatorState.attachment}</div>}
                    <footer className="p-2 d-flex justify-content-between align-items-center"><button id="email-send-button" className="sim-element btn btn-primary" onClick={() => handleAction('click', 'email-send-button')}>Enviar</button><button id="email-attachment-button" className="sim-element btn btn-light fs-4" onClick={() => handleAction('click', 'email-attachment-button')}><i className="fas fa-paperclip"></i></button></footer>
                </div>
            ) : ( <div className="p-2"><button id="email-compose-button" className="sim-element btn btn-light shadow-sm d-flex align-items-center gap-2" onClick={() => handleAction('click', 'email-compose-button')}><i className="fas fa-pencil-alt"></i> Redactar</button></div> )
        ) : null}
     </div>
  );
  
  const renderWord = () => (
    <div className="w-100 bg-light border rounded-3 shadow-sm p-2 d-flex flex-column" style={{height: '500px'}}>
      {simulatorState.view === 'editor' ? (
        <div className="d-flex flex-column h-100 bg-white">
          <header className="p-2 border-bottom bg-light d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <button id="word-bold-button" className="sim-element btn btn-outline-secondary" onClick={() => handleAction('click', 'word-bold-button')}><i className="fas fa-bold"></i></button>
              <button id="word-italic-button" className="sim-element btn btn-outline-secondary" onClick={() => handleAction('click', 'word-italic-button')}><i className="fas fa-italic"></i></button>
            </div>
            <button id="word-save-button" className="sim-element btn btn-link text-primary fs-4" onClick={() => handleAction('click', 'word-save-button')}><i className="fas fa-save"></i></button>
          </header>
          <div className="p-4 flex-grow-1">
            <textarea id="word-text-area" ref={textAreaRef} value={simulatorState['word-text-area'] || ''} onChange={handleInputChange} className="sim-element form-control h-100 fs-5 border-0" style={{resize: 'none'}} />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div id="word-app-icon" className="sim-element d-flex flex-column align-items-center gap-1" style={{cursor: 'pointer', width: '80px'}} onClick={() => handleAction('click', 'word-app-icon')}><div className="bg-primary rounded-3 d-flex align-items-center justify-content-center text-white display-4" style={{width: '64px', height: '64px'}}><i className="fas fa-file-word"></i></div><p className="small">Documento</p></div>
          <button id="word-new-button" className="sim-element mt-4 btn btn-secondary" onClick={() => handleAction('click', 'word-new-button')}>+ Nuevo</button>
        </div>
      )}
    </div>
  );

  const renderCamera = () => renderPhoneShell(
    simulatorState.view === 'gallery_open' ? (<div className="flex-grow-1 bg-black rounded-bottom-3 d-flex flex-column"><header className="p-2 text-white"><button id="camera-back-button" className="sim-element btn btn-dark" onClick={() => handleAction('click', 'camera-back-button')}><i className="fas fa-arrow-left"></i> Volver</button></header><div className="flex-grow-1 bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)'}}></div></div>) :
    simulatorState.view === 'camera_open' || simulatorState.view === 'video_mode' ? (
        <div className="bg-black flex-grow-1 d-flex flex-column justify-content-between align-items-center rounded-bottom-3 position-relative bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)'}}>
            <div className="w-100 p-4 d-flex justify-content-end text-white fs-4"><i className="fas fa-bolt"></i></div>
            <div className="w-100 p-4 d-flex flex-column align-items-center gap-4">
                <div className="text-white bg-dark bg-opacity-50 px-2 py-1 rounded-pill small">1x</div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <div id="camera-gallery-preview" className={`sim-element rounded-2 border-2 border-white bg-cover ${simulatorState.photoTaken ? 'bg-center' : 'bg-secondary'}`} style={{width: '48px', height: '48px', cursor: 'pointer', backgroundImage: simulatorState.photoTaken ? 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)' : 'none'}} onClick={() => handleAction('click', 'camera-gallery-preview')}></div>
                    <button id={simulatorState.view === 'video_mode' ? 'camera-record-button' : 'camera-shutter-button'} className={`sim-element rounded-circle border-4 border-light ${simulatorState.view === 'video_mode' ? 'bg-danger' : 'bg-white'}`} style={{width: '64px', height: '64px'}} onClick={() => handleAction('click', simulatorState.view === 'video_mode' ? 'camera-record-button' : 'camera-shutter-button')}></button>
                    <button id="camera-flip-button" className="sim-element btn text-white fs-4" style={{width: '48px', height: '48px'}} onClick={() => handleAction('click', 'camera-flip-button')}><i className="fas fa-sync-alt"></i></button>
                </div>
                <div className="d-flex gap-4 text-white fw-semibold"><p>FOTO</p><p id="camera-video-mode" className="sim-element opacity-75" style={{cursor: 'pointer'}} onClick={() => handleAction('click', 'camera-video-mode')}>VÍDEO</p></div>
            </div>
        </div>
    ) : (
        <div className="row g-4 p-4">
            <div id="camera-app-icon" className="sim-element col-3 d-flex flex-column align-items-center gap-1" style={{cursor: 'pointer'}} onClick={() => handleAction('click', 'camera-app-icon')}><div className="w-100 bg-light rounded-3 d-flex align-items-center justify-content-center display-4 aspect-ratio-1x1"><i className="fas fa-camera"></i></div><p className="small">Cámara</p></div>
        </div>
    ), true
  );
  
  const renderVideoCall = () => renderPhoneShell(
    <>
        { simulatorState.view === 'in_call' && <div className="flex-grow-1 bg-secondary text-white d-flex flex-column align-items-center justify-content-between p-4 rounded-bottom-3 bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/4134789/pexels-photo-4134789.jpeg)'}}><p className="bg-dark bg-opacity-50 px-3 py-1 rounded-pill">Llamada con {simulatorState.contactName}</p><div className="d-flex gap-3"><button id="videocall-mute-button" className={`sim-element btn rounded-circle d-flex align-items-center justify-content-center fs-4 ${simulatorState.muted ? 'btn-light text-dark' : 'btn-secondary'}`} style={{width: '56px', height: '56px'}} onClick={() => handleAction('click', 'videocall-mute-button')}><i className="fas fa-microphone-slash"></i></button><button id="videocall-end-button" className="sim-element btn btn-danger rounded-circle d-flex align-items-center justify-content-center fs-4" style={{width: '64px', height: '64px'}} onClick={() => handleAction('click', 'videocall-end-button')}><i className="fas fa-phone-slash"></i></button><button className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center fs-4" style={{width: '56px', height: '56px'}}><i className="fas fa-video-slash"></i></button></div></div>}
        { simulatorState.view === 'contact_details' && <div className="p-4 text-center"><h2 className="h1 fw-bold mt-4">{simulatorState.contactName}</h2><p className="text-muted">Móvil</p><div className="mt-5 d-flex justify-content-center gap-4"><button className="btn btn-secondary rounded-circle d-flex align-items-center justify-content-center fs-3" style={{width: '64px', height: '64px'}}><i className="fas fa-phone"></i></button><button id="videocall-start-button" className="sim-element btn btn-success rounded-circle d-flex align-items-center justify-content-center fs-3" onClick={() => handleAction('click', 'videocall-start-button')} style={{width: '64px', height: '64px'}}><i className="fas fa-video"></i></button></div></div>}
        { simulatorState.view === 'contact_list' && <div className="list-group list-group-flush"><div id="contact-juan-perez" className="sim-element list-group-item list-group-item-action" style={{cursor: 'pointer'}} onClick={() => handleAction('click', 'contact-juan-perez')}><p className="fw-bold mb-0">Juan Pérez</p></div><div className="list-group-item list-group-item-action" style={{cursor: 'pointer'}}><p className="fw-bold mb-0">María Gómez</p></div></div> }
        { !simulatorState.view && <div className="row g-4 p-4"><div id="videocall-app-icon" className="sim-element col-3 d-flex flex-column align-items-center gap-1" style={{cursor: 'pointer'}} onClick={() => handleAction('click', 'videocall-app-icon')}><div className="bg-success text-white w-100 rounded-3 d-flex align-items-center justify-content-center display-4 aspect-ratio-1x1"><i className="fas fa-phone"></i></div><p className="small">Teléfono</p></div></div>}
    </>
  );


  return (
    <div className="row g-4 align-items-center">
      <div className="col-lg-6">
        {step.simulatorConfig?.app === 'whatsapp' && renderWhatsApp()}
        {step.simulatorConfig?.app === 'email' && renderEmail()}
        {step.simulatorConfig?.app === 'camera' && renderCamera()}
        {step.simulatorConfig?.app === 'videocall' && renderVideoCall()}
        {step.simulatorConfig?.app === 'word' && renderWord()}
      </div>
      <div className="col-lg-6">
        <div className="p-4 bg-primary-subtle border-2 border-dashed border-primary-light rounded-3 text-center">
            <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                <i className="fas fa-robot fs-3 text-primary"></i>
                <h4 className="h5 fw-bold text-primary-emphasis mb-0">Guía del Asistente</h4>
            </div>
            <p className="fs-5 text-body-secondary">{step.simulatorConfig?.taskDescription}</p>
            <button 
                onClick={() => speak(step.simulatorConfig?.taskDescription || '')}
                className="btn btn-primary rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 mx-auto mt-4"
            >
                <i className="fas fa-volume-up"></i>
                Leer Instrucción
            </button>
      </div>
     </div>
    </div>
  );
};
