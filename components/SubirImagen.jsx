'use client';

// CAPA DE PRESENTACION
// Campo para subir la foto de un platillo.
// Recibe la URL actual y avisa hacia arriba cuando cambia.

import { useState } from 'react';

const TIPOS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX = 2 * 1024 * 1024; // 2 MB

export default function SubirImagen({ valor = '', onCambio = () => {} }) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');

  async function seleccionar(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    setError('');

    // Validacion antes de gastar datos subiendo algo que sera rechazado.
    if (!TIPOS.includes(archivo.type)) {
      setError('Use una imagen JPG, PNG o WEBP.');
      return;
    }
    if (archivo.size > MAX) {
      setError('La imagen no debe pasar de 2 MB.');
      return;
    }

    const cuerpo = new FormData();
    cuerpo.append('imagen', archivo);

    try {
      setSubiendo(true);
      const respuesta = await fetch('/api/subir-imagen', {
        method: 'POST',
        body: cuerpo,
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || 'No se pudo subir la imagen.');
        return;
      }

      onCambio(datos.url);
    } catch (e) {
      setError('No se pudo conectar para subir la imagen.');
    } finally {
      setSubiendo(false);
      // Se limpia el input para poder volver a elegir el mismo archivo.
      evento.target.value = '';
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        Foto del platillo
      </label>

      {valor ? (
        <div className="flex items-center gap-3">
          <img
            src={valor}
            alt="Vista previa"
            className="h-20 w-20 rounded-md object-cover border border-neutral-200"
          />
          <button
            type="button"
            onClick={() => onCambio('')}
            className="text-xs text-red-600 underline"
          >
            Quitar foto
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={seleccionar}
          disabled={subiendo}
          className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-sm file:text-white disabled:opacity-50"
        />
      )}

      {subiendo && <p className="mt-1 text-xs text-neutral-500">Subiendo imagen...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}