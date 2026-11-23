# TacoExpress Mobile — React Native + Expo

Paquete de trabajo móvil separado de la aplicación web Next.js existente.


## Incluye
- Registro e inicio de sesión con Firebase Authentication (correo y contraseña), y cerrar sesión.
- Validación de campos, longitud mínima de contraseña y confirmación de contraseña.
- Pantallas Login, Register, Home, Menú, Mis pedidos y Perfil.
- Navegación Stack con rutas privadas después de autenticarse.
- Configuración Firebase por variables de entorno; no contiene credenciales reales.


## Ejecutar
1. Instala Node.js LTS y Expo Go en Android.
2. En esta carpeta ejecuta `npm install`.
3. Copia `.env.example` como `.env` y completa las credenciales de Firebase Web App.
4. Firebase Console > Authentication > Sign-in method: habilita Email/Password.
5. Ejecuta `npx expo start`; escanea el QR desde Expo Go.


## Variables de Firebase
`EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`, `EXPO_PUBLIC_FIREBASE_PROJECT_ID`, `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`, `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `EXPO_PUBLIC_FIREBASE_APP_ID`.


## Alcance y pendientes
- Las pantallas y navegación están implementadas como una base móvil.
- No se ha verificado una conexión real a Firebase porque no se proporcionaron credenciales; debes configurar Firebase para probar autenticación.
- El menú muestra productos de demostración.
- Mis pedidos es una pantalla base; todavía no guarda ni consulta pedidos.
- El campo Nombre se valida, pero Firebase Auth Email/Password no guarda ese nombre en el perfil todavía.
- No subas el archivo `.env` a GitHub. `.gitignore` lo excluye.


## GitHub
Puedes extraer este ZIP y subir los archivos de la carpeta a una rama o carpeta de entrega. El ZIP también se puede adjuntar como entrega, pero para que el código quede navegable en GitHub es mejor extraerlo y cargar los archivos/carpetas. Nunca compartas el `.env`.
