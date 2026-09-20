'use client';

// PANTALLA del modulo de menu.
// Une el contexto, el formulario y la lista. No contiene logica de negocio.

import { useState } from 'react';
import { MenuProvider, useMenu } from '@/context/MenuContext';
import ProductoForm from '@/components/ProductoForm';
import ProductoLista from '@/components/ProductoLista';

function MenuContenido() {
  const { productos, cargando, error, agregar, editar, borrar, cambiarDisponibilidad } = useMenu();
  const [editando, setEditando] = useState(null);

  // TEMPORAL: cuando este listo el Context de sesion del modulo de
  // autenticacion, esta linea se reemplaza por algo como:
  //   const { usuario } = useAuth();
  //   const esAdmin = usuario?.rol === 'admin';
  const [esAdmin, setEsAdmin] = useState(true);

  async function guardar(datos) {
    if (editando) {
      const ok = await editar(editando.id, datos);
      if (ok) setEditando(null);
      return ok;
    }
    return agregar(datos);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Menu</h1>
          <p className="text-sm text-neutral-600">Taqueria Los Hernandez</p>
        </div>

        {/* Interruptor temporal para probar los permisos sin tener el login listo */}
        <label className="flex items-center gap-2 text-xs text-neutral-600">
          <input
            type="checkbox"
            checked={esAdmin}
            onChange={(e) => setEsAdmin(e.target.checked)}
          />
          Modo administrador
        </label>
      </header>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {esAdmin && (
        <div className="mb-8">
          <ProductoForm
            productoEditando={editando}
            onGuardar={guardar}
            onCancelar={() => setEditando(null)}
          />
        </div>
      )}

      {cargando ? (
        <p className="text-sm text-neutral-500">Cargando menu...</p>
      ) : (
        <ProductoLista
          productos={productos}
          esAdmin={esAdmin}
          onEditar={(p) => {
            setEditando(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBorrar={borrar}
          onAlternar={cambiarDisponibilidad}
        />
      )}
    </main>
  );
}

export default function PaginaMenu() {
  return (
    <MenuProvider>
      <MenuContenido />
    </MenuProvider>
  );
}