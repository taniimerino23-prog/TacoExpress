// PANTALLA DE INICIO
// Punto de entrada de la app. Desde aqui se llega al modulo de menu.

import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PantallaInicio() {
  const router = useRouter();

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.emoji}>{'\u{1F32E}'}</Text>
      <Text style={estilos.titulo}>TacoExpress</Text>
      <Text style={estilos.subtitulo}>Taqueria Los Hernandez</Text>

      <TouchableOpacity style={estilos.boton} onPress={() => router.push('/menu')}>
        <Text style={estilos.botonTexto}>Ver el menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botonBorde}
        onPress={() => router.push('/menu/nuevo')}
      >
        <Text style={estilos.botonBordeTexto}>Agregar un platillo</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#faf8f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emoji: { fontSize: 64, marginBottom: 8 },
  titulo: { fontSize: 32, fontWeight: '700', color: '#1f1d1b' },
  subtitulo: { fontSize: 15, color: '#6b6560', marginTop: 4, marginBottom: 32 },
  boton: {
    backgroundColor: '#e8590c',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  botonTexto: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
  botonBorde: {
    borderWidth: 1,
    borderColor: '#d8d3cd',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  botonBordeTexto: { color: '#4a4540', fontWeight: '600', fontSize: 16 },
});
