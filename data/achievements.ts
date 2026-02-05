
import type { Achievement } from '../types';

export const achievements: Achievement[] = [
    {
        id: 'comunicador-digital',
        title: 'Comunicador Digital',
        description: 'Ha completado con éxito el módulo de comunicación por mensajería instantánea.',
        icon: 'fas fa-comments'
    },
    {
        id: 'editor-documentos',
        title: 'Editor de Documentos',
        description: 'Sabe crear, formatear y guardar documentos de texto básicos.',
        icon: 'fas fa-file-alt'
    },
    {
        id: 'fotografo-principiante',
        title: 'Fotógrafo Principiante',
        description: 'Ha aprendido los conceptos básicos para usar la cámara y capturar momentos.',
        icon: 'fas fa-camera-retro'
    },
    {
        id: 'conector-global',
        title: 'Conector Global',
        description: 'Domina el arte de las videollamadas para conectar con personas en cualquier lugar.',
        icon: 'fas fa-globe'
    },
    {
        id: 'experto-en-seguridad',
        title: 'Experto en Seguridad',
        description: 'Domina los principios fundamentales para crear y gestionar contraseñas seguras.',
        icon: 'fas fa-user-shield'
    }
];
