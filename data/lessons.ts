import type { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: "whatsapp-intro",
    title: "Comunicación por WhatsApp",
    description:
      "Domine el envío de mensajes, fotos y notas de voz en un simulador seguro.",
    icon: "fab fa-whatsapp",
    unlocksAchievement: "comunicador-digital",
    steps: [
      {
        type: "instructional",
        title: "Bienvenida a WhatsApp",
        content:
          "WhatsApp es una herramienta de comunicación líder que le permite enviar mensajes de texto, imágenes, vídeos y audios a sus contactos a través de una conexión a internet.",
        image: "logo-app",
      },
      {
        type: "multipleChoice",
        title: "Comprobación de Conocimiento",
        question: "¿Qué se necesita para usar WhatsApp?",
        options: [
          { id: "a", text: "Crédito de llamadas" },
          { id: "b", text: "Una conexión a internet" },
          { id: "c", text: "Un correo electrónico" },
        ],
        correctAnswer: "b",
        feedbackCorrect: "¡Correcto! WhatsApp utiliza internet para funcionar.",
        feedbackIncorrect:
          "Recuerde, WhatsApp funciona a través de internet, no del crédito telefónico tradicional.",
      },
      {
        type: "simulatorTask",
        title: "Iniciar una Conversación",
        simulatorConfig: {
          app: "whatsapp",
          highlightElement: "#contact-ana-garcia",
          taskDescription:
            'Para empezar, pulse en el contacto "Ana García" para abrir una nueva ventana de chat.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Escribir su Primer Mensaje",
        simulatorConfig: {
          app: "whatsapp",
          initialState: { view: "chat", contactName: "Ana García" },
          highlightElement: "#whatsapp-input",
          taskDescription:
            'El teclado está listo. Escriba el mensaje "Hola, ¿cómo estás?" en el campo de texto.',
          expectedAction: { type: "input", value: "Hola, ¿cómo estás?" },
        },
      },
      {
        type: "simulatorTask",
        title: "Enviar el Mensaje",
        simulatorConfig: {
          app: "whatsapp",
          initialState: {
            view: "chat",
            contactName: "Ana García",
            message: "Hola, ¿cómo estás?",
          },
          highlightElement: "#whatsapp-send-button",
          taskDescription:
            "Mensaje listo. Pulse el botón verde con el icono del avión de papel para enviarlo.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "Entendiendo los Checks de Entrega",
        content:
          'Los checks o "ticks" junto a sus mensajes indican su estado: un check gris significa "enviado"; dos checks grises, "entregado"; y dos checks azules, "leído por el destinatario".',
        image: "whatsapp-checks",
      },
      {
        type: "multipleChoice",
        title: "Evaluación Rápida",
        question: "¿Qué significan dos checks azules?",
        options: [
          { id: "a", text: "El mensaje no se ha enviado." },
          { id: "b", text: "El mensaje ha sido leído." },
          { id: "c", text: "El mensaje fue entregado, pero no leído." },
        ],
        correctAnswer: "b",
        feedbackCorrect:
          "¡Perfecto! Dos checks azules confirman la lectura del mensaje.",
        feedbackIncorrect:
          'Casi. Dos checks azules significan que el mensaje fue leído. Dos grises significan "entregado".',
      },
      {
        type: "simulatorTask",
        title: "Reaccionar a un Mensaje",
        simulatorConfig: {
          app: "whatsapp",
          initialState: {
            view: "chat",
            contactName: "Ana García",
            message: "Hola, ¿cómo estás?",
            messageSent: true,
            receivedMessage: "¡Hola! Muy bien, ¿y tú?",
          },
          highlightElement: "#received-message",
          taskDescription:
            "Puede reaccionar a un mensaje. Mantenga pulsado el mensaje de Ana para ver las opciones.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Enviar una Imagen",
        simulatorConfig: {
          app: "whatsapp",
          initialState: {
            view: "chat",
            contactName: "Ana García",
            message: "Hola, ¿cómo estás?",
            messageSent: true,
          },
          highlightElement: "#whatsapp-attachment-button",
          taskDescription:
            "Ahora, enviaremos una foto. Pulse el icono del clip para abrir las opciones de adjuntos.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Seleccionar desde la Galería",
        simulatorConfig: {
          app: "whatsapp",
          initialState: { view: "attachment_menu", contactName: "Ana García" },
          highlightElement: "#attachment-gallery",
          taskDescription:
            'Se han abierto las opciones. Pulse en "Galería" para seleccionar una imagen de su dispositivo.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Elegir y Enviar la Foto",
        simulatorConfig: {
          app: "whatsapp",
          initialState: { view: "gallery_view", contactName: "Ana García" },
          highlightElement: "#gallery-photo-1",
          taskDescription:
            "Aquí tiene su galería. Seleccione la primera foto del paisaje para enviarla.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "¡Módulo Completado!",
        content:
          "¡Felicidades! Ahora domina las funciones esenciales de WhatsApp, incluyendo el envío de texto e imágenes. Ha desbloqueado un nuevo logro.",
        image: "whatsapp-trophy",
      },
    ],
  },
  {
    id: "email-basics",
    title: "Dominio del Correo Electrónico",
    description:
      "Curso completo para redactar, enviar y gestionar correos como un profesional.",
    icon: "fas fa-envelope-open-text",
    steps: [
      {
        type: "instructional",
        title: "Introducción al Correo Electrónico",
        content:
          "El correo electrónico es una herramienta fundamental en el mundo digital para la comunicación formal y profesional. Aprenderá a redactar, enviar y gestionar sus correos de forma eficiente.",
        image: "logo-app",
      },
      {
        type: "multipleChoice",
        title: "Comprobación de Conceptos",
        question: "¿Qué campo indica el tema del correo?",
        options: [
          { id: "a", text: "Para" },
          { id: "b", text: "Asunto" },
          { id: "c", text: "Cuerpo" },
        ],
        correctAnswer: "b",
        feedbackCorrect: '¡Correcto! El "Asunto" es el título del correo.',
        feedbackIncorrect:
          'El título o tema del correo se especifica en el campo "Asunto".',
      },
      {
        type: "simulatorTask",
        title: "Redactar un Nuevo Correo",
        simulatorConfig: {
          app: "email",
          highlightElement: "#email-compose-button",
          taskDescription:
            'Comencemos. Pulse el botón "Redactar" para abrir una nueva ventana de correo.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Añadir Destinatario",
        simulatorConfig: {
          app: "email",
          initialState: { view: "compose" },
          highlightElement: "#email-to-input",
          taskDescription:
            'En el campo "Para", escriba la dirección del destinatario: "equipo@empresa.com".',
          expectedAction: { type: "input", value: "equipo@empresa.com" },
        },
      },
      {
        type: "simulatorTask",
        title: "Escribir un Asunto Claro",
        simulatorConfig: {
          app: "email",
          initialState: { view: "compose", to: "equipo@empresa.com" },
          highlightElement: "#email-subject-input",
          taskDescription:
            'Un buen asunto es clave. Escriba "Informe Trimestral" en el campo "Asunto".',
          expectedAction: { type: "input", value: "Informe Trimestral" },
        },
      },
      {
        type: "instructional",
        title: "Adjuntar Archivos",
        content:
          "El icono del clip se utiliza universalmente para adjuntar archivos a un correo, como documentos, imágenes o PDFs. Es una función esencial para compartir información.",
        image: "email-anatomy",
      },
      {
        type: "simulatorTask",
        title: "Adjuntar un Documento",
        simulatorConfig: {
          app: "email",
          initialState: {
            view: "compose",
            to: "equipo@empresa.com",
            subject: "Informe Trimestral",
            body: "Adjunto el informe para su revisión.",
          },
          highlightElement: "#email-attachment-button",
          taskDescription:
            "Ahora, adjunte el informe. Pulse el icono del clip para abrir el explorador de archivos.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Seleccionar el Archivo",
        simulatorConfig: {
          app: "email",
          initialState: {
            view: "file_explorer",
            to: "equipo@empresa.com",
            subject: "Informe Trimestral",
            body: "Adjunto el informe para su revisión.",
          },
          highlightElement: "#file-informe-trimestral.pdf",
          taskDescription:
            'Se ha abierto el explorador. Seleccione el documento llamado "informe-trimestral.pdf".',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Enviar el Correo Final",
        simulatorConfig: {
          app: "email",
          initialState: {
            view: "compose",
            to: "equipo@empresa.com",
            subject: "Informe Trimestral",
            body: "Adjunto el informe para su revisión.",
            attachment: "informe-trimestral.pdf",
          },
          highlightElement: "#email-send-button",
          taskDescription:
            'Todo está listo: destinatario, asunto y archivo adjunto. Pulse "Enviar" para finalizar.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "¡Misión Cumplida!",
        content:
          "Ha aprendido a componer y enviar un correo profesional con un archivo adjunto. Esta es una habilidad digital crucial.",
        image: "email-trophy",
      },
    ],
  },
  {
    id: "document-editing",
    title: "Edición de Documentos",
    description: "Aprenda a crear y dar formato a documentos de texto básicos.",
    icon: "fas fa-file-word",
    unlocksAchievement: "editor-documentos",
    steps: [
      {
        type: "instructional",
        title: "Creando Documentos de Texto",
        content:
          "Los procesadores de texto, como Microsoft Word o Google Docs, le permiten escribir cartas, informes y todo tipo de documentos. Aprenderemos lo básico.",
        image: "logo-app",
      },
      {
        type: "simulatorTask",
        title: "Abrir el Editor",
        simulatorConfig: {
          app: "word",
          highlightElement: "#word-app-icon",
          taskDescription:
            "Para empezar, abra la aplicación de documentos pulsando su icono.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Crear un Nuevo Documento",
        simulatorConfig: {
          app: "word",
          initialState: { view: "main" },
          highlightElement: "#word-new-button",
          taskDescription:
            'Está en la pantalla principal. Pulse el botón "Nuevo" para crear un documento en blanco.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Escribir Texto",
        simulatorConfig: {
          app: "word",
          initialState: { view: "editor" },
          highlightElement: "#word-text-area",
          taskDescription:
            'El cursor está parpadeando, listo para que escriba. Escriba la frase: "Este es mi primer documento."',
          expectedAction: {
            type: "input",
            value: "Este es mi primer documento.",
          },
        },
      },
      {
        type: "instructional",
        title: "Dando Formato al Texto",
        content:
          'Puede cambiar la apariencia de su texto para resaltar partes importantes. Los botones más comunes son la "N" para negrita (texto más grueso) y la "I" para cursiva (texto inclinado).',
        image: "word-toolbar",
      },
      {
        type: "simulatorTask",
        title: "Aplicar Negrita",
        simulatorConfig: {
          app: "word",
          initialState: {
            view: "editor",
            text: "Este es mi primer documento.",
          },
          highlightElement: "#word-bold-button",
          taskDescription:
            'Seleccione (simulado) la palabra "primer" y pulse el botón "N" para ponerla en negrita.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Guardar el Documento",
        simulatorConfig: {
          app: "word",
          initialState: {
            view: "editor",
            text: "Este es mi **primer** documento.",
          },
          highlightElement: "#word-save-button",
          taskDescription:
            "¡Excelente! Su documento está listo. Pulse el icono del disquete para guardarlo.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "¡Documento Creado!",
        content:
          "Ha aprendido a crear, escribir y dar formato a un documento de texto. ¡Ha desbloqueado el logro de Editor de Documentos!",
        image: "document-trophy",
      },
    ],
  },
  {
    id: "camera-basics",
    title: "Fotografía con el Móvil",
    description:
      "Aprenda a tomar fotos, grabar vídeos y usar las funciones básicas de la cámara.",
    icon: "fas fa-camera-retro",
    unlocksAchievement: "fotografo-principiante",
    steps: [
      {
        type: "instructional",
        title: "El Mundo en su Bolsillo",
        content:
          "La cámara de su dispositivo es una herramienta poderosa para capturar recuerdos. Le enseñaremos a usarla paso a paso.",
        image: "logo-app",
      },
      {
        type: "simulatorTask",
        title: "Abrir la Cámara",
        simulatorConfig: {
          app: "camera",
          highlightElement: "#camera-app-icon",
          taskDescription:
            'En la pantalla principal, pulse el icono de la "Cámara" para empezar.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Tomar una Foto",
        simulatorConfig: {
          app: "camera",
          initialState: { view: "camera_open" },
          highlightElement: "#camera-shutter-button",
          taskDescription:
            "Esta es la vista de la cámara. Pulse el botón circular blanco para tomar una foto.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Ver la Foto en la Galería",
        simulatorConfig: {
          app: "camera",
          initialState: { view: "camera_open", photoTaken: true },
          highlightElement: "#camera-gallery-preview",
          taskDescription:
            "¡Foto tomada! Pulse en la miniatura de la esquina para verla en grande.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "Cambiando a Modo Vídeo",
        content:
          'Además de fotos, puede grabar vídeos. Normalmente, se cambia de modo deslizando el dedo sobre las opciones o pulsando la palabra "Vídeo".',
        image: "camera-modes",
      },
      {
        type: "simulatorTask",
        title: "Volver a la Cámara",
        simulatorConfig: {
          app: "camera",
          initialState: { view: "gallery_open" },
          highlightElement: "#camera-back-button",
          taskDescription: 'Volvamos a la cámara. Pulse el botón de "Atrás".',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Cambiar a Vídeo",
        simulatorConfig: {
          app: "camera",
          initialState: { view: "camera_open" },
          highlightElement: "#camera-video-mode",
          taskDescription:
            'Ahora, pulse en la opción "VÍDEO" para cambiar de modo.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Grabar un Vídeo",
        simulatorConfig: {
          app: "camera",
          initialState: { view: "video_mode" },
          highlightElement: "#camera-record-button",
          taskDescription:
            "El botón ha cambiado a rojo. Púlselo para empezar a grabar.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Cambiar a Cámara Frontal",
        simulatorConfig: {
          app: "camera",
          initialState: { view: "video_mode" },
          highlightElement: "#camera-flip-button",
          taskDescription:
            "Para grabarse a sí mismo, pulse el botón con las flechas circulares para cambiar a la cámara frontal.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "¡Lección Finalizada!",
        content:
          "¡Excelente! Ahora sabe cómo tomar fotos y grabar vídeos. Ha desbloqueado el logro de Fotógrafo Principiante.",
        image: "photo-landscape",
      },
    ],
  },
  {
    id: "videocall-basics",
    title: "Conexión por VideoLlamada",
    description:
      "Aprenda a realizar y gestionar videollamadas para conectar con otros.",
    icon: "fas fa-video",
    unlocksAchievement: "conector-global",
    steps: [
      {
        type: "instructional",
        title: "Comunicación Cara a Cara",
        content:
          "Una videollamada le permite ver y hablar con otra persona en tiempo real a través de internet, superando cualquier distancia.",
        image: "logo-app",
      },
      {
        type: "simulatorTask",
        title: "Abrir la App de Llamadas",
        simulatorConfig: {
          app: "videocall",
          highlightElement: "#videocall-app-icon",
          taskDescription:
            "Abra la aplicación de comunicación pulsando su icono.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Buscar un Contacto",
        simulatorConfig: {
          app: "videocall",
          initialState: { view: "contact_list" },
          highlightElement: "#contact-juan-perez",
          taskDescription:
            'Esta es su lista de contactos. Pulse sobre "Juan Pérez" para ver sus detalles.',
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Iniciar la VideoLlamada",
        simulatorConfig: {
          app: "videocall",
          initialState: { view: "contact_details", contactName: "Juan Pérez" },
          highlightElement: "#videocall-start-button",
          taskDescription:
            "Pulse el icono de la cámara de vídeo para iniciar la llamada.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "Controles Durante la Llamada",
        content:
          "Durante una llamada, tiene controles importantes: el micrófono para silenciar su audio, la cámara para apagar su vídeo y el botón de colgar para terminar.",
        image: "videocall-controls",
      },
      {
        type: "simulatorTask",
        title: "Silenciar el Micrófono",
        simulatorConfig: {
          app: "videocall",
          initialState: { view: "in_call", contactName: "Juan Pérez" },
          highlightElement: "#videocall-mute-button",
          taskDescription:
            "Practiquemos. Pulse el icono del micrófono para silenciar su audio.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "simulatorTask",
        title: "Finalizar la Llamada",
        simulatorConfig: {
          app: "videocall",
          initialState: {
            view: "in_call",
            contactName: "Juan Pérez",
            muted: true,
          },
          highlightElement: "#videocall-end-button",
          taskDescription:
            "Muy bien. Para terminar la llamada, pulse el botón rojo.",
          expectedAction: { type: "click" },
        },
      },
      {
        type: "instructional",
        title: "¡Módulo Superado!",
        content:
          "¡Felicidades! Ha completado una videollamada con éxito y sabe gestionar sus controles. Ha ganado un nuevo logro.",
        image: "videocall-trophy",
      },
    ],
  },
  {
    id: "online-security",
    title: "Fortaleza Digital: Contraseñas",
    description:
      "Curso esencial sobre cómo crear y gestionar contraseñas seguras para proteger su identidad.",
    icon: "fas fa-shield-alt",
    unlocksAchievement: "experto-en-seguridad",
    steps: [
      {
        type: "instructional",
        title: "Su Identidad Digital",
        content:
          "En internet, su identidad se protege con contraseñas. Son las llaves de su vida digital: correos, bancos, redes sociales. Una contraseña débil es como una puerta sin cerradura.",
        image: "logo-app",
      },
      {
        type: "instructional",
        title: "Anatomía de una Contraseña Fuerte",
        content:
          "Una contraseña robusta es larga (mínimo 12 caracteres) y compleja. Debe mezclar letras mayúsculas (A, B, C), minúsculas (a, b, c), números (1, 2, 3) y símbolos (!, @, #, $).",
        image: "password-strength",
      },
      {
        type: "multipleChoice",
        title: "Evaluación de Fortaleza",
        question: "¿Cuál de estas contraseñas es la MÁS segura?",
        options: [
          { id: "a", text: "123456789" },
          { id: "b", text: "contraseña" },
          { id: "c", text: "Verano#2024!" },
        ],
        correctAnswer: "c",
        feedbackCorrect:
          "¡Correcto! Mezcla todos los elementos necesarios para ser una contraseña robusta.",
        feedbackIncorrect:
          "Esa opción es predecible y fácil de adivinar. La más segura es la que combina mayúsculas, minúsculas, números y símbolos.",
      },
      {
        type: "instructional",
        title: "El Peligro del Phishing",
        content:
          'El "phishing" es una estafa donde los delincuentes envían correos o mensajes falsos (imitando a su banco, por ejemplo) para engañarle y que usted mismo les entregue su contraseña. Nunca haga clic en enlaces sospechosos.',
        image: "phishing-alert",
      },
      {
        type: "multipleChoice",
        title: "Identificar el Peligro",
        question:
          'Recibe un email de su banco pidiendo su contraseña para "verificar su cuenta". ¿Qué debe hacer?',
        options: [
          { id: "a", text: "Hacer clic en el enlace y poner la contraseña." },
          {
            id: "b",
            text: "Ignorar y borrar el correo, ya que los bancos nunca piden la contraseña.",
          },
          { id: "c", text: "Responder al correo con sus datos." },
        ],
        correctAnswer: "b",
        feedbackCorrect:
          "¡Decisión acertada! Las entidades legítimas NUNCA le pedirán su contraseña por correo.",
        feedbackIncorrect:
          "¡Cuidado! Esa es una táctica de phishing. Nunca debe dar su contraseña a través de un enlace en un correo.",
      },
      {
        type: "instructional",
        title: "Capa Extra de Seguridad: 2FA",
        content:
          "La Autenticación de Dos Factores (2FA) añade una segunda capa de seguridad. Además de su contraseña, necesitará un código de un solo uso (enviado a su móvil, por ejemplo) para acceder. Es como tener dos cerraduras en su puerta.",
        image: "two-factor-auth",
      },
      {
        type: "multipleChoice",
        title: "Concepto de 2FA",
        question: "¿Para qué sirve la Autenticación de Dos Factores (2FA)?",
        options: [
          { id: "a", text: "Para tener dos contraseñas en lugar de una." },
          {
            id: "b",
            text: "Para añadir un paso de verificación extra y aumentar la seguridad.",
          },
          { id: "c", text: "Para que el acceso sea más rápido." },
        ],
        correctAnswer: "b",
        feedbackCorrect:
          "¡Exacto! 2FA añade una capa crucial de seguridad a sus cuentas.",
        feedbackIncorrect:
          "No es del todo correcto. 2FA añade un paso de seguridad adicional, no una segunda contraseña.",
      },
      {
        type: "instructional",
        title: "Gestión Inteligente de Contraseñas",
        content:
          "Usar la misma contraseña en varios sitios es muy arriesgado. Si un sitio es hackeado, todas sus cuentas quedan expuestas. Considere usar un gestor de contraseñas para crear y guardar claves únicas y seguras para cada servicio.",
        image: "password-manager",
        video:
          "https://videos.pexels.com/video-files/5359364/5359364-hd_1280_720_24fps.mp4",
      },
      {
        type: "instructional",
        title: "¡Nivel de Seguridad Experto!",
        content:
          "Ha completado el módulo de seguridad. Ahora conoce las claves para proteger su vida digital. ¡Ha obtenido el logro de Experto en Seguridad!",
        image: "security-shield",
      },
    ],
  },
];
