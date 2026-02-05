import React, { useState, useRef, useEffect } from 'react';
import { getAuthAIResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

// Comprobación de la API de reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition: SpeechRecognition | null = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'es-ES';
  recognition.interimResults = true;
}

export const AuthAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Soy el Asistente de Acceso. ¿Tiene alguna duda sobre cómo registrarse o iniciar sesión?',
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
      const aiResponse = await getAuthAIResponse(userInput);
      const newAiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, newAiMessage]);
      speak(aiResponse);
    } catch (error) {
        const errorText = 'El servicio de asistencia no está disponible.';
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
        className="fixed bottom-6 right-6 w-20 h-20 bg-amber-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-600 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-300"
        aria-label="Abrir asistente de ayuda para el acceso"
      >
        <i className="fas fa-question text-4xl"></i>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-96 sm:h-[600px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col z-50 animate-slide-up">
      <header className="flex items-center justify-between p-4 bg-amber-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
            <i className="fas fa-question-circle text-2xl"></i>
            <h3 className="text-xl font-bold">Ayuda de Acceso</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-2xl hover:opacity-75">&times;</button>
      </header>

      <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0"><i className="fas fa-question-circle"></i></div>}
              <div className={`relative group max-w-xs md:max-w-sm px-4 py-3 rounded-2xl text-lg ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'
              } ${msg.sender === 'system' ? 'bg-red-100 text-red-800 text-center w-full' : ''}`}>
                {msg.text}
                 {msg.sender === 'ai' && (
                    <button onClick={() => speak(msg.text)} className="absolute -bottom-3 -right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-amber-600" aria-label="Leer mensaje en voz alta">
                        <i className="fas fa-volume-up"></i>
                    </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2 justify-start">
                 <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0"><i className="fas fa-question-circle"></i></div>
                 <div className="px-4 py-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                     <div className="flex items-center justify-center gap-2">
                         <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                         <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                         <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-300"></span>
                     </div>
                 </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          {recognition && (
              <button type="button" onClick={handleMicClick} className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors active:scale-95 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600'}`} aria-label={isListening ? 'Dejar de escuchar' : 'Empezar a escuchar'}>
                  <i className="fas fa-microphone text-xl"></i>
              </button>
          )}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={isListening ? 'Escuchando...' : '¿Qué duda tiene?'}
            className="w-full text-lg p-3 border-2 border-slate-300 rounded-full focus:border-amber-500 focus:ring-amber-500 transition"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="w-14 h-14 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:bg-slate-300 transition-colors active:scale-95">
            <i className="fas fa-paper-plane text-xl"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
