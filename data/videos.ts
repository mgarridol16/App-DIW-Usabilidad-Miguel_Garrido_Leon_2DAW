/**
 * Metadata de los vídeos del proyecto académico
 * Portal de Capacitación Digital - Práctica de Usabilidad
 * Módulo: Diseño de Interfaces Web - 2º DAW
 */

export interface VideoData {
  id: number;
  title: string;
  description: string;
  src: string;
  duration?: string; // Duración estimada
}

export interface VideoCategory {
  title: string;
  description: string;
  icon: string;
  videos: VideoData[];
}

export const demoVideo: VideoData = {
  id: 0,
  title: "Demostración General de la Aplicación",
  description:
    "Recorrido completo por las funcionalidades principales del Portal de Capacitación Digital. Se muestra el flujo de usuario desde el registro, navegación por lecciones, sistema de gamificación con vidas, asistente IA con Gemini, visualización de logros, y características de accesibilidad implementadas.",
  src: "/videos/demo/demo-aplicacion.mp4",
  duration: "3-4 min",
};

export const responsiveVideos: VideoData[] = [
  {
    id: 1,
    title: "Responsive 1: Adaptación del Header en dispositivos móviles",
    description:
      "Análisis del problema de overflow del header en pantallas pequeñas. Implementación de breakpoints con media queries y uso de flexbox para reordenar elementos. Solución con botones circulares y ocultación selectiva de información secundaria en móviles.",
    src: "/videos/responsive/responsive-01.mp4",
    duration: "1-2 min",
  },
  {
    id: 2,
    title: "Responsive 2: Grid de lecciones adaptativo",
    description:
      "Problema detectado: grid de 3 columnas que provoca scroll horizontal en tablets. Solución mediante CSS Grid con auto-fit y minmax() para ajuste automático. Implementación de diferentes layouts: 3 columnas en desktop, 2 en tablet, 1 en móvil.",
    src: "/videos/responsive/responsive-02.mp4",
    duration: "1-2 min",
  },
  {
    id: 3,
    title: "Responsive 3: Formularios de login y registro",
    description:
      "Ajuste de formularios para mejorar la experiencia en dispositivos táctiles. Incremento del tamaño de campos de entrada, espaciado entre elementos, y optimización de la validación visual. Adaptación de botones para cumplir con el área mínima de toque (44x44px).",
    src: "/videos/responsive/responsive-03.mp4",
    duration: "1-2 min",
  },
  {
    id: 4,
    title: "Responsive 4: Navegación y menú hamburguesa",
    description:
      "Transformación de la navegación horizontal en un menú vertical colapsable para móviles. Implementación de transiciones suaves y manejo del estado del menú. Accesibilidad del botón hamburguesa con ARIA attributes.",
    src: "/videos/responsive/responsive-04.mp4",
    duration: "1-2 min",
  },
  {
    id: 5,
    title: "Responsive 5: Tarjetas de contenido y espaciado",
    description:
      "Problema de márgenes inconsistentes en diferentes resoluciones. Implementación de un sistema de espaciado responsive usando variables CSS y clases Bootstrap adaptativas (p-2, p-md-3, p-lg-5). Mejora de la legibilidad en todos los dispositivos.",
    src: "/videos/responsive/responsive-05.mp4",
    duration: "1-2 min",
  },
  {
    id: 6,
    title: "Responsive 6: Imágenes y media fluidos",
    description:
      "Optimización de imágenes para evitar desbordamiento. Uso de max-width: 100% y height: auto. Implementación de imágenes responsive con srcset para servir diferentes resoluciones según el dispositivo. Mejora del rendimiento en móviles.",
    src: "/videos/responsive/responsive-06.mp4",
    duration: "1-2 min",
  },
  {
    id: 7,
    title: "Responsive 7: Tipografía escalable",
    description:
      "Ajuste de tamaños de fuente para mejorar la legibilidad. Implementación de escalas tipográficas responsive usando rem y clamp(). Transición suave entre tamaños sin saltos bruscos. Cumplimiento de contraste mínimo en todas las resoluciones.",
    src: "/videos/responsive/responsive-07.mp4",
    duration: "1-2 min",
  },
  {
    id: 8,
    title: "Responsive 8: Dashboard y gráficos de progreso",
    description:
      "Adaptación del dashboard de usuario con gráficos y estadísticas. Reorganización de columnas en layouts móviles. Implementación de scroll horizontal controlado para tablas de logros. Mejora de la visualización de barras de progreso.",
    src: "/videos/responsive/responsive-08.mp4",
    duration: "1-2 min",
  },
  {
    id: 9,
    title: "Responsive 9: Modales y overlays",
    description:
      "Problema de modales que ocupan toda la pantalla en móviles. Ajuste de márgenes, padding y comportamiento de scroll. Implementación de modales fullscreen en móviles y centrados en desktop. Mejora del botón de cierre y área de toque.",
    src: "/videos/responsive/responsive-09.mp4",
    duration: "1-2 min",
  },
  {
    id: 10,
    title: "Responsive 10: Testing en múltiples dispositivos",
    description:
      "Proceso de testing responsive usando Chrome DevTools, Firefox Responsive Design Mode y dispositivos físicos reales. Validación en diferentes navegadores (Chrome, Firefox, Safari, Edge). Identificación de problemas específicos de iOS y Android.",
    src: "/videos/responsive/responsive-10.mp4",
    duration: "1-2 min",
  },
];

export const usabilidadVideos: VideoData[] = [
  {
    id: 11,
    title: "Usabilidad 1: Claridad en la navegación principal",
    description:
      "Análisis del problema de navegación confusa sin indicadores visuales claros. Aplicación del principio de visibilidad del estado del sistema (Nielsen). Implementación de breadcrumbs, indicadores de página actual y navegación consistente en toda la aplicación.",
    src: "/videos/usabilidad/usabilidad-01.mp4",
    duration: "1-2 min",
  },
  {
    id: 12,
    title: "Usabilidad 2: Feedback visual en interacciones",
    description:
      "Mejora del feedback en botones, enlaces y elementos interactivos. Implementación de estados hover, active y focus claramente diferenciados. Añadido de animaciones sutiles y cambios de cursor. Cumplimiento del principio de visibilidad del estado del sistema.",
    src: "/videos/usabilidad/usabilidad-02.mp4",
    duration: "1-2 min",
  },
  {
    id: 13,
    title: "Usabilidad 3: Prevención de errores en formularios",
    description:
      "Problema de errores frecuentes en la entrada de datos. Implementación de validación en tiempo real con mensajes claros. Añadido de restricciones de formato, sugerencias automáticas y confirmaciones para acciones críticas. Principio de prevención de errores.",
    src: "/videos/usabilidad/usabilidad-03.mp4",
    duration: "1-2 min",
  },
  {
    id: 14,
    title: "Usabilidad 4: Consistencia en patrones de diseño",
    description:
      "Unificación de patrones de diseño en toda la aplicación. Estandarización de botones, colores, iconografía y espaciados. Creación de un sistema de diseño coherente. Aplicación del principio de consistencia y estándares (Nielsen).",
    src: "/videos/usabilidad/usabilidad-04.mp4",
    duration: "1-2 min",
  },
  {
    id: 15,
    title: "Usabilidad 5: Reducción de carga cognitiva",
    description:
      "Análisis de sobrecarga de información en pantallas clave. Simplificación de interfaces mediante jerarquía visual, agrupación de contenido relacionado y uso de progressive disclosure. Aplicación del principio de reconocimiento vs recuerdo.",
    src: "/videos/usabilidad/usabilidad-05.mp4",
    duration: "1-2 min",
  },
  {
    id: 16,
    title: "Usabilidad 6: Mensajes de error comprensibles",
    description:
      "Problema de mensajes de error técnicos incomprensibles para usuarios. Reescritura de mensajes en lenguaje claro, indicando qué salió mal y cómo solucionarlo. Implementación de ayuda contextual. Principio de ayuda y documentación.",
    src: "/videos/usabilidad/usabilidad-06.mp4",
    duration: "1-2 min",
  },
  {
    id: 17,
    title: "Usabilidad 7: Flexibilidad y eficiencia de uso",
    description:
      "Implementación de atajos de teclado para usuarios expertos. Añadido de funciones de autocompletado y sugerencias inteligentes. Personalización de preferencias de usuario. Balance entre usuarios novatos y expertos.",
    src: "/videos/usabilidad/usabilidad-07.mp4",
    duration: "1-2 min",
  },
  {
    id: 18,
    title: "Usabilidad 8: Diseño minimalista y estético",
    description:
      "Eliminación de elementos visuales innecesarios y ruido visual. Aplicación del principio de diseño minimalista. Mejora de la jerarquía visual con uso efectivo de whitespace, contraste y tipografía. Balance entre funcionalidad y estética.",
    src: "/videos/usabilidad/usabilidad-08.mp4",
    duration: "1-2 min",
  },
  {
    id: 19,
    title: "Usabilidad 9: Control y libertad del usuario",
    description:
      "Implementación de funciones de deshacer/rehacer. Añadido de confirmaciones antes de acciones destructivas. Posibilidad de cancelar procesos en curso. Aplicación del principio de control y libertad del usuario (Nielsen).",
    src: "/videos/usabilidad/usabilidad-09.mp4",
    duration: "1-2 min",
  },
  {
    id: 20,
    title: "Usabilidad 10: Testing con usuarios reales",
    description:
      "Proceso de testing de usabilidad con usuarios representativos. Observación de tareas clave (registro, completar lección, consultar logros). Análisis de métricas de usabilidad: tasa de éxito, tiempo de tarea, satisfacción. Iteraciones de mejora basadas en feedback.",
    src: "/videos/usabilidad/usabilidad-10.mp4",
    duration: "1-2 min",
  },
];

export const accesibilidadVideos: VideoData[] = [
  {
    id: 21,
    title: "Accesibilidad 1: Navegación por teclado",
    description:
      "Problema detectado: elementos interactivos no accesibles mediante teclado. Implementación de tabindex apropiado, orden lógico de tab, y estilos de focus visibles. Cumplimiento del criterio WCAG 2.1.1 (Nivel A). Testing con navegación solo por teclado.",
    src: "/videos/accesibilidad/accesibilidad-01.mp4",
    duration: "1-2 min",
  },
  {
    id: 22,
    title: "Accesibilidad 2: Contraste de color adecuado",
    description:
      "Análisis de ratios de contraste en textos y elementos UI. Uso de herramientas como Contrast Checker para validar cumplimiento de WCAG 2.1.4.3 (Nivel AA, ratio 4.5:1 para texto normal). Ajuste de paleta de colores manteniendo la identidad visual.",
    src: "/videos/accesibilidad/accesibilidad-02.mp4",
    duration: "1-2 min",
  },
  {
    id: 23,
    title: "Accesibilidad 3: Semántica HTML correcta",
    description:
      "Problema de uso excesivo de divs no semánticos. Implementación de elementos HTML5 apropiados: header, nav, main, article, section, footer. Mejora de la estructura para lectores de pantalla. Cumplimiento de WCAG 1.3.1 (Nivel A).",
    src: "/videos/accesibilidad/accesibilidad-03.mp4",
    duration: "1-2 min",
  },
  {
    id: 24,
    title: "Accesibilidad 4: ARIA labels y roles",
    description:
      "Implementación de atributos ARIA para mejorar la experiencia con tecnologías asistivas. Uso de aria-label, aria-labelledby, aria-describedby. Añadido de roles ARIA donde HTML nativo no es suficiente. Validación con NVDA y VoiceOver.",
    src: "/videos/accesibilidad/accesibilidad-04.mp4",
    duration: "1-2 min",
  },
  {
    id: 25,
    title: "Accesibilidad 5: Textos alternativos en imágenes",
    description:
      "Auditoría de imágenes sin alt text apropiado. Implementación de descripciones significativas en imágenes informativas. Uso de alt vacío para imágenes decorativas. Cumplimiento de WCAG 1.1.1 (Nivel A). Mejora de la experiencia para usuarios con discapacidad visual.",
    src: "/videos/accesibilidad/accesibilidad-05.mp4",
    duration: "1-2 min",
  },
  {
    id: 26,
    title: "Accesibilidad 6: Formularios accesibles",
    description:
      "Asociación correcta de labels con inputs mediante atributo for/id. Implementación de mensajes de error descriptivos con aria-invalid y aria-describedby. Agrupación lógica con fieldset y legend. Cumplimiento de WCAG 3.3.2 (Nivel A).",
    src: "/videos/accesibilidad/accesibilidad-06.mp4",
    duration: "1-2 min",
  },
  {
    id: 27,
    title: "Accesibilidad 7: Gestión del foco y skip links",
    description:
      "Implementación de skip links para saltar al contenido principal. Gestión apropiada del foco en modales y componentes dinámicos. Prevención de trampas de teclado. Cumplimiento de WCAG 2.4.1 y 2.4.3 (Nivel A).",
    src: "/videos/accesibilidad/accesibilidad-07.mp4",
    duration: "1-2 min",
  },
  {
    id: 28,
    title: "Accesibilidad 8: Contenido multimedia accesible",
    description:
      "Añadido de controles accesibles en elementos de vídeo. Implementación de transcripciones y subtítulos cuando proceda. Posibilidad de pausar contenido en movimiento automático. Cumplimiento de WCAG 1.2.1 y 2.2.2 (Nivel A).",
    src: "/videos/accesibilidad/accesibilidad-08.mp4",
    duration: "1-2 min",
  },
  {
    id: 29,
    title: "Accesibilidad 9: Diseño adaptable a zoom 200%",
    description:
      "Testing de la aplicación con zoom del navegador al 200%. Solución de problemas de overflow y contenido oculto. Uso de unidades relativas (rem, em) en lugar de píxeles fijos. Cumplimiento de WCAG 1.4.4 (Nivel AA).",
    src: "/videos/accesibilidad/accesibilidad-09.mp4",
    duration: "1-2 min",
  },
  {
    id: 30,
    title: "Accesibilidad 10: Auditoría con herramientas automatizadas",
    description:
      "Proceso completo de auditoría de accesibilidad usando Lighthouse, axe DevTools y WAVE. Análisis de resultados e identificación de issues. Priorización de correcciones según impacto. Validación final y generación de reporte de conformidad WCAG 2.1 Nivel AA.",
    src: "/videos/accesibilidad/accesibilidad-10.mp4",
    duration: "1-2 min",
  },
];

export const videoCategories: VideoCategory[] = [
  {
    title: "🎬 Demostración de la Aplicación",
    description:
      "Vídeo general mostrando el funcionamiento completo del Portal de Capacitación Digital, incluyendo todas las características implementadas.",
    icon: "fas fa-play-circle",
    videos: [demoVideo],
  },
  {
    title: "📱 Estudio de Diseño Responsive",
    description:
      "Análisis de 10 problemas de diseño responsive encontrados durante el desarrollo y las soluciones implementadas para garantizar una experiencia óptima en todos los dispositivos.",
    icon: "fas fa-mobile-alt",
    videos: responsiveVideos,
  },
  {
    title: "🧠 Estudio de Usabilidad",
    description:
      "Evaluación de 10 aspectos de usabilidad basados en los principios heurísticos de Nielsen y estándares ISO 9241, mostrando mejoras implementadas para optimizar la experiencia de usuario.",
    icon: "fas fa-users",
    videos: usabilidadVideos,
  },
  {
    title: "♿ Estudio de Accesibilidad",
    description:
      "Documentación de 10 mejoras de accesibilidad implementadas según los estándares WCAG 2.1 Nivel AA, garantizando que la aplicación sea usable por personas con diferentes capacidades.",
    icon: "fas fa-universal-access",
    videos: accesibilidadVideos,
  },
];
