'use client';

// CAPA DE LOGICA - estado global
// Este es el Context API que pide la rubrica. Guarda la lista de productos
// y expone las operaciones. Los componentes de pantalla no llaman a la API
// directamente: le piden las cosas a este contexto.

import { createContext, useContext, useEffect, useState } from 'react';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  alternarDisponibilidad,
} from '@/services/api';

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Carga inicial desde la API REST
  useEffect(() => {
    let activo = true;
    (async () => {
      try {
        setCargando(true);
        const datos = await obtenerProductos();
        if (activo) setProductos(datos);
      } catch (e) {
        if (activo) setError(e.message || 'No se pudo cargar el menu.');
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  async function agregar(datos) {
    setError('');
    try {
      const nuevo = await crearProducto(datos);
      setProductos((antes) => [...antes, nuevo]);
      return true;
    } catch (e) {
      setError(e.message || 'No se pudo guardar el producto.');
      return false;
    }
  }

  async function editar(id, datos) {
    setError('');
    try {
      const actualizado = await actualizarProducto(id, datos);
      setProductos((antes) =>
        antes.map((p) => (p.id === id ? actualizado : p))
      );
      return true;
    } catch (e) {
      setError(e.message || 'No se pudo actualizar el producto.');
      return false;
    }
  }

  async function borrar(id) {
    setError('');
    try {
      await eliminarProducto(id);
      setProductos((antes) => antes.filter((p) => p.id !== id));
      return true;
    } catch (e) {
      setError(e.message || 'No se pudo eliminar el producto.');
      return false;
    }
  }

  async function cambiarDisponibilidad(id) {
    setError('');
    try {
      const actualizado = await alternarDisponibilidad(id);
      setProductos((antes) =>
        antes.map((p) => (p.id === id ? actualizado : p))
      );
    } catch (e) {
      setError(e.message || 'No se pudo cambiar la disponibilidad.');
    }
  }

  const valor = {
    productos,
    cargando,
    error,
    agregar,
    editar,
    borrar,
    cambiarDisponibilidad,
  };

  return <MenuContext.Provider value={valor}>{children}</MenuContext.Provider>;
}

// Hook para usar el contexto sin repetir useContext en cada componente.
export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error('useMenu debe usarse dentro de <MenuProvider>');
  }
  return ctx;
}