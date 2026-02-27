# Guía de Despliegue en el Servidor

## 1. Conectarse al servidor

```bash
ssh -p 2247 diego@www.servidorgp.somosdelprieto.com
```

## 2. Clonar el repositorio

```bash
git clone https://github.com/mgarridol16/App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW.git
cd App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW
```

## 3. Instalar dependencias de Node.js

Si Node.js no está instalado en el servidor:
```bash
# Verificar si Node.js está instalado
node -v

# Si no está instalado (Ubuntu/Debian):
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 4. Instalar dependencias del proyecto

```bash
npm install
```

## 5. Configurar variables de entorno

Crea un archivo `.env` con tu API key de Gemini:
```bash
echo "GEMINI_API_KEY=tu_api_key_aqui" > .env
```

## 6. Construir la aplicación

```bash
npm run build
```

Esto creará una carpeta `dist` con los archivos optimizados.

## 7. Configurar el servidor web

### Opción A: Nginx (Recomendado)

1. Instalar nginx si no está instalado:
```bash
sudo apt-get update
sudo apt-get install nginx
```

2. Crear configuración para tu sitio:
```bash
sudo nano /etc/nginx/sites-available/mi-app
```

3. Añadir esta configuración:
```nginx
server {
    listen 80;
    server_name www.servidorgp.somosdelprieto.com;

    root /home/diego/App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. Habilitar el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/mi-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Opción B: Apache

1. Instalar Apache si no está instalado:
```bash
sudo apt-get update
sudo apt-get install apache2
```

2. Crear configuración:
```bash
sudo nano /etc/apache2/sites-available/mi-app.conf
```

3. Añadir:
```apache
<VirtualHost *:80>
    DocumentRoot /home/diego/App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW/dist

    <Directory /home/diego/App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # Para React Router
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

4. Habilitar módulos y sitio:
```bash
sudo a2enmod rewrite
sudo a2ensite mi-app
sudo systemctl restart apache2
```

## 8. Verificar que funciona

Abre tu navegador y ve a:
```
http://www.servidorgp.somosdelprieto.com
```

## Actualizaciones futuras

Cuando hagas cambios en el código:
```bash
cd App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW
git pull origin main
npm install
npm run build
```

## Solución de problemas

- **Permisos**: Si hay problemas de permisos, ejecuta:
  ```bash
  chmod -R 755 dist
  ```

- **Puerto ocupado**: Verifica qué está usando el puerto 80:
  ```bash
  sudo netstat -tulpn | grep :80
  ```

- **Ver logs de nginx**:
  ```bash
  sudo tail -f /var/log/nginx/error.log
  ```

- **Ver logs de Apache**:
  ```bash
  sudo tail -f /var/log/apache2/error.log
  ```
