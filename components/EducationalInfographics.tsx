import React from "react";

interface InfographicProps {
  type: string;
}

export const EducationalInfographics: React.FC<InfographicProps> = ({
  type,
}) => {
  switch (type) {
    case "whatsapp-checks":
      return (
        <svg
          viewBox="0 0 800 300"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo */}
          <rect width="800" height="300" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="40"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Estado de Entrega en WhatsApp
          </text>

          {/* Un check gris - Enviado */}
          <g transform="translate(80, 100)">
            <rect
              width="180"
              height="140"
              rx="10"
              fill="white"
              stroke="#dee2e6"
              strokeWidth="2"
            />
            <text
              x="90"
              y="35"
              fontSize="14"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Un check gris
            </text>
            <text
              x="90"
              y="85"
              fontSize="40"
              textAnchor="middle"
              fill="#999999"
            >
              ✓
            </text>
            <text
              x="90"
              y="125"
              fontSize="13"
              textAnchor="middle"
              fill="#6c757d"
            >
              Mensaje enviado
            </text>
          </g>

          {/* Dos checks grises - Entregado */}
          <g transform="translate(310, 100)">
            <rect
              width="180"
              height="140"
              rx="10"
              fill="white"
              stroke="#dee2e6"
              strokeWidth="2"
            />
            <text
              x="90"
              y="35"
              fontSize="14"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Dos checks grises
            </text>
            <text
              x="90"
              y="88"
              fontSize="40"
              textAnchor="middle"
              fill="#999999"
            >
              ✓✓
            </text>
            <text
              x="90"
              y="125"
              fontSize="13"
              textAnchor="middle"
              fill="#6c757d"
            >
              Mensaje entregado
            </text>
          </g>

          {/* Dos checks azules - Leído */}
          <g transform="translate(540, 100)">
            <rect
              width="180"
              height="140"
              rx="10"
              fill="white"
              stroke="#dee2e6"
              strokeWidth="2"
            />
            <text
              x="90"
              y="35"
              fontSize="14"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Dos checks azules
            </text>
            <text
              x="90"
              y="88"
              fontSize="40"
              textAnchor="middle"
              fill="#0d6efd"
            >
              ✓✓
            </text>
            <text
              x="90"
              y="125"
              fontSize="13"
              textAnchor="middle"
              fill="#6c757d"
            >
              Mensaje leído
            </text>
          </g>
        </svg>
      );

    case "password-strength":
      return (
        <svg
          viewBox="0 0 800 350"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo */}
          <rect width="800" height="350" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="40"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Contraseña Débil vs Fuerte
          </text>

          {/* Contraseña débil - ROJA */}
          <g transform="translate(50, 80)">
            {/* Caja roja */}
            <rect
              width="300"
              height="220"
              rx="10"
              fill="#ffe5e5"
              stroke="#dc3545"
              strokeWidth="3"
            />

            {/* Icono X rojo */}
            <circle cx="280" cy="30" r="25" fill="#dc3545" />
            <text
              x="280"
              y="40"
              fontSize="32"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              ✗
            </text>

            <text
              x="150"
              y="85"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill="#dc3545"
            >
              DÉBIL
            </text>

            {/* Contraseña ejemplo */}
            <rect
              x="20"
              y="110"
              width="260"
              height="50"
              rx="5"
              fill="white"
              stroke="#dc3545"
              strokeWidth="2"
            />
            <text
              x="150"
              y="142"
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
              fill="#dc3545"
            >
              Maria123
            </text>

            {/* Problemas */}
            <circle cx="35" cy="190" r="5" fill="#dc3545" />
            <text x="50" y="195" fontSize="13" fill="#495057">
              Solo letras y números
            </text>

            <circle cx="35" cy="220" r="5" fill="#dc3545" />
            <text x="50" y="225" fontSize="13" fill="#495057">
              Muy corta (8 caracteres)
            </text>

            <circle cx="35" cy="250" r="5" fill="#dc3545" />
            <text x="50" y="255" fontSize="13" fill="#495057">
              Contiene nombre/fecha
            </text>
          </g>

          {/* Contraseña fuerte - VERDE */}
          <g transform="translate(450, 80)">
            {/* Caja verde */}
            <rect
              width="300"
              height="220"
              rx="10"
              fill="#e5f5e5"
              stroke="#198754"
              strokeWidth="3"
            />

            {/* Icono check verde */}
            <circle cx="280" cy="30" r="25" fill="#198754" />
            <text
              x="280"
              y="42"
              fontSize="28"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              ✓
            </text>

            <text
              x="150"
              y="85"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill="#198754"
            >
              FUERTE
            </text>

            {/* Contraseña ejemplo */}
            <rect
              x="20"
              y="110"
              width="260"
              height="50"
              rx="5"
              fill="white"
              stroke="#198754"
              strokeWidth="2"
            />
            <text
              x="150"
              y="142"
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
              fill="#198754"
            >
              M@ri4_R0c4!
            </text>

            {/* Fortalezas */}
            <circle cx="35" cy="190" r="5" fill="#198754" />
            <text x="50" y="195" fontSize="13" fill="#495057">
              Mayúsculas, minúsculas
            </text>

            <circle cx="35" cy="220" r="5" fill="#198754" />
            <text x="50" y="225" fontSize="13" fill="#495057">
              Números y símbolos
            </text>

            <circle cx="35" cy="250" r="5" fill="#198754" />
            <text x="50" y="255" fontSize="13" fill="#495057">
              12+ caracteres
            </text>
          </g>
        </svg>
      );

    case "two-factor-auth":
      return (
        <svg
          viewBox="0 0 800 320"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo */}
          <rect width="800" height="320" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="40"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Autenticación de Dos Factores (2FA)
          </text>

          {/* Paso 1: Contraseña */}
          <g transform="translate(50, 80)">
            <circle cx="40" cy="40" r="40" fill="#0d6efd" />
            <text
              x="40"
              y="55"
              fontSize="36"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              1
            </text>

            <rect
              x="10"
              y="100"
              width="60"
              height="80"
              rx="5"
              fill="white"
              stroke="#0d6efd"
              strokeWidth="2"
            />
            <text
              x="40"
              y="125"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Usuario
            </text>
            <text
              x="40"
              y="150"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Contraseña
            </text>
            <text
              x="40"
              y="165"
              fontSize="8"
              textAnchor="middle"
              fill="#999999"
            >
              ••••••
            </text>

            <text
              x="40"
              y="210"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#1e293b"
            >
              Ingrese
            </text>
            <text
              x="40"
              y="225"
              fontSize="11"
              textAnchor="middle"
              fill="#6c757d"
            >
              contraseña
            </text>
          </g>

          {/* Flecha 1 */}
          <line
            x1="140"
            y1="120"
            x2="200"
            y2="120"
            stroke="#0d6efd"
            strokeWidth="3"
            markerEnd="url(#arrowblue)"
          />
          <defs>
            <marker
              id="arrowblue"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#0d6efd" />
            </marker>
          </defs>

          {/* Paso 2: Código */}
          <g transform="translate(350, 80)">
            <circle cx="40" cy="40" r="40" fill="#198754" />
            <text
              x="40"
              y="55"
              fontSize="36"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              2
            </text>

            <rect
              x="10"
              y="100"
              width="60"
              height="80"
              rx="5"
              fill="white"
              stroke="#198754"
              strokeWidth="2"
            />
            <text
              x="40"
              y="125"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Código
            </text>
            <text
              x="40"
              y="145"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              fill="#198754"
            >
              235691
            </text>
            <text
              x="40"
              y="165"
              fontSize="8"
              textAnchor="middle"
              fill="#999999"
            >
              (desde móvil)
            </text>

            <text
              x="40"
              y="210"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#1e293b"
            >
              Ingrese
            </text>
            <text
              x="40"
              y="225"
              fontSize="11"
              textAnchor="middle"
              fill="#6c757d"
            >
              código OTP
            </text>
          </g>

          {/* Flecha 2 */}
          <line
            x1="450"
            y1="120"
            x2="510"
            y2="120"
            stroke="#198754"
            strokeWidth="3"
            markerEnd="url(#arrowgreen)"
          />
          <defs>
            <marker
              id="arrowgreen"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#198754" />
            </marker>
          </defs>

          {/* Paso 3: Acceso */}
          <g transform="translate(650, 80)">
            <circle cx="40" cy="40" r="40" fill="#ffc107" />
            <text
              x="40"
              y="55"
              fontSize="36"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              ✓
            </text>

            <rect
              x="10"
              y="100"
              width="60"
              height="80"
              rx="5"
              fill="#d4edda"
              stroke="#198754"
              strokeWidth="2"
            />
            <text
              x="40"
              y="130"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#155724"
            >
              ACCESO
            </text>
            <text
              x="40"
              y="155"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#155724"
            >
              CONCEDIDO
            </text>

            <text
              x="40"
              y="210"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#1e293b"
            >
              Cuenta
            </text>
            <text
              x="40"
              y="225"
              fontSize="11"
              textAnchor="middle"
              fill="#6c757d"
            >
              protegida
            </text>
          </g>

          {/* Texto explicativo */}
          <text
            x="400"
            y="300"
            fontSize="13"
            textAnchor="middle"
            fill="#6c757d"
            fontStyle="italic"
          >
            Dos capas de seguridad = protección mucho mayor
          </text>
        </svg>
      );

    case "camera-modes":
      return (
        <svg
          viewBox="0 0 800 500"
          className="w-100 h-auto"
          style={{ maxWidth: "650px" }}
        >
          {/* Fondo */}
          <rect width="800" height="500" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="50"
            fontSize="32"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Modos de Cámara del Móvil
          </text>

          {/* Modo Foto */}
          <g transform="translate(100, 100)">
            {/* Marco de cámara */}
            <rect
              x="0"
              y="0"
              width="220"
              height="180"
              rx="15"
              fill="white"
              stroke="#0d6efd"
              strokeWidth="4"
            />

            {/* Simular foto */}
            <defs>
              <linearGradient
                id="photoGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#87ceeb" />
                <stop offset="100%" stopColor="#e0ffff" />
              </linearGradient>
            </defs>
            <rect
              x="10"
              y="10"
              width="200"
              height="160"
              rx="8"
              fill="url(#photoGradient)"
            />
            {/* Sol */}
            <circle cx="170" cy="40" r="25" fill="#ffd700" />
            {/* Montaña */}
            <polygon points="50,130 110,60 170,130" fill="#8b7355" />
            {/* Pasto */}
            <rect x="10" y="130" width="200" height="40" fill="#90ee90" />

            <text
              x="110"
              y="230"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              fill="#0d6efd"
            >
              FOTO
            </text>

            {/* Icono de cámara simple y claro */}
            <g transform="translate(110, 280)">
              <rect
                x="-35"
                y="-20"
                width="70"
                height="50"
                rx="8"
                fill="#0d6efd"
              />
              <circle cx="0" cy="5" r="15" fill="white" />
              <circle cx="0" cy="5" r="8" fill="#0d6efd" />
              <rect
                x="-10"
                y="-25"
                width="20"
                height="8"
                rx="4"
                fill="#0d6efd"
              />
            </g>

            {/* Características */}
            <text
              x="110"
              y="350"
              fontSize="14"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Captura imágenes
            </text>
          </g>

          {/* Modo Vídeo */}
          <g transform="translate(480, 100)">
            {/* Marco de cámara */}
            <rect
              x="0"
              y="0"
              width="220"
              height="180"
              rx="15"
              fill="white"
              stroke="#dc3545"
              strokeWidth="4"
            />

            {/* Simular vídeo con movimiento */}
            <defs>
              <linearGradient
                id="videoGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#87ceeb" />
                <stop offset="100%" stopColor="#e0ffff" />
              </linearGradient>
            </defs>
            <rect
              x="10"
              y="10"
              width="200"
              height="160"
              rx="8"
              fill="url(#videoGradient)"
            />

            {/* REC indicator */}
            <circle cx="30" cy="30" r="8" fill="#dc3545" />
            <text x="50" y="36" fontSize="14" fontWeight="bold" fill="#dc3545">
              REC
            </text>

            {/* Play icon sobre el video */}
            <polygon
              points="80,70 80,110 130,90"
              fill="white"
              opacity="0.9"
              stroke="#dc3545"
              strokeWidth="3"
            />

            <text
              x="110"
              y="230"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              fill="#dc3545"
            >
              VÍDEO
            </text>

            {/* Icono de videocámara */}
            <g transform="translate(110, 280)">
              <rect
                x="-40"
                y="-15"
                width="60"
                height="40"
                rx="6"
                fill="#dc3545"
              />
              <polygon points="20,-5 20,15 40,10 40,0" fill="#dc3545" />
              <circle cx="-10" cy="5" r="10" fill="white" />
            </g>

            {/* Características */}
            <text
              x="110"
              y="350"
              fontSize="14"
              fontWeight="600"
              textAnchor="middle"
              fill="#495057"
            >
              Graba con movimiento
            </text>
          </g>

          {/* Instrucción final */}
          <text
            x="400"
            y="450"
            fontSize="16"
            textAnchor="middle"
            fill="#6c757d"
            fontStyle="italic"
          >
            Ambos modos están en la app de cámara de su móvil
          </text>
        </svg>
      );

    case "phishing-alert":
      return (
        <svg
          viewBox="0 0 800 400"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo */}
          <rect width="800" height="400" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="40"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            ⚠️ Alerta de Phishing
          </text>

          {/* Email Falso */}
          <g transform="translate(80, 80)">
            {/* Sobre */}
            <rect
              x="30"
              y="30"
              width="220"
              height="150"
              rx="8"
              fill="white"
              stroke="#dc3545"
              strokeWidth="3"
            />

            {/* Encabezado falso */}
            <rect x="30" y="30" width="220" height="35" fill="#f8d7da" />

            {/* Remitente falso */}
            <text x="45" y="55" fontSize="11" fontWeight="bold" fill="#dc3545">
              "banco@seguro-online.com"
            </text>

            {/* Contenido */}
            <text x="45" y="85" fontSize="11" fontWeight="600" fill="#1e293b">
              ¡URGENTE!
            </text>

            <text x="45" y="105" fontSize="10" fill="#495057">
              Verifique inmediatamente
            </text>

            <text x="45" y="120" fontSize="10" fill="#495057">
              su cuenta. Haga clic aquí.
            </text>

            {/* Botón falso */}
            <rect
              x="45"
              y="135"
              width="100"
              height="25"
              rx="4"
              fill="#0d6efd"
            />
            <text
              x="95"
              y="153"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              Verificar ahora
            </text>

            {/* Icono alerta */}
            <circle cx="200" cy="80" r="30" fill="#dc3545" opacity="0.3" />
            <text
              x="200"
              y="90"
              fontSize="28"
              textAnchor="middle"
              fill="#dc3545"
            >
              ⚠
            </text>

            <text
              x="140"
              y="210"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#dc3545"
            >
              PELIGRO: FALSO
            </text>
          </g>

          {/* Email Legítimo */}
          <g transform="translate(420, 80)">
            {/* Sobre */}
            <rect
              x="30"
              y="30"
              width="220"
              height="150"
              rx="8"
              fill="white"
              stroke="#198754"
              strokeWidth="3"
            />

            {/* Encabezado legítimo */}
            <rect x="30" y="30" width="220" height="35" fill="#d4edda" />

            {/* Remitente legítimo */}
            <text x="45" y="55" fontSize="11" fontWeight="bold" fill="#198754">
              noreply@bancoreal.es
            </text>

            {/* Contenido */}
            <text x="45" y="85" fontSize="11" fontWeight="600" fill="#1e293b">
              Confirmación de operación
            </text>

            <text x="45" y="105" fontSize="10" fill="#495057">
              Su transferencia de €500
            </text>

            <text x="45" y="120" fontSize="10" fill="#495057">
              completada exitosamente.
            </text>

            {/* Detalles */}
            <text x="45" y="140" fontSize="9" fill="#6c757d">
              Si no realizó esta operación,
            </text>

            {/* Icono check */}
            <circle cx="200" cy="80" r="30" fill="#198754" opacity="0.3" />
            <text
              x="200"
              y="95"
              fontSize="28"
              textAnchor="middle"
              fill="#198754"
            >
              ✓
            </text>

            <text
              x="140"
              y="210"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#198754"
            >
              SEGURO: LEGÍTIMO
            </text>
          </g>

          {/* Reglas de seguridad */}
          <rect
            x="60"
            y="280"
            width="680"
            height="100"
            rx="10"
            fill="white"
            stroke="#dee2e6"
            strokeWidth="2"
          />

          <text x="80" y="310" fontSize="14" fontWeight="bold" fill="#1e293b">
            🔒 Cómo identificar un Phishing:
          </text>

          <circle cx="75" cy="345" r="4" fill="#dc3545" />
          <text x="90" y="349" fontSize="11" fill="#6c757d">
            El banco NUNCA le pedirá contraseña por email
          </text>

          <circle cx="75" cy="370" r="4" fill="#dc3545" />
          <text x="90" y="374" fontSize="11" fill="#6c757d">
            Busque errores ortográficos o de diseño extraño
          </text>

          <circle cx="420" cy="345" r="4" fill="#dc3545" />
          <text x="435" y="349" fontSize="11" fill="#6c757d">
            Desconfíe de urgencias artificiales ("¡AHORA!")
          </text>

          <circle cx="420" cy="370" r="4" fill="#dc3545" />
          <text x="435" y="374" fontSize="11" fill="#6c757d">
            Cuando dudes, llama directamente al banco
          </text>
        </svg>
      );

    case "email-anatomy":
      return (
        <svg
          viewBox="0 0 800 450"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo */}
          <rect width="800" height="450" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="40"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Estructura de un Correo Electrónico
          </text>

          {/* Sobre de correo */}
          <rect
            x="80"
            y="70"
            width="640"
            height="350"
            rx="10"
            fill="white"
            stroke="#0d6efd"
            strokeWidth="2"
          />

          {/* Banner superior */}
          <rect
            x="80"
            y="70"
            width="640"
            height="45"
            rx="10"
            fill="#e7f1ff"
            stroke="#0d6efd"
            strokeWidth="2"
          />
          <text x="100" y="100" fontSize="13" fontWeight="600" fill="#0d6efd">
            Gmail
          </text>

          {/* De */}
          <text x="100" y="140" fontSize="12" fontWeight="600" fill="#495057">
            De:
          </text>
          <rect
            x="135"
            y="130"
            width="250"
            height="25"
            rx="3"
            fill="#f0f0f0"
            stroke="#dee2e6"
            strokeWidth="1"
          />
          <text x="145" y="149" fontSize="11" fill="#1e293b">
            tu.contacto@empresa.com
          </text>

          {/* Para */}
          <text x="420" y="140" fontSize="12" fontWeight="600" fill="#495057">
            Para:
          </text>
          <rect
            x="455"
            y="130"
            width="250"
            height="25"
            rx="3"
            fill="#f0f0f0"
            stroke="#dee2e6"
            strokeWidth="1"
          />
          <text x="465" y="149" fontSize="11" fill="#1e293b">
            tu@email.com
          </text>

          {/* Asunto */}
          <text x="100" y="185" fontSize="12" fontWeight="600" fill="#495057">
            Asunto:
          </text>
          <rect
            x="180"
            y="175"
            width="525"
            height="25"
            rx="3"
            fill="#fff3cd"
            stroke="#ffc107"
            strokeWidth="2"
          />
          <text x="190" y="194" fontSize="11" fontWeight="600" fill="#1e293b">
            Informe Trimestral - Q3 2024
          </text>

          {/* Línea divisoria */}
          <line
            x1="100"
            y1="215"
            x2="700"
            y2="215"
            stroke="#dee2e6"
            strokeWidth="1"
          />

          {/* Cuerpo del mensaje */}
          <text x="100" y="245" fontSize="12" fontWeight="600" fill="#1e293b">
            Cuerpo del mensaje:
          </text>

          <text x="100" y="275" fontSize="11" fill="#495057">
            Estimado usuario,
          </text>

          <text x="100" y="295" fontSize="11" fill="#495057">
            Le adjuntamos el informe que solicitó el pasado mes.
          </text>

          <text x="100" y="315" fontSize="11" fill="#495057">
            Por favor, revíselo y háganos saber su opinión.
          </text>

          <text x="100" y="335" fontSize="11" fill="#495057">
            Saludos cordiales,
          </text>

          <text x="100" y="355" fontSize="11" fill="#495057">
            Su equipo
          </text>

          {/* Adjuntos */}
          <text x="100" y="385" fontSize="12" fontWeight="600" fill="#495057">
            📎 Adjuntos:
          </text>
          <rect
            x="100"
            y="395"
            width="200"
            height="30"
            rx="4"
            fill="#f0f0f0"
            stroke="#dee2e6"
            strokeWidth="1"
          />
          <text x="115" y="416" fontSize="10" fill="#1e293b">
            📄 informe-trimestral.pdf
          </text>
        </svg>
      );

    case "security-shield":
      return (
        <svg
          viewBox="0 0 400 500"
          className="w-100 h-auto"
          style={{ maxWidth: "300px" }}
        >
          {/* Fondo */}
          <rect width="400" height="500" fill="transparent" />

          {/* Escudo dorado */}
          <path
            d="M 200 50 L 120 120 L 120 250 Q 200 380 200 380 Q 200 380 280 250 L 280 120 Z"
            fill="#FFD700"
            stroke="#DAA520"
            strokeWidth="3"
          />

          {/* Brillo del escudo */}
          <ellipse
            cx="200"
            cy="150"
            rx="50"
            ry="100"
            fill="white"
            opacity="0.2"
          />

          {/* Check grande verde en el centro */}
          <circle cx="200" cy="220" r="60" fill="#198754" />
          <text
            x="200"
            y="245"
            fontSize="80"
            fontWeight="bold"
            textAnchor="middle"
            fill="white"
          >
            ✓
          </text>

          {/* Texto principal */}
          <text
            x="200"
            y="420"
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Cuenta Protegida
          </text>

          {/* Subtexto */}
          <text
            x="200"
            y="455"
            fontSize="13"
            textAnchor="middle"
            fill="#6c757d"
          >
            Seguridad verificada
          </text>

          {/* Decoración de rayos */}
          <line
            x1="100"
            y1="80"
            x2="80"
            y2="60"
            stroke="#FFD700"
            strokeWidth="3"
            opacity="0.5"
          />
          <line
            x1="300"
            y1="80"
            x2="320"
            y2="60"
            stroke="#FFD700"
            strokeWidth="3"
            opacity="0.5"
          />
        </svg>
      );

    case "word-toolbar":
      return (
        <svg
          viewBox="0 0 800 350"
          className="w-100 h-auto"
          style={{ maxWidth: "650px" }}
        >
          {/* Fondo */}
          <rect width="800" height="350" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="50"
            fontSize="32"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Barra de Herramientas de Word
          </text>

          {/* Barra de herramientas */}
          <rect
            x="80"
            y="100"
            width="640"
            height="100"
            rx="8"
            fill="white"
            stroke="#dee2e6"
            strokeWidth="3"
          />

          {/* Botón Negrita (B) */}
          <g transform="translate(140, 130)">
            <rect
              width="80"
              height="60"
              rx="6"
              fill="#e7f1ff"
              stroke="#0d6efd"
              strokeWidth="3"
            />
            <text
              x="40"
              y="42"
              fontSize="32"
              fontWeight="900"
              textAnchor="middle"
              fill="#0d6efd"
            >
              N
            </text>
          </g>
          <text
            x="180"
            y="235"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#0d6efd"
          >
            Negrita
          </text>

          {/* Botón Cursiva (I) */}
          <g transform="translate(280, 130)">
            <rect
              width="80"
              height="60"
              rx="6"
              fill="#e7f1ff"
              stroke="#0d6efd"
              strokeWidth="3"
            />
            <text
              x="40"
              y="42"
              fontSize="32"
              fontWeight="bold"
              fontStyle="italic"
              textAnchor="middle"
              fill="#0d6efd"
            >
              I
            </text>
          </g>
          <text
            x="320"
            y="235"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#0d6efd"
          >
            Cursiva
          </text>

          {/* Separador */}
          <line
            x1="400"
            y1="120"
            x2="400"
            y2="180"
            stroke="#dee2e6"
            strokeWidth="3"
          />

          {/* Selector de tamaño */}
          <rect
            x="450"
            y="130"
            width="120"
            height="60"
            rx="6"
            fill="white"
            stroke="#dee2e6"
            strokeWidth="2"
          />
          <text
            x="510"
            y="170"
            fontSize="22"
            fontWeight="600"
            textAnchor="middle"
            fill="#495057"
          >
            14
          </text>
          <text
            x="510"
            y="235"
            fontSize="18"
            fontWeight="600"
            textAnchor="middle"
            fill="#6c757d"
          >
            Tamaño
          </text>

          {/* Instrucción */}
          <text
            x="400"
            y="300"
            fontSize="16"
            textAnchor="middle"
            fill="#6c757d"
            fontStyle="italic"
          >
            Usa estos botones para dar formato a tu documento
          </text>
        </svg>
      );

    case "photo-landscape":
      return (
        <svg
          viewBox="0 0 700 500"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo blanco */}
          <rect width="700" height="500" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="350"
            y="45"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Foto Capturada
          </text>

          {/* Marco de foto principal más grande */}
          <rect
            x="50"
            y="80"
            width="600"
            height="350"
            rx="15"
            fill="white"
            stroke="#0d6efd"
            strokeWidth="4"
          />

          {/* Gradientes */}
          <defs>
            <linearGradient id="skyGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#87ceeb" />
              <stop offset="100%" stopColor="#b0e0e6" />
            </linearGradient>
            <linearGradient
              id="mountainGradient2"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b6f47" />
              <stop offset="50%" stopColor="#6b4423" />
              <stop offset="100%" stopColor="#4a2c11" />
            </linearGradient>
          </defs>

          {/* Cielo */}
          <rect
            x="50"
            y="80"
            width="600"
            height="200"
            fill="url(#skyGradient2)"
          />

          {/* Sol grande */}
          <circle cx="550" cy="130" r="40" fill="#ffd700" opacity="0.9" />
          <circle cx="550" cy="130" r="30" fill="#ffed4e" />

          {/* Nubes */}
          <g opacity="0.7">
            <ellipse cx="150" cy="120" rx="40" ry="20" fill="white" />
            <ellipse cx="170" cy="115" rx="35" ry="18" fill="white" />
            <ellipse cx="130" cy="115" rx="30" ry="15" fill="white" />
          </g>

          {/* Montañas con mejor definición */}
          <polygon
            points="50,280 200,120 350,280"
            fill="url(#mountainGradient2)"
          />
          <polygon
            points="250,280 420,160 600,280"
            fill="#8b7355"
            opacity="0.9"
          />

          {/* Pasto más realista */}
          <rect x="50" y="280" width="600" height="150" fill="#7cb342" />
          <rect
            x="50"
            y="280"
            width="600"
            height="30"
            fill="#689f38"
            opacity="0.5"
          />

          {/* Flores visibles */}
          <g>
            <circle cx="150" cy="340" r="12" fill="#ff69b4" />
            <circle cx="180" cy="360" r="10" fill="#ffeb3b" />
            <circle cx="450" cy="350" r="12" fill="#ff69b4" />
            <circle cx="500" cy="370" r="10" fill="#ffeb3b" />
          </g>

          {/* Árbol */}
          <rect x="540" y="300" width="30" height="80" fill="#6b4423" />
          <circle cx="555" cy="290" r="50" fill="#4caf50" />

          {/* Texto descriptivo */}
          <text
            x="350"
            y="465"
            fontSize="18"
            fontWeight="600"
            textAnchor="middle"
            fill="#198754"
          >
            ¡Fotografía Exitosa!
          </text>
        </svg>
      );

    case "videocall-controls":
      return (
        <svg
          viewBox="0 0 800 300"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo */}
          <rect width="800" height="300" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="400"
            y="40"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Controles Durante una VideoLlamada
          </text>

          {/* Micrófono */}
          <g transform="translate(100, 100)">
            <circle cx="60" cy="60" r="50" fill="#6c757d" />
            <path
              d="M 60 30 Q 75 30 75 50 L 75 80 Q 75 95 60 95 Q 45 95 45 80 L 45 50 Q 45 30 60 30"
              fill="white"
            />
            <circle cx="60" cy="120" r="6" fill="#1e293b" />
            <line
              x1="60"
              y1="126"
              x2="60"
              y2="140"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <text
              x="60"
              y="165"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#1e293b"
            >
              Micrófono
            </text>
          </g>

          {/* Cámara */}
          <g transform="translate(350, 100)">
            <rect x="20" y="20" width="80" height="60" rx="4" fill="#0d6efd" />
            <circle cx="60" cy="50" r="15" fill="white" />
            <circle cx="60" cy="50" r="10" fill="#0d6efd" />
            <text
              x="60"
              y="165"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#1e293b"
            >
              Cámara
            </text>
          </g>

          {/* Colgar */}
          <g transform="translate(600, 100)">
            <circle cx="60" cy="60" r="50" fill="#dc3545" />
            <path
              d="M 30 40 L 40 50 L 80 50 L 90 40 Q 90 30 80 30 L 40 30 Q 30 30 30 40 Z M 60 60 L 60 80"
              fill="white"
            />
            <text
              x="60"
              y="165"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              fill="#1e293b"
            >
              Colgar
            </text>
          </g>

          {/* Instrucción */}
          <text
            x="400"
            y="280"
            fontSize="12"
            textAnchor="middle"
            fill="#6c757d"
            fontStyle="italic"
          >
            Usa estos controles para manejar tu videollamada
          </text>
        </svg>
      );

    case "contact-details":
      return (
        <svg
          viewBox="0 0 600 400"
          className="w-100 h-auto"
          style={{ maxWidth: "500px" }}
        >
          {/* Fondo */}
          <rect width="600" height="400" fill="#f8f9fa" />

          {/* Tarjeta de contacto */}
          <rect
            x="50"
            y="50"
            width="500"
            height="250"
            rx="12"
            fill="white"
            stroke="#dee2e6"
            strokeWidth="2"
          />

          {/* Avatar */}
          <circle
            cx="300"
            cy="100"
            r="35"
            fill="#e7f1ff"
            stroke="#0d6efd"
            strokeWidth="2"
          />
          <text
            x="300"
            y="112"
            fontSize="32"
            fontWeight="bold"
            textAnchor="middle"
            fill="#0d6efd"
          >
            JP
          </text>

          {/* Nombre */}
          <text
            x="300"
            y="160"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Juan Pérez
          </text>

          {/* Subtítulo */}
          <text
            x="300"
            y="185"
            fontSize="12"
            textAnchor="middle"
            fill="#6c757d"
          >
            Móvil
          </text>

          {/* Botón Llamada */}
          <rect x="100" y="210" width="120" height="45" rx="6" fill="#6c757d" />
          <circle cx="135" cy="232" r="12" fill="white" />
          <path d="M 130 229 L 140 229 L 135 235 Z" fill="#6c757d" />
          <text x="200" y="237" fontSize="11" fill="white" fontWeight="600">
            Llamada
          </text>

          {/* Botón VideoLlamada */}
          <rect x="380" y="210" width="120" height="45" rx="6" fill="#198754" />
          <rect x="405" y="223" width="25" height="18" rx="2" fill="white" />
          <circle cx="420" cy="232" r="4" fill="#198754" />
          <text x="460" y="237" fontSize="11" fill="white" fontWeight="600">
            VideoLlamada
          </text>

          {/* Instrucción */}
          <text
            x="300"
            y="360"
            fontSize="12"
            textAnchor="middle"
            fill="#6c757d"
            fontStyle="italic"
          >
            Elige cómo deseas comunicarte con este contacto
          </text>
        </svg>
      );

    case "password-manager":
      return (
        <svg
          viewBox="0 0 700 450"
          className="w-100 h-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* Fondo */}
          <rect width="700" height="450" fill="#f8f9fa" />

          {/* Título */}
          <text
            x="350"
            y="40"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Gestor de Contraseñas
          </text>

          {/* Contenedor principal */}
          <rect
            x="50"
            y="70"
            width="600"
            height="300"
            rx="8"
            fill="white"
            stroke="#dee2e6"
            strokeWidth="2"
          />

          {/* Elemento 1: Gmail */}
          <g transform="translate(70, 90)">
            {/* Icono */}
            <rect x="0" y="0" width="35" height="35" rx="4" fill="#ea4335" />
            <text
              x="17"
              y="24"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              G
            </text>

            {/* Info */}
            <text x="50" y="15" fontSize="12" fontWeight="600" fill="#1e293b">
              gmail.com
            </text>
            <text x="50" y="32" fontSize="10" fill="#6c757d">
              usuario@gmail.com
            </text>
          </g>

          {/* Elemento 2: Facebook */}
          <g transform="translate(70, 160)">
            {/* Icono */}
            <rect x="0" y="0" width="35" height="35" rx="4" fill="#1877f2" />
            <text
              x="17"
              y="24"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              f
            </text>

            {/* Info */}
            <text x="50" y="15" fontSize="12" fontWeight="600" fill="#1e293b">
              facebook.com
            </text>
            <text x="50" y="32" fontSize="10" fill="#6c757d">
              usuario.facebook
            </text>
          </g>

          {/* Elemento 3: Banco */}
          <g transform="translate(70, 230)">
            {/* Icono */}
            <rect x="0" y="0" width="35" height="35" rx="4" fill="#0d6efd" />
            <text
              x="17"
              y="24"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              B
            </text>

            {/* Info */}
            <text x="50" y="15" fontSize="12" fontWeight="600" fill="#1e293b">
              banco.es
            </text>
            <text x="50" y="32" fontSize="10" fill="#6c757d">
              juan1980****
            </text>
          </g>

          {/* Icono de candado */}
          <g transform="translate(600, 290)">
            <rect
              x="0"
              y="10"
              width="30"
              height="25"
              rx="2"
              fill="none"
              stroke="#198754"
              strokeWidth="2"
            />
            <path
              d="M 7 10 L 7 5 Q 7 0 15 0 Q 23 0 23 5 L 23 10"
              fill="none"
              stroke="#198754"
              strokeWidth="2"
            />
            <circle cx="15" cy="23" r="2" fill="#198754" />
          </g>

          {/* Beneficios */}
          <text
            x="350"
            y="400"
            fontSize="13"
            textAnchor="middle"
            fill="#1e293b"
            fontWeight="600"
          >
            ✓ Contraseñas únicas
          </text>
          <text
            x="350"
            y="425"
            fontSize="13"
            textAnchor="middle"
            fill="#1e293b"
            fontWeight="600"
          >
            ✓ Encriptadas y seguras
          </text>
        </svg>
      );

    case "whatsapp-trophy":
      return (
        <svg
          viewBox="0 0 400 500"
          className="w-100 h-auto"
          style={{ maxWidth: "300px" }}
        >
          {/* Fondo */}
          <rect width="400" height="500" fill="transparent" />

          {/* Trofeo */}
          <g transform="translate(200, 100)">
            {/* Base */}
            <rect x="-80" y="200" width="160" height="20" fill="#ffd700" />
            <rect x="-70" y="220" width="140" height="10" fill="#daa520" />

            {/* Pedestal */}
            <rect x="-40" y="170" width="80" height="30" fill="#ffd700" />

            {/* Copa */}
            <path
              d="M -60 170 L -50 100 Q -50 80 -30 80 Q -10 80 -10 100 L 0 170"
              fill="#ffd700"
              stroke="#daa520"
              strokeWidth="2"
            />

            {/* Asas */}
            <path
              d="M 0 130 Q 30 130 30 150"
              fill="none"
              stroke="#ffd700"
              strokeWidth="8"
            />
            <path
              d="M -60 130 Q -90 130 -90 150"
              fill="none"
              stroke="#ffd700"
              strokeWidth="8"
            />

            {/* Logo WhatsApp */}
            <circle cx="-30" cy="110" r="20" fill="#25d366" />
            <text
              x="-30"
              y="118"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill="white"
            >
              ✓
            </text>

            {/* Brillo */}
            <ellipse
              cx="-50"
              cy="100"
              rx="15"
              ry="40"
              fill="white"
              opacity="0.2"
            />
          </g>

          {/* Texto */}
          <text
            x="200"
            y="380"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            ¡Comunicador
          </text>
          <text
            x="200"
            y="410"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Digital!
          </text>

          {/* Estrella decorativa */}
          <polygon
            points="200,30 210,50 232,50 215,65 222,85 200,70 178,85 185,65 168,50 190,50"
            fill="#ffc107"
          />
        </svg>
      );

    case "document-trophy":
      return (
        <svg
          viewBox="0 0 500 550"
          className="w-100 h-auto"
          style={{ maxWidth: "400px" }}
        >
          {/* Fondo */}
          <rect width="500" height="550" fill="transparent" />

          {/* Documento más grande y legible */}
          <g transform="translate(250, 100)">
            <rect
              x="-100"
              y="0"
              width="200"
              height="280"
              rx="12"
              fill="white"
              stroke="#0d6efd"
              strokeWidth="4"
            />

            {/* Esquina doblada efecto papel */}
            <path
              d="M 80 0 L 80 30 L 100 30 Z"
              fill="#e7f1ff"
              stroke="#0d6efd"
              strokeWidth="4"
            />

            {/* Líneas de texto más gruesas y visibles */}
            <line
              x1="-70"
              y1="40"
              x2="50"
              y2="40"
              stroke="#0d6efd"
              strokeWidth="4"
              opacity="0.6"
            />
            <line
              x1="-70"
              y1="65"
              x2="50"
              y2="65"
              stroke="#0d6efd"
              strokeWidth="4"
              opacity="0.6"
            />
            <line
              x1="-70"
              y1="90"
              x2="70"
              y2="90"
              stroke="#0d6efd"
              strokeWidth="4"
              opacity="0.6"
            />
            <line
              x1="-70"
              y1="115"
              x2="70"
              y2="115"
              stroke="#0d6efd"
              strokeWidth="4"
              opacity="0.6"
            />
            <line
              x1="-70"
              y1="140"
              x2="30"
              y2="140"
              stroke="#0d6efd"
              strokeWidth="4"
              opacity="0.6"
            />
            <line
              x1="-70"
              y1="165"
              x2="60"
              y2="165"
              stroke="#dee2e6"
              strokeWidth="3"
            />
            <line
              x1="-70"
              y1="185"
              x2="40"
              y2="185"
              stroke="#dee2e6"
              strokeWidth="3"
            />

            {/* Check más grande */}
            <circle cx="0" cy="230" r="35" fill="#198754" />
            <path
              d="M -15 230 L -5 245 L 18 210"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Texto más grande */}
          <text
            x="250"
            y="450"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Editor de
          </text>
          <text
            x="250"
            y="485"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Documentos
          </text>

          {/* Estrella decorativa */}
          <polygon
            points="250,30 262,58 292,58 268,76 278,104 250,86 222,104 232,76 208,58 238,58"
            fill="#ffc107"
          />
        </svg>
      );

    case "email-trophy":
      return (
        <svg
          viewBox="0 0 400 500"
          className="w-100 h-auto"
          style={{ maxWidth: "300px" }}
        >
          {/* Fondo */}
          <rect width="400" height="500" fill="transparent" />

          {/* Sobre de correo con check */}
          <g transform="translate(200, 100)">
            {/* Sobre */}
            <rect
              x="-70"
              y="0"
              width="140"
              height="100"
              rx="6"
              fill="white"
              stroke="#ea4335"
              strokeWidth="3"
            />

            {/* Solapa */}
            <polygon points="-70,0 0,-30 70,0" fill="#f8d7da" />

            {/* Línea del sobre */}
            <line
              x1="-70"
              y1="0"
              x2="70"
              y2="100"
              stroke="#dee2e6"
              strokeWidth="1"
            />
            <line
              x1="70"
              y1="0"
              x2="-70"
              y2="100"
              stroke="#dee2e6"
              strokeWidth="1"
            />

            {/* Check grande verde */}
            <circle cx="0" cy="130" r="30" fill="#198754" />
            <path
              d="M -15 130 L -5 145 L 18 115"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Texto */}
          <text
            x="200"
            y="330"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Comunicación
          </text>
          <text
            x="200"
            y="360"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Profesional
          </text>

          {/* Estrella decorativa */}
          <polygon
            points="200,30 210,50 232,50 215,65 222,85 200,70 178,85 185,65 168,50 190,50"
            fill="#ffc107"
          />
        </svg>
      );

    case "videocall-trophy":
      return (
        <svg
          viewBox="0 0 400 500"
          className="w-100 h-auto"
          style={{ maxWidth: "300px" }}
        >
          {/* Fondo */}
          <rect width="400" height="500" fill="transparent" />

          {/* Globo terráqueo */}
          <g transform="translate(200, 150)">
            {/* Círculo del globo */}
            <circle cx="0" cy="0" r="70" fill="#0d6efd" opacity="0.2" />
            <circle
              cx="0"
              cy="0"
              r="70"
              fill="none"
              stroke="#0d6efd"
              strokeWidth="3"
            />

            {/* Meridianos */}
            <ellipse
              cx="0"
              cy="0"
              rx="70"
              ry="35"
              fill="none"
              stroke="#0d6efd"
              strokeWidth="2"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="35"
              ry="70"
              fill="none"
              stroke="#0d6efd"
              strokeWidth="2"
            />
            <line
              x1="-70"
              y1="0"
              x2="70"
              y2="0"
              stroke="#0d6efd"
              strokeWidth="2"
            />

            {/* Continentes simplificados */}
            <path
              d="M -20,-30 L -10,-40 L 5,-35 L 15,-25 L 10,-15 L -15,-20 Z"
              fill="#0d6efd"
              opacity="0.6"
            />
            <path
              d="M 20,10 L 35,5 L 45,20 L 40,35 L 25,30 L 20,20 Z"
              fill="#0d6efd"
              opacity="0.6"
            />
            <path
              d="M -40,15 L -25,10 L -20,25 L -35,30 Z"
              fill="#0d6efd"
              opacity="0.6"
            />
          </g>

          {/* Personas conectadas alrededor del globo */}
          {/* Persona 1 - arriba izquierda */}
          <g transform="translate(100, 50)">
            <circle cx="0" cy="0" r="18" fill="#198754" />
            <circle cx="0" cy="-5" r="6" fill="white" />
            <path
              d="M -8,5 Q -8,12 0,12 Q 8,12 8,5"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="18"
              x2="100"
              y2="80"
              stroke="#0d6efd"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          </g>

          {/* Persona 2 - arriba derecha */}
          <g transform="translate(300, 50)">
            <circle cx="0" cy="0" r="18" fill="#198754" />
            <circle cx="0" cy="-5" r="6" fill="white" />
            <path
              d="M -8,5 Q -8,12 0,12 Q 8,12 8,5"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="18"
              x2="-100"
              y2="80"
              stroke="#0d6efd"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          </g>

          {/* Persona 3 - abajo izquierda */}
          <g transform="translate(80, 250)">
            <circle cx="0" cy="0" r="18" fill="#198754" />
            <circle cx="0" cy="-5" r="6" fill="white" />
            <path
              d="M -8,5 Q -8,12 0,12 Q 8,12 8,5"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="-18"
              x2="120"
              y2="-80"
              stroke="#0d6efd"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          </g>

          {/* Persona 4 - abajo derecha */}
          <g transform="translate(320, 250)">
            <circle cx="0" cy="0" r="18" fill="#198754" />
            <circle cx="0" cy="-5" r="6" fill="white" />
            <path
              d="M -8,5 Q -8,12 0,12 Q 8,12 8,5"
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="-18"
              x2="-120"
              y2="-80"
              stroke="#0d6efd"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          </g>

          {/* Check de verificación */}
          <g transform="translate(200, 320)">
            <circle cx="0" cy="0" r="30" fill="#198754" />
            <path
              d="M -15 0 L -5 15 L 18 -15"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Texto */}
          <text
            x="200"
            y="400"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Videollamadas
          </text>
          <text
            x="200"
            y="430"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fill="#1e293b"
          >
            Dominadas
          </text>

          {/* Estrella decorativa */}
          <polygon
            points="200,460 207,475 223,475 210,485 215,500 200,490 185,500 190,485 177,475 193,475"
            fill="#ffc107"
          />
        </svg>
      );

    default:
      return (
        <div
          className="w-100 d-flex align-items-center justify-content-center p-4 bg-light rounded-3 border"
          style={{ minHeight: "200px" }}
        >
          <p className="text-muted text-center">Infografía: {type}</p>
        </div>
      );
  }
};
