// PANTALLA: Registro de una cuenta nueva

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
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { validarRegistro } from '../lib/validarCuenta';

export default function PantallaRegistro() {
  const router = useRouter();
  const { crearCuenta } = useAuth();

  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    clave: '',
    confirmacion: '',
  });
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState('');
  const [guardando, setGuardando] = useState(false);

  function cambiar(campo, valor) {
    setDatos((antes) => ({ ...antes, [campo]: valor }));
    setErrores((antes) => ({ ...antes, [campo]: undefined }));
    setAviso('');
  }

  async function enviar() {
    const { errores: errs, esValido } = validarRegistro(datos);
    setErrores(errs);
    if (!esValido) return;

    try {
      setGuardando(true);
      await crearCuenta(datos);
      router.replace('/');
    } catch (e) {
      setAviso(e.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={estilos.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={estilos.contenido}>
        <Stack.Screen options={{ title: 'Crear cuenta' }} />

        <Text style={estilos.titulo}>Crear cuenta</Text>
        <Text style={estilos.subtitulo}>
          Registrese para hacer pedidos en TacoExpress
        </Text>

        {!!aviso && <Text style={estilos.aviso}>{aviso}</Text>}

        <Text style={estilos.etiqueta}>Nombre</Text>
        <TextInput
          style={[estilos.campo, errores.nombre && estilos.campoError]}
          value={datos.nombre}
          onChangeText={(texto) => cambiar('nombre', texto)}
          placeholder="Su nombre"
          placeholderTextColor="#b0a9a1"
        />
        {!!errores.nombre && <Text style={estilos.error}>{errores.nombre}</Text>}

        <Text style={estilos.etiqueta}>Correo</Text>
        <TextInput
          style={[estilos.campo, errores.correo && estilos.campoError]}
          value={datos.correo}
          onChangeText={(texto) => cambiar('correo', texto)}
          placeholder="nombre@correo.com"
          placeholderTextColor="#b0a9a1"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {!!errores.correo && <Text style={estilos.error}>{errores.correo}</Text>}

        <Text style={estilos.etiqueta}>Contrasena</Text>
        <TextInput
          style={[estilos.campo, errores.clave && estilos.campoError]}
          value={datos.clave}
          onChangeText={(texto) => cambiar('clave', texto)}
          placeholder="Al menos 6 caracteres y un numero"
          placeholderTextColor="#b0a9a1"
          secureTextEntry
        />
        {!!errores.clave && <Text style={estilos.error}>{errores.clave}</Text>}

        <Text style={estilos.etiqueta}>Repetir contrasena</Text>
        <TextInput
          style={[estilos.campo, errores.confirmacion && estilos.campoError]}
          value={datos.confirmacion}
          onChangeText={(texto) => cambiar('confirmacion', texto)}
          placeholder="Escriba la contrasena otra vez"
          placeholderTextColor="#b0a9a1"
          secureTextEntry
        />
        {!!errores.confirmacion && (
          <Text style={estilos.error}>{errores.confirmacion}</Text>
        )}

        <TouchableOpacity
          style={[estilos.boton, guardando && estilos.botonApagado]}
          onPress={enviar}
          disabled={guardando}
        >
          <Text style={estilos.botonTexto}>
            {guardando ? 'Creando cuenta...' : 'Crear cuenta'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botonBorde} onPress={() => router.back()}>
          <Text style={estilos.botonBordeTexto}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#faf8f6' },
  contenido: { padding: 24, paddingBottom: 40 },
  titulo: { fontSize: 24, fontWeight: '700', color: '#1f1d1b', marginTop: 8 },
  subtitulo: { fontSize: 14, color: '#6b6560', marginTop: 4, marginBottom: 8 },
  aviso: {
    backgroundColor: '#fde8e8',
    color: '#c0392b',
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    marginTop: 10,
  },
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
  campoError: { borderColor: '#c0392b' },
  error: { color: '#c0392b', fontSize: 12, marginTop: 4 },
  boton: {
    backgroundColor: '#e8590c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botonApagado: { opacity: 0.6 },
  botonTexto: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
  botonBorde: {
    borderWidth: 1,
    borderColor: '#d8d3cd',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  botonBordeTexto: { color: '#4a4540', fontWeight: '600', fontSize: 15 },
});
