// NAVEGACION PRINCIPAL
// Define la pila de pantallas y envuelve la aplicacion con el contexto
// de sesion, para que todas las pantallas sepan quien inicio sesion.

import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function LayoutPrincipal() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
