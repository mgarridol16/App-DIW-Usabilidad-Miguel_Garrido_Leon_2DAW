#!/bin/bash

# Script de despliegue para el servidor
# Ejecutar en el servidor después de conectarse

echo "=== Iniciando despliegue ==="

# 1. Clonar o actualizar el repositorio
if [ -d "App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW" ]; then
    echo "Actualizando repositorio existente..."
    cd App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW
    git pull origin main
else
    echo "Clonando repositorio..."
    git clone https://github.com/mgarridol16/App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW.git
    cd App-DIW-Usabilidad-Miguel_Garrido_Leon_2DAW
fi

# 2. Instalar Node.js si no está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js no encontrado. Instalando..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 3. Instalar dependencias
echo "Instalando dependencias..."
npm install

# 4. Crear archivo .env
echo "Configurando variables de entorno..."
if [ ! -f ".env.local" ]; then
    read -p "Ingresa tu GEMINI_API_KEY: " api_key
    echo "VITE_GEMINI_API_KEY=$api_key" > .env
fi

# 5. Construir la aplicación
echo "Construyendo aplicación..."
npm run build

# 6. Configurar permisos
echo "Configurando permisos..."
chmod -R 755 dist

echo "=== Despliegue completado ==="
echo "Los archivos están en: $(pwd)/dist"
echo ""
echo "Ahora necesitas configurar tu servidor web (nginx/apache) para servir estos archivos."

