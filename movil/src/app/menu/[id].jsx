// PANTALLA: Detalle de un platillo
// Recibe el id por la direccion y pide ese platillo al servicio.

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  alternarDisponible,
  buscarPlatillo,
  EMOJI_CATEGORIA,
} from '../../services/menuApi';

export default function PantallaDetalle() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [platillo, setPlatillo] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    (async () => {
      const encontrado = await buscarPlatillo(id);
      if (activo) {
        setPlatillo(encontrado);
        setCargando(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, [id]);

  async function cambiarDisponibilidad() {
    const actualizado = await alternarDisponible(id);
    setPlatillo(actualizado);
  }

  if (cargando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" color="#e8590c" />
      </View>
    );
  }

  if (!platillo) {
    return (
      <View style={estilos.centro}>
        <Text style={estilos.vacio}>Este platillo ya no existe.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={estilos.enlace}>Volver al menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Stack.Screen options={{ title: platillo.nombre }} />

      {platillo.imagen ? (
        <Image source={{ uri: platillo.imagen }} style={estilos.foto} />
      ) : (
        <View style={estilos.emojiCaja}>
          <Text style={estilos.emoji}>
            {EMOJI_CATEGORIA[platillo.categoria] || '\u{1F37D}'}
          </Text>
        </View>
      )}

      <Text style={estilos.categoria}>{platillo.categoria.toUpperCase()}</Text>
      <Text style={estilos.nombre}>{platillo.nombre}</Text>
      <Text style={estilos.precio}>${Number(platillo.precio).toFixed(2)}</Text>

      {!!platillo.descripcion && (
        <Text style={estilos.descripcion}>{platillo.descripcion}</Text>
      )}

      <View style={platillo.disponible ? estilos.cajaVerde : estilos.cajaRoja}>
        <Text style={platillo.disponible ? estilos.textoVerde : estilos.textoRojo}>
          {platillo.disponible ? 'Disponible' : 'Agotado'}
        </Text>
      </View>

      <TouchableOpacity style={estilos.boton} onPress={cambiarDisponibilidad}>
        <Text style={estilos.botonTexto}>
          {platillo.disponible ? 'Marcar agotado' : 'Marcar disponible'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.botonGris} onPress={() => router.back()}>
        <Text style={estilos.botonGrisTexto}>Volver al menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#faf8f6' },
  contenido: { padding: 20, paddingBottom: 40 },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf8f6',
  },
  foto: { width: '100%', height: 200, borderRadius: 16, marginBottom: 18 },
  emojiCaja: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    backgroundColor: '#fdf1e7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emoji: { fontSize: 64 },
  categoria: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8a8278',
    letterSpacing: 1,
  },
  nombre: { fontSize: 24, fontWeight: '700', color: '#1f1d1b', marginTop: 4 },
  precio: { fontSize: 20, fontWeight: '700', color: '#e8590c', marginTop: 6 },
  descripcion: { fontSize: 15, color: '#4a4540', marginTop: 12, lineHeight: 22 },
  cajaVerde: {
    backgroundColor: '#e7f6ec',
    borderRadius: 8,
    padding: 10,
    marginTop: 18,
    alignItems: 'center',
  },
  cajaRoja: {
    backgroundColor: '#fde8e8',
    borderRadius: 8,
    padding: 10,
    marginTop: 18,
    alignItems: 'center',
  },
  textoVerde: { color: '#1e7a44', fontWeight: '600' },
  textoRojo: { color: '#c0392b', fontWeight: '600' },
  boton: {
    backgroundColor: '#1f1d1b',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  botonTexto: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
  botonGris: {
    borderWidth: 1,
    borderColor: '#d8d3cd',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  botonGrisTexto: { color: '#4a4540', fontWeight: '600', fontSize: 15 },
  vacio: { color: '#6b6560', marginBottom: 10 },
  enlace: { color: '#e8590c', fontWeight: '600' },
});
