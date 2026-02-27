# Usuarios de Prueba

Esta aplicación cuenta con usuarios fijos que están disponibles sin importar dónde se despliegue la aplicación.

## Credenciales de Acceso

### Usuario Regular
- **Usuario:** `diego`
- **Contraseña:** `Prieto*2`
- **Nombre:** Diego
- **Email:** diego@capacitacion.com
- **Rol:** user

### Usuario Administrador
- **Usuario:** `admin`
- **Contraseña:** `Prieto*2`
- **Nombre:** Administrador
- **Email:** admin@capacitacion.com
- **Rol:** admin

## Cómo Iniciar Sesión

1. Accede a la página de login de la aplicación
2. En el campo "Usuario o Correo Electrónico", escribe uno de los usuarios:
   - `diego`
   - `admin`
   - O sus correos: `diego@capacitacion.com` o `admin@capacitacion.com`
3. En el campo "Contraseña", escribe: `Prieto*2`
4. Haz clic en "Iniciar Sesión"

## Notas Técnicas

- Los usuarios están definidos en el archivo `data/users.ts`
- La validación se realiza localmente en el cliente
- Estos usuarios funcionarán independientemente del entorno de despliegue (desarrollo, producción, etc.)
- La contraseña distingue mayúsculas y minúsculas
- El nombre de usuario NO distingue mayúsculas y minúsculas
