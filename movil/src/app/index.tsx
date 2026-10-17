// PANTALLA DE INICIO
// Cambia segun haya sesion iniciada o no.

import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function PantallaInicio() {
  const router = useRouter();
  const { usuario, cargando, haySesion, esAdministrador, salir } = useAuth();

  if (cargando) {
    return (
      <View style={estilos.pantalla}>
        <ActivityIndicator size="large" color="#e8590c" />
      </View>
    );
  }

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.emoji}>{'\u{1F32E}'}</Text>
      <Text style={estilos.titulo}>TacoExpress</Text>
      <Text style={estilos.subtitulo}>Taqueria Los Hernandez</Text>

      {haySesion && (
        <View style={estilos.tarjetaSesion}>
          <Text style={estilos.saludo}>Hola, {usuario.nombre}</Text>
          <Text style={estilos.rol}>
            {esAdministrador ? 'Administrador' : 'Cliente'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={estilos.boton} onPress={() => router.push('/menu')}>
        <Text style={estilos.botonTexto}>Ver el menu</Text>
      </TouchableOpacity>

      {esAdministrador && (
        <TouchableOpacity
          style={estilos.botonBorde}
          onPress={() => router.push('/menu/nuevo')}
        >
          <Text style={estilos.botonBordeTexto}>Agregar un platillo</Text>
        </TouchableOpacity>
      )}

      {haySesion ? (
        <TouchableOpacity style={estilos.botonTexto2} onPress={salir}>
          <Text style={estilos.enlace}>Cerrar sesion</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={estilos.botonBorde}
          onPress={() => router.push('/login')}
        >
          <Text style={estilos.botonBordeTexto}>Iniciar sesion</Text>
        </TouchableOpacity>
      )}
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
  subtitulo: { fontSize: 15, color: '#6b6560', marginTop: 4, marginBottom: 24 },
  tarjetaSesion: {
    backgroundColor: '#fdf1e7',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  saludo: { fontSize: 16, fontWeight: '600', color: '#8a5a2b' },
  rol: { fontSize: 12, color: '#a97c4b', marginTop: 2 },
  boton: {
    backgroundColor: '#e8590c',
    borderRadius: 12,
    paddingVertical: 15,
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
  botonTexto2: { marginTop: 18, padding: 8 },
  enlace: { color: '#c0392b', fontWeight: '600', fontSize: 14 },
});
