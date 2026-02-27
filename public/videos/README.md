# Carpeta de Vídeos del Proyecto

Esta carpeta contiene todos los vídeos evidenciales del proyecto académico organizados por categorías.

## 📁 Estructura de Carpetas

```
videos/
├── demo/                  # Vídeo demo de la aplicación (1 vídeo)
├── responsive/            # Problemas y soluciones de diseño responsive (10 vídeos)
├── usabilidad/           # Estudios de usabilidad (10 vídeos)
└── accesibilidad/        # Estudios de accesibilidad (10 vídeos)
```

## 📹 Formato de Vídeos

### Especificaciones Técnicas Recomendadas:
- **Formato:** MP4 (H.264 codec)
- **Resolución:** 1280x720 (720p) o 1920x1080 (1080p)
- **Peso:** Entre 5-20 MB por vídeo
- **Duración:** 1-3 minutos (académico y conciso)
- **Bitrate:** 2-5 Mbps

### Nomenclatura de Archivos:
- **Demo:** `demo-aplicacion.mp4`
- **Responsive:** `responsive-01.mp4` a `responsive-10.mp4`
- **Usabilidad:** `usabilidad-01.mp4` a `usabilidad-10.mp4`
- **Accesibilidad:** `accesibilidad-01.mp4` a `accesibilidad-10.mp4`

## 🚀 Cómo Subir los Vídeos

### En Desarrollo Local:
1. Coloca los archivos MP4 en las carpetas correspondientes siguiendo la nomenclatura
2. Los vídeos se cargarán automáticamente en la aplicación

### En Producción (Servidor):
1. Después de hacer `npm run build`, copia la carpeta `videos/` al directorio `dist/`:
   ```bash
   cp -r public/videos dist/
   ```
2. O asegúrate de que el build de Vite copia automáticamente estos archivos

### Alternativa con Git:
Si los vídeos son pequeños (<50MB cada uno), puedes:
```bash
git add public/videos/**/*.mp4
git commit -m "Añadir vídeos del proyecto"
git push
```

⚠️ **IMPORTANTE:** Si los vídeos pesan mucho, considera usar Git LFS (Large File Storage):
```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
git add public/videos/**/*.mp4
git commit -m "Añadir vídeos con Git LFS"
git push
```

## 🎬 Contenido de los Vídeos

### 1. Demo General (1 vídeo)
Demostración completa de la funcionalidad de la aplicación.

### 2. Responsive Design (10 vídeos)
Cada vídeo debe mostrar:
- Un problema específico de responsive encontrado
- La solución implementada
- Pruebas en diferentes dispositivos/tamaños

### 3. Usabilidad (10 vídeos)
Cada vídeo debe documentar:
- Problema de usabilidad identificado
- Análisis del impacto en el usuario
- Solución implementada y mejoras

### 4. Accesibilidad (10 vídeos)
Cada vídeo debe cubrir:
- Problema de accesibilidad detectado
- Estándares WCAG relacionados
- Solución aplicada y validación

## 📝 Notas

- Los vídeos NO se suben al repositorio por defecto (ver `.gitignore`)
- Edita el archivo `data/videos.ts` para actualizar títulos y descripciones
- La aplicación usa HTML5 `<video>` nativo, sin dependencias externas
