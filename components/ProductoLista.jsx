'use client';

// CAPA DE PRESENTACION
// Lista de productos agrupada por categoria.
// El prop "esAdmin" controla que botones se muestran: asi el modulo queda
// listo para conectarse al Context de sesion del modulo de autenticacion.

import { useState } from 'react';

export default function ProductoLista({
  productos = [],
  esAdmin = false,
  onEditar = () => {},
  onBorrar = () => {},
  onAlternar = () => {},
}) {
  const [confirmando, setConfirmando] = useState(null);

  if (productos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
        Aun no hay platillos registrados.
      </p>
    );
  }

  // Agrupa los productos por categoria para mostrarlos ordenados.
  const porCategoria = productos.reduce((acc, p) => {
    (acc[p.categoria] = acc[p.categoria] || []).push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(porCategoria).map(([categoria, items]) => (
        <section key={categoria}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            {categoria}
          </h3>

          <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
            {items.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-4 p-4">
                <div className="flex min-w-0 gap-3">
                  {p.imagen && (
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      className="h-14 w-14 shrink-0 rounded-md border border-neutral-200 object-cover"
                    />
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-neutral-900">{p.nombre}</span>
                      {!p.disponible && (
                        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                          Agotado
                        </span>
                      )}
                    </div>
                    {p.descripcion && (
                      <p className="mt-0.5 truncate text-sm text-neutral-600">{p.descripcion}</p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                      ${Number(p.precio).toFixed(2)}
                    </p>
                  </div>
                </div>

                {esAdmin && (
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <button
                      onClick={() => onAlternar(p.id)}
                      className="text-xs text-neutral-600 underline"
                    >
                      {p.disponible ? 'Marcar agotado' : 'Marcar disponible'}
                    </button>
                    <button
                      onClick={() => onEditar(p)}
                      className="text-xs text-neutral-600 underline"
                    >
                      Editar
                    </button>

                    {/* Confirmacion antes de borrar: evita el borrado por error
                        que senalo el docente como riesgo. */}
                    {confirmando === p.id ? (
                      <span className="flex gap-2">
                        <button
                          onClick={() => {
                            onBorrar(p.id);
                            setConfirmando(null);
                          }}
                          className="text-xs font-medium text-red-600 underline"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setConfirmando(null)}
                          className="text-xs text-neutral-500 underline"
                        >
                          No
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmando(p.id)}
                        className="text-xs text-red-600 underline"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}