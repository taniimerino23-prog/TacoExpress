// PANTALLA: Nuevo platillo
// Formulario con validaciones. La pantalla solo muestra y recoge datos:
// las reglas estan en validarPlatillo y el guardado en el servicio.

import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { validarPlatillo } from '../../lib/validarPlatillo';
import { CATEGORIAS, crearPlatillo } from '../../services/menuApi';

const VACIO = { nombre: '', descripcion: '', precio: '', categoria: '' };

export default function PantallaNuevo() {
  const router = useRouter();
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  function cambiar(campo, valor) {
    setDatos((antes) => ({ ...antes, [campo]: valor }));
    // Se limpia el error de ese campo apenas el usuario corrige.
    setErrores((antes) => ({ ...antes, [campo]: undefined }));
  }

  async function guardar() {
    const { errores: errs, esValido } = validarPlatillo(datos);
    setErrores(errs);
    if (!esValido) return;

    setGuardando(true);
    await crearPlatillo({
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      categoria: datos.categoria,
      imagen: '',
    });
    setGuardando(false);
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={estilos.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={estilos.contenido}>
        <Stack.Screen options={{ title: 'Nuevo platillo' }} />
        <Text style={estilos.titulo}>Nuevo platillo</Text>

        <Text style={estilos.etiqueta}>Nombre</Text>
        <TextInput
          style={[estilos.campo, errores.nombre && estilos.campoError]}
          value={datos.nombre}
          onChangeText={(texto) => cambiar('nombre', texto)}
          placeholder="Tacos al pastor"
          placeholderTextColor="#b0a9a1"
        />
        {!!errores.nombre && <Text style={estilos.error}>{errores.nombre}</Text>}

        <Text style={estilos.etiqueta}>Descripcion</Text>
        <TextInput
          style={[estilos.campo, estilos.campoAlto, errores.descripcion && estilos.campoError]}
          value={datos.descripcion}
          onChangeText={(texto) => cambiar('descripcion', texto)}
          placeholder="Ingredientes principales"
          placeholderTextColor="#b0a9a1"
          multiline
        />
        {!!errores.descripcion && (
          <Text style={estilos.error}>{errores.descripcion}</Text>
        )}

        <Text style={estilos.etiqueta}>Precio (USD)</Text>
        <TextInput
          style={[estilos.campo, errores.precio && estilos.campoError]}
          value={datos.precio}
          onChangeText={(texto) => cambiar('precio', texto)}
          placeholder="3.50"
          placeholderTextColor="#b0a9a1"
          keyboardType="decimal-pad"
        />
        {!!errores.precio && <Text style={estilos.error}>{errores.precio}</Text>}

        <Text style={estilos.etiqueta}>Categoria</Text>
        <View style={estilos.pastillas}>
          {CATEGORIAS.map((categoria) => {
            const activa = datos.categoria === categoria;
            return (
              <TouchableOpacity
                key={categoria}
                style={[estilos.pastilla, activa && estilos.pastillaActiva]}
                onPress={() => cambiar('categoria', categoria)}
              >
                <Text style={activa ? estilos.pastillaTextoActivo : estilos.pastillaTexto}>
                  {categoria}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!!errores.categoria && <Text style={estilos.error}>{errores.categoria}</Text>}

        <TouchableOpacity
          style={[estilos.boton, guardando && estilos.botonApagado]}
          onPress={guardar}
          disabled={guardando}
        >
          <Text style={estilos.botonTexto}>
            {guardando ? 'Guardando...' : 'Agregar platillo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botonGris} onPress={() => router.back()}>
          <Text style={estilos.botonGrisTexto}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#faf8f6' },
  contenido: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 24, fontWeight: '700', color: '#1f1d1b', marginBottom: 18 },
  etiqueta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a4540',
    marginBottom: 6,
    marginTop: 14,
  },
  campo: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd8d2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: '#1f1d1b',
  },
  campoAlto: { height: 80, textAlignVertical: 'top' },
  campoError: { borderColor: '#c0392b' },
  error: { color: '#c0392b', fontSize: 12, marginTop: 4 },
  pastillas: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pastilla: {
    borderWidth: 1,
    borderColor: '#ddd8d2',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pastillaActiva: { backgroundColor: '#e8590c', borderColor: '#e8590c' },
  pastillaTexto: { color: '#4a4540', fontSize: 13 },
  pastillaTextoActivo: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  boton: {
    backgroundColor: '#e8590c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botonApagado: { opacity: 0.6 },
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
});
