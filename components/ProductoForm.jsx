'use client';

// CAPA DE PRESENTACION
// Formulario para crear o editar un producto. No sabe nada de la API:
// recibe los datos, valida, y avisa hacia arriba con onGuardar.

import { useState, useEffect } from 'react';
import { CATEGORIAS } from '@/lib/almacenProductos';
import { validarProducto } from '@/lib/validarProducto';
import SubirImagen from '@/components/SubirImagen';

const VACIO = {
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
  imagen: '',
};

export default function ProductoForm({ productoEditando, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  // Si llega un producto para editar, se cargan sus valores en el formulario.
  useEffect(() => {
    if (productoEditando) {
      setDatos({
        nombre: productoEditando.nombre,
        descripcion: productoEditando.descripcion || '',
        precio: String(productoEditando.precio),
        categoria: productoEditando.categoria,
        imagen: productoEditando.imagen || '',
      });
    } else {
      setDatos(VACIO);
    }
    setErrores({});
  }, [productoEditando]);

  function cambiar(campo, valor) {
    setDatos((antes) => ({ ...antes, [campo]: valor }));
    // Se limpia el error de ese campo apenas el usuario corrige.
    setErrores((antes) => ({ ...antes, [campo]: undefined }));
  }

  async function enviar() {
    const { errores: errs, esValido } = validarProducto(datos);
    setErrores(errs);
    if (!esValido) return;

    setGuardando(true);
    const ok = await onGuardar({
      ...datos,
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
    });
    setGuardando(false);

    if (ok && !productoEditando) setDatos(VACIO);
  }

  const etiqueta = 'block text-sm font-medium text-neutral-700 mb-1';
  const campo =
    'w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900';
  const msgError = 'mt-1 text-xs text-red-600';

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        {productoEditando ? 'Editar platillo' : 'Nuevo platillo'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className={etiqueta} htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            className={campo}
            value={datos.nombre}
            onChange={(e) => cambiar('nombre', e.target.value)}
            placeholder="Tacos al pastor"
          />
          {errores.nombre && <p className={msgError}>{errores.nombre}</p>}
        </div>

        <div>
          <label className={etiqueta} htmlFor="descripcion">
            Descripcion
          </label>
          <textarea
            id="descripcion"
            className={campo}
            rows={2}
            value={datos.descripcion}
            onChange={(e) => cambiar('descripcion', e.target.value)}
            placeholder="Ingredientes principales"
          />
          {errores.descripcion && <p className={msgError}>{errores.descripcion}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={etiqueta} htmlFor="precio">
              Precio (USD)
            </label>
            <input
              id="precio"
              className={campo}
              type="number"
              step="0.01"
              min="0"
              value={datos.precio}
              onChange={(e) => cambiar('precio', e.target.value)}
              placeholder="3.50"
            />
            {errores.precio && <p className={msgError}>{errores.precio}</p>}
          </div>

          <div>
            <label className={etiqueta} htmlFor="categoria">
              Categoria
            </label>
            <select
              id="categoria"
              className={campo}
              value={datos.categoria}
              onChange={(e) => cambiar('categoria', e.target.value)}
            >
              <option value="">Seleccione...</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errores.categoria && <p className={msgError}>{errores.categoria}</p>}
          </div>
        </div>

        <SubirImagen
          valor={datos.imagen}
          onCambio={(url) => cambiar('imagen', url)}
        />

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={enviar}
            disabled={guardando}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : productoEditando ? 'Guardar cambios' : 'Agregar platillo'}
          </button>

          {productoEditando && (
            <button
              type="button"
              onClick={onCancelar}
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}