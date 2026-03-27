# Flo — Finanzas Personales

Aplicación web de finanzas personales desarrollada como proyecto de portfolio. Registra ingresos y gastos, visualiza estadísticas mensuales y recibe consejos personalizados basados en tus datos reales.

## Funcionalidades

- **Autenticación** — Email/contraseña y Google OAuth via Auth.js
- **CRUD de transacciones** — Registra ingresos y gastos con categorías, montos y notas
- **Dashboard** — Resumen mensual, gráfico de ingresos vs gastos, donut por categoría y un consejo personalizado
- **Estadísticas** — Comparación mes a mes, tendencias por categoría y top de gastos
- **Consejos personalizados** — Insights derivados de tus datos financieros reales

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 + sistema de diseño personalizado |
| Auth | Auth.js v5 (NextAuth) |
| ORM | Prisma |
| Base de datos | PostgreSQL (Neon) |
| Gráficos | Recharts |
| Deploy | Vercel |

## Arquitectura

Módulos por feature (screaming architecture) con backend en 3 capas:

```
Repository → Service → Route Handler
```

El frontend sigue el patrón container/presentational. Todo el fetching de datos ocurre del lado del servidor mediante React Server Components.

## Inicio rápido

### 1. Clonar e instalar

```bash
git clone https://github.com/LucasApaCode/flo.git
cd flo
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Cadena de conexión PostgreSQL (se recomienda Neon) |
| `AUTH_SECRET` | Secreto aleatorio — generalo con `openssl rand -base64 32` |
| `AUTH_URL` | URL de la app, ej: `http://localhost:3000` |
| `AUTH_GOOGLE_ID` | Client ID de Google OAuth |
| `AUTH_GOOGLE_SECRET` | Client Secret de Google OAuth |

### 3. Ejecutar migraciones

> **Nota:** Prisma CLI no lee `.env.local`. Copia también el `DATABASE_URL` a un archivo `.env` para que los comandos de Prisma funcionen correctamente.

```bash
npx prisma migrate dev
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Deploy

El proyecto incluye un `vercel.json` que ejecuta `prisma generate && next build` automáticamente. Luego de deployar en Vercel:

1. Configura todas las variables de entorno en el dashboard de Vercel
2. Ejecuta `npx prisma migrate deploy` una vez contra la base de datos de producción
3. Agrega el dominio de Vercel a los URIs de redirección autorizados en Google Cloud Console
