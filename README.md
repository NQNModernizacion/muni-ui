# React + TypeScript + Vite

Librería base de componentes UI para aplicaciones **MuniExpress**.

## Objetivo

- Centralizar paleta de colores y estilos base
- Evitar hardcodeo de colores en componentes
- Facilitar la alineación visual de nuevas apps (pensando en 2026)
- Proveer componentes UI reutilizables, desacoplados de lógica de negocio

## Qué incluye

- Componentes base:
  - Button
  - Card
  - Modal
  - Table (con toolbar, paginación y modal)
  - Alert
  - Badge
  - Spinner / Loader
  - Container
- Inputs integrados con **react-hook-form**
- Sistema de **tokens CSS** para colores y semánticos

> La librería **NO incluye** lógica de rutas, sesión ni permisos.

## Tokens de estilos

La paleta y los semánticos viven en theme/tokens.css

Acá se definen variables CSS (`--mx-*`) que pueden ser consumidas:
- desde CDN
- o importadas directamente desde el package

Cambiar los colores acá impacta en todos los componentes.

---

## ¿Cómo levantarlo?

Este repo incluye un playground (`App.tsx`) para visualizar los componentes.

```bash ```
npm install
npm run dev 
