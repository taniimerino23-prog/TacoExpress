# TacoExpress 🌮

TacoExpress es una aplicación web desarrollada para Taquería Los Hernández, orientada a digitalizar la gestión de pedidos, productos y ventas.

Este proyecto corresponde a la asignatura Diseño y Programación de Software Multiplataforma de la Universidad Don Bosco.

## Objetivo

Desarrollar una plataforma web que permita a los clientes consultar el menú y realizar pedidos, mientras que el personal de la taquería puede gestionar productos, pedidos y consultar información relevante del negocio.

## Tecnologías utilizadas

- React
- Next.js
- TypeScript
- Tailwind CSS
- API REST
- Firebase
- Git y GitHub
- Vercel

## Funcionalidades principales

- Registro e inicio de sesión.
- Control de acceso mediante roles.
- Gestión de productos y categorías.
- Carrito de compras.
- Gestión y seguimiento de pedidos.
- Cálculo de totales.
- Panel administrativo.
- Reportes y visualización de información.
- Interfaz responsiva.

## Arquitectura

El proyecto utiliza una separación de responsabilidades entre:

- UI: componentes y páginas de React/Next.js.
- Lógica: procesamiento y reglas del sistema.
- Datos: servicios y comunicación con API/backend.

## Ejecución local

Para instalar las dependencias del proyecto:

npm install

Para ejecutar el servidor de desarrollo:

npm run dev

La aplicación estará disponible localmente en:

http://localhost:3000

## Integrantes

- Américo Gabriel Escobar Alvarenga
- William Ernesto Menjívar Flores
- Jonathan Edenilson Elías Hernández
- Tania Claribel Merino Hernández
- Emerson Fernando Muñoz Arévalo

## Despliegue

La aplicación se encuentra desplegada mediante Vercel.

Enlace: https://taco-express.vercel.app

## Repositorio

El proyecto utiliza una rama individual por integrante para facilitar el trabajo colaborativo y mantener evidencia de las contribuciones realizadas.
## Gestión de imágenes

Las imágenes de los productos se gestionan mediante ImgBB. La clave de acceso se configura de forma segura mediante la variable de entorno `IMGBB_API_KEY` y no se almacena directamente en el código fuente.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
(Se implementa la logica para poder hacer loggin con los usuarios registrados en firebase)
