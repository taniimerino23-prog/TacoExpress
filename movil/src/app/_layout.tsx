// NAVEGACION PRINCIPAL
// Define la pila de pantallas de la aplicacion. Cada archivo dentro de
// src/app es una pantalla, y desde aqui se configura su encabezado.

import { Stack } from 'expo-router';

export default function LayoutPrincipal() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#faf8f6' },
        headerTintColor: '#1f1d1b',
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: '#faf8f6' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'TacoExpress' }} />
    </Stack>
  );
}
