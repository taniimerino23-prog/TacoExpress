// CAPA DE PRESENTACION
// Tarjeta de un platillo dentro de la lista del menu.
// No sabe de donde vienen los datos: solo los recibe y los muestra.

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EMOJI_CATEGORIA, fuenteImagen } from '../services/menuApi';

export default function TarjetaPlatillo({ platillo, onPress }) {
  const foto = fuenteImagen(platillo.imagen);

  return (
    <TouchableOpacity style={estilos.tarjeta} onPress={onPress} activeOpacity={0.7}>
      {foto ? (
        <Image source={foto} style={estilos.foto} />
      ) : (
        <View style={estilos.emojiCaja}>
          <Text style={estilos.emoji}>
            {EMOJI_CATEGORIA[platillo.categoria] || '\u{1F37D}'}
          </Text>
        </View>
      )}

      <View style={estilos.texto}>
        <View style={estilos.filaNombre}>
          <Text style={estilos.nombre} numberOfLines={1}>
            {platillo.nombre}
          </Text>
          {!platillo.disponible && (
            <View style={estilos.etiqueta}>
              <Text style={estilos.etiquetaTexto}>Agotado</Text>
            </View>
          )}
        </View>

        {!!platillo.descripcion && (
          <Text style={estilos.descripcion} numberOfLines={2}>
            {platillo.descripcion}
          </Text>
        )}

        <Text style={estilos.precio}>${Number(platillo.precio).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eceae7',
  },
  foto: { width: 64, height: 64, borderRadius: 12, marginRight: 12 },
  emojiCaja: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#fdf1e7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 30 },
  texto: { flex: 1, justifyContent: 'center' },
  filaNombre: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nombre: { fontSize: 16, fontWeight: '600', color: '#1f1d1b', flexShrink: 1 },
  etiqueta: {
    backgroundColor: '#fde8e8',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  etiquetaTexto: { fontSize: 11, fontWeight: '600', color: '#c0392b' },
  descripcion: { fontSize: 13, color: '#6b6560', marginTop: 2 },
  precio: { fontSize: 15, fontWeight: '700', color: '#1f1d1b', marginTop: 6 },
});
