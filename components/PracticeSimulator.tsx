
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
    // Sincronizar el estado inicial del paso con el estado local del simulador
    setSimulatorState(step.simulatorConfig?.initialState || {});
    
    // Reset highlights
    document.querySelectorAll('.sim-element.highlight-animation').forEach(el => el.classList.remove('highlight-animation'));
    
    // Apply new highlight
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
    if (highlightElement !== `#${elementId}`) return; // Ignore clicks on wrong elements

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
     <div className={`w-full max-w-sm mx-auto h-[550px] bg-white border-8 ${darkBg ? 'border-slate-900' : 'border-slate-800'} rounded-3xl p-2 flex flex-col font-sans`}>
        {content}
    </div>
  );

  const renderWhatsApp = () => renderPhoneShell(
    <>
      <header className="bg-teal-700 text-white p-2 flex items-center gap-3 rounded-t-xl">
        <i className="fas fa-arrow-left"></i><div className="w-8 h-8 rounded-full bg-slate-300"></div>
        <p className="font-semibold">{simulatorState.contactName || 'Contactos'}</p>
      </header>

      {simulatorState.view === 'attachment_menu' && <div className="p-4 grid grid-cols-3 gap-4 bg-slate-100 rounded-b-xl flex-1"><div id="attachment-gallery" className="sim-element flex flex-col items-center gap-2 cursor-pointer" onClick={() => handleAction('click', 'attachment-gallery')}><div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl"><i className="fas fa-images"></i></div><p>Galería</p></div></div>}
      {simulatorState.view === 'gallery_view' && <div className="p-2 grid grid-cols-3 gap-2 bg-slate-200 rounded-b-xl flex-1"><div id="gallery-photo-1" className="sim-element aspect-square bg-cover bg-center rounded-md cursor-pointer" style={{backgroundImage: 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)'}} onClick={() => handleAction('click', 'gallery-photo-1')}></div></div>}

      {(simulatorState.view === 'chat' || !simulatorState.view) && (
        <>
            <main className="flex-1 bg-cover p-3 space-y-2" style={{backgroundImage: 'url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)'}}>
                {simulatorState.view === 'chat' ? (
                <div className="flex flex-col gap-2">
                    <div id="received-message" className="sim-element bg-white p-2 rounded-lg self-start shadow max-w-[80%] cursor-pointer" onClick={() => handleAction('click', 'received-message')}>{simulatorState.receivedMessage}</div>
                    {simulatorState.messageSent && <div className="bg-green-100 p-2 rounded-lg self-end shadow max-w-[80%]">{simulatorState.message}</div>}
                    {simulatorState.photoSent && <div className="bg-green-100 p-1 rounded-lg self-end shadow w-48"><img src="https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg" className="rounded-md" alt="paisaje"/></div>}
                </div>
                ) : ( <div id="contact-ana-garcia" className="sim-element bg-white p-2 rounded-lg shadow cursor-pointer" onClick={() => handleAction('click', 'contact-ana-garcia')}><p className="font-bold">Ana García</p></div> )}
            </main>
            <footer className="p-2 flex items-center gap-2">
                <button id="whatsapp-attachment-button" className="sim-element w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center" onClick={() => handleAction('click', 'whatsapp-attachment-button')}><i className="fas fa-paperclip"></i></button>
                <input id="whatsapp-input" type="text" value={simulatorState['whatsapp-input'] || ''} onChange={handleInputChange} placeholder="Mensaje" className="sim-element flex-1 p-2 border rounded-full" />
                <button id="whatsapp-send-button" className="sim-element w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center" onClick={() => handleAction('click', 'whatsapp-send-button')}><i className="fas fa-paper-plane"></i></button>
            </footer>
        </>
      )}
    </>
  );

  const renderEmail = () => (
     <div className="w-full h-96 bg-white border border-slate-300 rounded-lg shadow-sm p-2 flex flex-col font-sans">
        { simulatorState.view === 'file_explorer' && <div className="p-2"><div id="file-informe-trimestral.pdf" className="sim-element flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer" onClick={() => handleAction('click', 'file-informe-trimestral.pdf')}><i className="fas fa-file-pdf text-red-500"></i><p>informe-trimestral.pdf</p></div></div> }
        { simulatorState.view === 'compose' || !simulatorState.view ? (
             simulatorState.view === 'compose' ? (
                <div className="flex flex-col h-full">
                    <header className="p-2 border-b font-bold text-lg">Correo Nuevo</header>
                    <div className="p-2 border-b"><input id="email-to-input" type="text" value={simulatorState['email-to-input'] || ''} onChange={handleInputChange} placeholder="Para" className="sim-element w-full outline-none" /></div>
                    <div className="p-2 border-b"><input id="email-subject-input" type="text" value={simulatorState['email-subject-input'] || ''} onChange={handleInputChange} placeholder="Asunto" className="sim-element w-full outline-none" /></div>
                    <div className="p-2 flex-1"><textarea value={simulatorState.body || ''} className="w-full h-full outline-none resize-none" placeholder="Escriba su mensaje aquí..."/></div>
                    {simulatorState.attachment && <div className="p-2 border-t text-sm text-slate-600 flex items-center gap-2"><i className="fas fa-paperclip"></i>{simulatorState.attachment}</div>}
                    <footer className="p-2 flex justify-between items-center"><button id="email-send-button" className="sim-element px-6 py-2 bg-blue-600 text-white font-semibold rounded-md" onClick={() => handleAction('click', 'email-send-button')}>Enviar</button><button id="email-attachment-button" className="sim-element text-2xl text-slate-600" onClick={() => handleAction('click', 'email-attachment-button')}><i className="fas fa-paperclip"></i></button></footer>
                </div>
            ) : ( <div className="p-2"><button id="email-compose-button" className="sim-element px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-full shadow-sm flex items-center gap-2" onClick={() => handleAction('click', 'email-compose-button')}><i className="fas fa-pencil-alt"></i> Redactar</button></div> )
        ) : null}
     </div>
  );
  
  const renderWord = () => (
    <div className="w-full h-[500px] bg-slate-50 border border-slate-300 rounded-lg shadow-sm p-2 flex flex-col font-sans">
      {simulatorState.view === 'editor' ? (
        <div className="flex flex-col h-full bg-white">
          <header className="p-2 border-b bg-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button id="word-bold-button" className="sim-element w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded" onClick={() => handleAction('click', 'word-bold-button')}><i className="fas fa-bold"></i></button>
              <button id="word-italic-button" className="sim-element w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded" onClick={() => handleAction('click', 'word-italic-button')}><i className="fas fa-italic"></i></button>
            </div>
            <button id="word-save-button" className="sim-element text-2xl text-blue-600 hover:text-blue-800" onClick={() => handleAction('click', 'word-save-button')}><i className="fas fa-save"></i></button>
          </header>
          <div className="p-4 flex-1">
            <textarea id="word-text-area" ref={textAreaRef} value={simulatorState['word-text-area'] || ''} onChange={handleInputChange} className="sim-element w-full h-full outline-none resize-none text-lg" />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div id="word-app-icon" className="sim-element flex flex-col items-center gap-1 cursor-pointer w-20" onClick={() => handleAction('click', 'word-app-icon')}><div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-4xl"><i className="fas fa-file-word"></i></div><p className="text-sm">Documento</p></div>
          <button id="word-new-button" className="sim-element mt-4 px-4 py-2 bg-slate-200 font-semibold rounded-md" onClick={() => handleAction('click', 'word-new-button')}>+ Nuevo</button>
        </div>
      )}
    </div>
  );

  const renderCamera = () => renderPhoneShell(
    simulatorState.view === 'gallery_open' ? (<div className="flex-1 bg-black rounded-b-xl flex flex-col"><header className="p-2 text-white"><button id="camera-back-button" className="sim-element" onClick={() => handleAction('click', 'camera-back-button')}><i className="fas fa-arrow-left"></i> Volver</button></header><div className="flex-1 bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)'}}></div></div>) :
    simulatorState.view === 'camera_open' || simulatorState.view === 'video_mode' ? (
        <div className="bg-black flex-1 flex flex-col justify-between items-center rounded-b-xl relative bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)'}}>
            <div className="w-full p-4 flex justify-end text-white text-2xl"><i className="fas fa-bolt"></i></div>
            <div className="w-full p-4 flex flex-col items-center gap-4">
                <div className="text-white bg-black/50 px-2 py-1 rounded-full text-sm">1x</div>
                <div className="w-full flex justify-between items-center">
                    <div id="camera-gallery-preview" className={`sim-element w-12 h-12 rounded-lg border-2 border-white cursor-pointer bg-cover ${simulatorState.photoTaken ? 'bg-center' : 'bg-slate-600'}`} style={simulatorState.photoTaken ? {backgroundImage: 'url(https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg)'} : {}} onClick={() => handleAction('click', 'camera-gallery-preview')}></div>
                    <button id={simulatorState.view === 'video_mode' ? 'camera-record-button' : 'camera-shutter-button'} className={`sim-element ${simulatorState.view === 'video_mode' ? 'w-16 h-16 bg-red-600' : 'w-16 h-16 bg-white'} rounded-full border-4 border-slate-300`} onClick={() => handleAction('click', simulatorState.view === 'video_mode' ? 'camera-record-button' : 'camera-shutter-button')}></button>
                    <button id="camera-flip-button" className="sim-element w-12 h-12 flex items-center justify-center text-white text-2xl" onClick={() => handleAction('click', 'camera-flip-button')}><i className="fas fa-sync-alt"></i></button>
                </div>
                <div className="flex gap-4 text-white font-semibold"><p>FOTO</p><p id="camera-video-mode" className="sim-element cursor-pointer opacity-70" onClick={() => handleAction('click', 'camera-video-mode')}>VÍDEO</p></div>
            </div>
        </div>
    ) : (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div id="camera-app-icon" className="sim-element flex flex-col items-center gap-1 cursor-pointer" onClick={() => handleAction('click', 'camera-app-icon')}><div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center text-4xl"><i className="fas fa-camera"></i></div><p className="text-sm">Cámara</p></div>
        </div>
    ), true
  );
  
  const renderVideoCall = () => renderPhoneShell(
    <>
        { simulatorState.view === 'in_call' && <div className="flex-1 bg-slate-800 text-white flex flex-col items-center justify-between p-4 rounded-b-xl bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/4134789/pexels-photo-4134789.jpeg)'}}><p className="bg-black/50 px-3 py-1 rounded-full">Llamada con {simulatorState.contactName}</p><div className="flex gap-4"><button id="videocall-mute-button" className={`sim-element w-14 h-14 ${simulatorState.muted ? 'bg-white text-black' : 'bg-white/30'} rounded-full flex items-center justify-center text-2xl`} onClick={() => handleAction('click', 'videocall-mute-button')}><i className="fas fa-microphone-slash"></i></button><button id="videocall-end-button" className="sim-element w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl" onClick={() => handleAction('click', 'videocall-end-button')}><i className="fas fa-phone-slash"></i></button><button className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center text-2xl"><i className="fas fa-video-slash"></i></button></div></div>}
        { simulatorState.view === 'contact_details' && <div className="p-4 text-center"><h2 className="text-2xl font-bold mt-4">{simulatorState.contactName}</h2><p className="text-slate-500">Móvil</p><div className="mt-8 flex justify-center gap-6"><button className="w-16 h-16 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-2xl"><i className="fas fa-phone"></i></button><button id="videocall-start-button" className="sim-element w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl" onClick={() => handleAction('click', 'videocall-start-button')}><i className="fas fa-video"></i></button></div></div>}
        { simulatorState.view === 'contact_list' && <div className="divide-y"><div id="contact-juan-perez" className="sim-element bg-white p-3 cursor-pointer hover:bg-slate-50" onClick={() => handleAction('click', 'contact-juan-perez')}><p className="font-bold">Juan Pérez</p></div><div className="bg-white p-3 cursor-pointer hover:bg-slate-50"><p className="font-bold">María Gómez</p></div></div> }
        { !simulatorState.view && <div className="grid grid-cols-4 gap-4 p-4"><div id="videocall-app-icon" className="sim-element flex flex-col items-center gap-1 cursor-pointer" onClick={() => handleAction('click', 'videocall-app-icon')}><div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center text-white text-4xl"><i className="fas fa-phone"></i></div><p className="text-sm">Teléfono</p></div></div>}
    </>
  );


  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="flex-1 w-full">
        {step.simulatorConfig?.app === 'whatsapp' && renderWhatsApp()}
        {step.simulatorConfig?.app === 'email' && renderEmail()}
        {step.simulatorConfig?.app === 'camera' && renderCamera()}
        {step.simulatorConfig?.app === 'videocall' && renderVideoCall()}
        {step.simulatorConfig?.app === 'word' && renderWord()}
      </div>
      <div className="flex-1 p-4 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-lg text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
            <i className="fas fa-robot text-2xl text-indigo-600"></i>
            <h4 className="text-xl font-bold text-indigo-800">Guía del Asistente</h4>
        </div>
        <p className="text-lg text-slate-700">{step.simulatorConfig?.taskDescription}</p>
        <button 
            onClick={() => speak(step.simulatorConfig?.taskDescription || '')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 mx-auto"
        >
            <i className="fas fa-volume-up"></i>
            Leer Instrucción
        </button>
      </div>
    </div>
  );
};
