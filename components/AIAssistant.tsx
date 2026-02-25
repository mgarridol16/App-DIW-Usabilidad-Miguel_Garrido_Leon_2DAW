
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

// Comprobación de la API de reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition: SpeechRecognition | null = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'es-ES';
  recognition.interimResults = true;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Bienvenido al Asistente de Soporte. ¿En qué puedo ayudarle hoy?',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Función para leer texto en voz alta
  const speak = (text: string) => {
    window.speechSynthesis.cancel(); // Detiene cualquier locución anterior
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setUserInput(event.results[i][0].transcript);
          setIsListening(false);
        } else {
          interimTranscript += event.results[i][0].transcript;
          setUserInput(interimTranscript);
        }
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
    };

  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (messages.length === 1) {
        speak(messages[0].text);
      }
    } else {
      window.speechSynthesis.cancel();
    }
    return () => {
      window.speechSynthesis.cancel();
      if (isListening) recognition?.stop();
    };
  }, [isOpen]);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMicClick = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
    } else {
      setUserInput('');
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    if (isListening) {
        recognition?.stop();
        setIsListening(false);
    }

    const newUserMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(userInput);
      const newAiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, newAiMessage]);
      speak(aiResponse);
    } catch (error) {
        const errorText = 'El servicio de asistencia no está disponible. Inténtelo más tarde.';
        const errorMessage: ChatMessage = { sender: 'system', text: errorText };
        setMessages((prev) => [...prev, errorMessage]);
        speak(errorText);
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center position-fixed"
        style={{ bottom: '24px', right: '24px', width: '80px', height: '80px', transition: 'transform 0.2s' }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Abrir asistente de soporte"
      >
        <i className="fas fa-headset display-4"></i>
      </button>
    );
  }

  return (
    <div className="position-fixed bottom-0 end-0 w-100 h-100 sm-w-96 sm-h-600 bg-white rounded-top-4 sm-rounded-4 shadow-lg d-flex flex-column z-50 animate-slide-up" style={{maxWidth: '384px', maxHeight: '600px'}}>
      <header className="d-flex align-items-center justify-content-between p-3 bg-primary text-white rounded-top-4">
        <div className="d-flex align-items-center gap-3">
            <i className="fas fa-comment-dots fs-4"></i>
            <h3 className="h5 mb-0 fw-bold">Asistente de Soporte</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="btn-close btn-close-white"></button>
      </header>

      <div className="flex-grow-1 p-3 overflow-y-auto bg-light">
        <div className="d-flex flex-column gap-3">
          {messages.map((msg, index) => (
            <div key={index} className={`d-flex align-items-end gap-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              {msg.sender === 'ai' && <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}><i className="fas fa-comment-dots small"></i></div>}
              <div className={`position-relative group p-3 rounded-3 fs-6 ${
                msg.sender === 'user' ? 'bg-primary text-white rounded-bottom-end-0' : 'bg-body-secondary text-body rounded-bottom-start-0'
              } ${msg.sender === 'system' ? 'bg-danger-subtle text-danger-emphasis text-center w-100' : ''}`} style={{maxWidth: '80%'}}>
                {msg.text}
                {msg.sender === 'ai' && (
                    <button onClick={() => speak(msg.text)} className="position-absolute btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center opacity-0 group-hover-opacity-100" style={{bottom: '-10px', right: '-10px', transition: 'opacity 0.2s'}} aria-label="Leer mensaje en voz alta">
                        <i className="fas fa-volume-up"></i>
                    </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="d-flex align-items-end gap-2 justify-content-start">
                 <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}><i className="fas fa-comment-dots small"></i></div>
                 <div className="p-3 rounded-3 bg-body-secondary text-body rounded-bottom-start-0">
                     <div className="d-flex align-items-center justify-content-center gap-2">
                         <span className="spinner-grow spinner-grow-sm" role="status"></span>
                     </div>
                 </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-top bg-white">
        <div className="d-flex align-items-center gap-2">
          {recognition && (
              <button type="button" onClick={handleMicClick} className={`btn rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${isListening ? 'btn-danger' : 'btn-light'}`} style={{width: '50px', height: '50px'}} aria-label={isListening ? 'Dejar de escuchar' : 'Empezar a escuchar'}>
                  <i className="fas fa-microphone fs-5"></i>
              </button>
          )}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={isListening ? 'Escuchando...' : 'Escriba su consulta...'}
            className="form-control form-control-lg rounded-pill"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
            <i className="fas fa-paper-plane fs-5"></i>
          </button>
        </div>
      </form>
    </div>
  );
};