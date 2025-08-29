# CambioCUP - Tasa de Cambio en Cuba 🇨🇺

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.1-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC)](https://tailwindcss.com/)

## 📖 Descripción

**CambioCUP** es una aplicación web que proporciona tasas de cambio en tiempo real para las monedas cubanas (CUP, MLC y CLASICA) en relación al dólar estadounidense. Es un servicio gratuito desarrollado por [QvaPay](https://qvapay.com) que permite a los usuarios monitorear las fluctuaciones de las tasas de cambio de manera visual e interactiva.

## ✨ Características

- **Tasas en Tiempo Real**: Actualización automática cada 5 segundos
- **Tres Monedas Cubanas**: 
  - **CUP** (Peso Cubano)
  - **MLC** (Moneda Libremente Convertible)
  - **CLASICA** (Moneda Clásica)
- **Indicadores Visuales**: Colores que cambian según la tendencia (verde para bajada, rojo para subida)
- **Interfaz Interactiva**: Click en cada moneda para cambiar la vista
- **Notificaciones Push**: Integración con OneSignal
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **API REST**: Endpoints para obtener datos históricos

## 🏗️ Arquitectura

### Frontend
- **Next.js 15.5.2** - Framework de React con App Router
- **React 19.1.1** - Biblioteca de interfaz de usuario
- **Tailwind CSS 4.1.12** - Framework de CSS utilitario
- **OneSignal** - Sistema de notificaciones push

### Backend
- **API Routes** - Endpoints de Next.js
- **Supabase** - Base de datos y autenticación
- **Cron Jobs** - Actualización automática de datos

### Base de Datos
- **Tabla `exchange`**: Almacena historial de tasas con campos:
  - `coin_id` (1: CUP, 2: MLC, 3: CLASICA)
  - `value` (valor de la tasa)
  - `updated_at` (timestamp de actualización)

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/cambiocup.git
cd cambiocup
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
npm start
```

## 📊 API Endpoints

### GET `/api`
Obtiene el historial de las tres monedas (últimas 6 entradas)
```json
{
  "cupHistory": [...],
  "mlcHistory": [...],
  "mlcHistory": [...]
}
```

### GET `/api/cron`
Endpoint para cron jobs que actualiza las tasas desde QvaPay API

### GET `/api/og`
Genera imágenes Open Graph para redes sociales

## 🔄 Flujo de Datos

1. **Cron Job** ejecuta cada hora y obtiene datos de [QvaPay API](https://qvapay.com/api/p2p/completed_pairs_average)
2. **Supabase** almacena los nuevos valores en la tabla `exchange`
3. **Frontend** consulta la API cada 5 segundos para obtener datos actualizados
4. **Helpers** calculan promedios y aplican variaciones aleatorias para simular fluctuaciones
5. **UI** actualiza colores y valores según las tendencias

## 🎨 Funcionalidades de la UI

- **Cambio de Moneda**: Click en CUP, MLC o CLASICA para alternar
- **Indicadores de Color**:
  - 🟢 **Verde** (`bg-malachite`): Tasa actual < Promedio (tendencia a la baja)
  - 🔴 **Rojo** (`bg-crimson`): Tasa actual > Promedio (tendencia al alza)
- **Actualización Automática**: Cada 5 segundos
- **Diseño Minimalista**: Interfaz limpia y fácil de usar

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Desarrollo con Turbopack
npm run build    # Construcción para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar ESLint
```

## 🌐 Despliegue

La aplicación está optimizada para desplegarse en:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **Railway**
- **Cualquier plataforma que soporte Node.js**

## 📱 Características Móviles

- **PWA Ready**: Manifest y service workers configurados
- **Responsive Design**: Adaptable a todos los tamaños de pantalla
- **Touch Friendly**: Interfaz optimizada para dispositivos táctiles

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es un servicio gratuito desarrollado por QvaPay. Todos los derechos reservados.

## 👨‍💻 Autor

**Erich Garcia Cruz**
- [GitHub](https://github.com/erichgarciacruz)
- [Twitter](https://twitter.com/erichgarciacruz)

## 🙏 Agradecimientos

- [QvaPay](https://qvapay.com) por proporcionar la API de tasas de cambio
- [Supabase](https://supabase.com) por la infraestructura de base de datos
- [Next.js](https://nextjs.org) por el framework de desarrollo

---

**CambioCUP** - Un servicio gratuito para monitorear las tasas de cambio en Cuba 🇨🇺
