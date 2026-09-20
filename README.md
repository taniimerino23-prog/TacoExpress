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
