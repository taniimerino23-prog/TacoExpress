'use client';

import { useState, useEffect } from 'react';

const TIPOS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX = 2 * 1024 * 1024;

export default function SubirImagen({ valor = '', onCambio = () => {} }) {
  const [vistaPrevia, setVistaPrevia] = useState(valor);
  const [error, setError] = useState('');

  useEffect(() => {
    setVistaPrevia(valor);
  }, [valor]);

  function seleccionar(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;

    setError('');

    if (!TIPOS.includes(archivo.type)) {
      setError('Use una imagen JPG, PNG o WEBP.');
      evento.target.value = '';
      return;
    }

    if (archivo.size > MAX) {
      setError('La imagen no debe pasar de 2 MB.');
      evento.target.value = '';
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      const imagen = lector.result;
      setVistaPrevia(imagen);
      onCambio(imagen);
    };

    lector.onerror = () => {
      setError('No se pudo leer la imagen.');
    };

    lector.readAsDataURL(archivo);
    evento.target.value = '';
  }

  function quitarImagen() {
    setVistaPrevia('');
    onCambio('');
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        Foto del platillo
      </label>

      {vistaPrevia && (
        <div className="mb-3">
          <img
            src={vistaPrevia}
            alt="Vista previa del platillo"
            className="h-20 w-20 rounded-md object-cover border border-neutral-200"
          />

          <button
            type="button"
            onClick={quitarImagen}
            className="mt-2 text-xs text-red-600 underline"
          >
            Quitar foto
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={seleccionar}
        className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-sm file:text-white"
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}