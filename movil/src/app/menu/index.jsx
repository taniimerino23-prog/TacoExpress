// PANTALLA: Menu de productos
// Muestra los platillos agrupados por categoria.
// No contiene logica de negocio: le pide los datos al servicio.

import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TarjetaPlatillo from '../../components/TarjetaPlatillo';
import { agruparPorCategoria, listarPlatillos } from '../../services/menuApi';

export default function PantallaMenu() {
  const router = useRouter();
  const [secciones, setSecciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // useFocusEffect vuelve a cargar la lista cada vez que se entra
  // a esta pantalla, para ver los platillos recien agregados.
  useFocusEffect(
    useCallback(() => {
      let activo = true;
      (async () => {
        try {
          setCargando(true);
          const datos = await listarPlatillos();
          if (activo) setSecciones(agruparPorCategoria(datos));
        } catch (e) {
          if (activo) setError('No se pudo cargar el menu.');
        } finally {
          if (activo) setCargando(false);
        }
      })();
      return () => {
        activo = false;
      };
    }, [])
  );

  if (cargando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" color="#e8590c" />
        <Text style={estilos.cargando}>Cargando menu...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.pantalla}>
      <Stack.Screen options={{ title: 'Menu' }} />
      {!!error && <Text style={estilos.error}>{error}</Text>}

      <SectionList
        sections={secciones}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.contenido}
        ListHeaderComponent={
          <View style={estilos.encabezado}>
            <Text style={estilos.titulo}>Taqueria Los Hernandez</Text>
            <Text style={estilos.subtitulo}>
              Toca un platillo para ver su detalle
            </Text>

            <TouchableOpacity
              style={estilos.boton}
              onPress={() => router.push('/menu/nuevo')}
            >
              <Text style={estilos.botonTexto}>+ Agregar platillo</Text>
            </TouchableOpacity>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={estilos.categoria}>{section.title.toUpperCase()}</Text>
        )}
        renderItem={({ item }) => (
          <TarjetaPlatillo
            platillo={item}
            onPress={() => router.push(`/menu/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={estilos.vacio}>Aun no hay platillos registrados.</Text>
        }
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#faf8f6' },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf8f6',
  },
  cargando: { marginTop: 10, color: '#6b6560' },
  contenido: { padding: 16, paddingBottom: 32 },
  encabezado: { marginBottom: 16 },
  titulo: { fontSize: 28, fontWeight: '700', color: '#1f1d1b' },
  subtitulo: { fontSize: 14, color: '#6b6560', marginTop: 2 },
  boton: {
    backgroundColor: '#e8590c',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  botonTexto: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
  categoria: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8a8278',
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 8,
  },
  vacio: {
    textAlign: 'center',
    color: '#8a8278',
    marginTop: 40,
  },
  error: {
    backgroundColor: '#fde8e8',
    color: '#c0392b',
    padding: 10,
    margin: 16,
    borderRadius: 8,
  },
});
