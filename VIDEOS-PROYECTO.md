# 📹 Guía Rápida: Página de Vídeos del Proyecto

## ✅ ¿Qué se ha implementado?

Se ha añadido una nueva sección completa a la aplicación para mostrar los 31 vídeos evidenciales del proyecto académico.

### Archivos Creados:

1. **`data/videos.ts`** - Metadata de los 31 vídeos con descripciones académicas profesionales
2. **`components/ProjectVideos.tsx`** - Componente con diseño de acordeón para organizar los vídeos
3. **`public/videos/`** - Estructura de carpetas para almacenar los archivos MP4
4. **READMEs** - Instrucciones en cada carpeta de vídeos

### Archivos Modificados:

1. **`components/Header.tsx`** - Añadido botón "Vídeos del Proyecto" (icono de vídeo, color amarillo)
2. **`App.tsx`** - Añadida ruta `projectvideos` al sistema de navegación

---

## 🎬 Estructura de los Vídeos

La página está organizada en **4 secciones con acordeón**:

### 1. 🎬 Demo de la Aplicación (1 vídeo)
- Archivo: `public/videos/demo/demo-aplicacion.mp4`

### 2. 📱 Estudio de Diseño Responsive (10 vídeos)
- Archivos: `public/videos/responsive/responsive-01.mp4` hasta `responsive-10.mp4`

### 3. 🧠 Estudio de Usabilidad (10 vídeos)
- Archivos: `public/videos/usabilidad/usabilidad-01.mp4` hasta `usabilidad-10.mp4`

### 4. ♿ Estudio de Accesibilidad (10 vídeos)
- Archivos: `public/videos/accesibilidad/accesibilidad-01.mp4` hasta `accesibilidad-10.mp4`

---

## 📂 Cómo Subir los Vídeos

### Paso 1: Grabar los vídeos
- **Formato:** MP4 (H.264)
- **Resolución recomendada:** 1280x720 o 1920x1080
- **Duración:** 1-3 minutos cada uno
- **Peso:** 5-20 MB idealmente

### Paso 2: Nombrar los archivos correctamente
Sigue exactamente la nomenclatura:
```
demo-aplicacion.mp4
responsive-01.mp4, responsive-02.mp4, ..., responsive-10.mp4
usabilidad-01.mp4, usabilidad-02.mp4, ..., usabilidad-10.mp4
accesibilidad-01.mp4, accesibilidad-02.mp4, ..., accesibilidad-10.mp4
```

### Paso 3: Colocar los archivos en las carpetas
```
public/videos/
├── demo/demo-aplicacion.mp4
├── responsive/responsive-01.mp4 ... responsive-10.mp4
├── usabilidad/usabilidad-01.mp4 ... usabilidad-10.mp4
└── accesibilidad/accesibilidad-01.mp4 ... accesibilidad-10.mp4
```

### Paso 4: Probar en desarrollo
```bash
npm run dev
```
Navega a "Vídeos del Proyecto" desde el header y verifica que se cargan correctamente.

---

## 🚀 Despliegue en Servidor

### Opción 1: Build local y subir al servidor
```bash
npm run build
```

Los archivos de `public/videos/` se copiarán automáticamente a `dist/videos/` durante el build.

Luego sube todo el contenido de `dist/` al servidor.

### Opción 2: Build en el servidor
Si haces build directamente en el servidor, asegúrate de que los vídeos estén en `public/videos/` antes de ejecutar `npm run build`.

### Verificación en producción:
1. Accede a tu dominio
2. Inicia sesión
3. Click en el botón amarillo con icono de vídeo en el header
4. Verifica que se muestran los 31 vídeos

---

## 🎨 Características Implementadas

### Diseño:
- ✅ Acordeón con 4 secciones colapsables
- ✅ Primera sección abierta por defecto
- ✅ Diseño responsive (funciona en móviles, tablets y desktop)
- ✅ Tarjetas de vídeo con título, descripción y duración estimada

### Funcionalidad:
- ✅ Reproductor HTML5 nativo con controles
- ✅ Detección automática si falta un vídeo (muestra mensaje)
- ✅ Spinner de carga mientras se carga el vídeo
- ✅ Fallback visual si el vídeo no existe

### Accesibilidad:
- ✅ ARIA labels en todos los elementos interactivos
- ✅ Navegación por teclado
- ✅ Mensajes descriptivos para lectores de pantalla
- ✅ Controles nativos del navegador (accesibles)

---

## 📝 Personalizar Descripciones

Edita el archivo [`data/videos.ts`](data/videos.ts) para:
- Cambiar títulos de vídeos
- Actualizar descripciones
- Modificar duraciones estimadas

Ejemplo:
```typescript
{
  id: 1,
  title: "Tu Título Personalizado",
  description: "Tu descripción detallada del contenido del vídeo",
  src: "/videos/responsive/responsive-01.mp4",
  duration: "2 min"
}
```

---

## 🔧 Solución de Problemas

### Los vídeos no se cargan:
1. Verifica que los archivos están en `public/videos/` con los nombres correctos
2. Revisa la consola del navegador (F12) en busca de errores
3. Asegúrate que los archivos son MP4 con codec H.264

### No veo el botón en el header:
- Solo aparece cuando el usuario está logueado
- Es el botón amarillo con icono de vídeo

### Los vídeos no aparecen en producción:
- Verifica que ejecutaste `npm run build` después de añadir los vídeos
- Confirma que la carpeta `dist/videos/` contiene todos los archivos
- Revisa los permisos de archivos en el servidor: `chmod -R 755 dist/videos`

---

## 📊 Estado Actual

✅ Estructura completa implementada
✅ Navegación funcionando
✅ Diseño responsive
✅ Accesibilidad implementada
⏳ **Pendiente:** Subir los 31 archivos MP4 a las carpetas correspondientes

---

## 🎓 Contexto Académico

Esta funcionalidad cumple con los requisitos del ejercicio de:
- **Diseño de Interfaces Web - 2º DAW**
- **Práctica de Usabilidad**

Documenta:
- 1 vídeo demo general
- 10 problemas/soluciones responsive
- 10 casos de usabilidad
- 10 casos de accesibilidad

**Total: 31 vídeos evidenciales**
