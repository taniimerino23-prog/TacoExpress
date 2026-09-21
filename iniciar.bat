@echo off
echo ====================================
echo   Iniciando TacoExpress Backend y Frontend
echo ====================================

start "JSON Server (Backend)" cmd /k "npx json-server --watch db.json --port 3001"
start "Next.js (Frontend)" cmd /k "npm run dev"

echo Proceso finalizado. Puedes cerrar esta ventana.