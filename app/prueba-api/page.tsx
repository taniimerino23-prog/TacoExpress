"use client";

import { useEffect, useState } from "react";
import { obtenerProductos, Producto } from "@/services/api";

export default function PruebaApi() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch {
        setError("Ocurrió un error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  if (cargando) {
    return <p className="p-8">Cargando productos...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>;
  }

  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Prueba de API</h1>

      <div className="space-y-4">
        {productos.map((producto) => (
          <div key={producto.id} className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p>Categoría: {producto.categoria}</p>
            <p>Precio: ${producto.precio.toFixed(2)}</p>
            <p>
              Estado: {producto.disponible ? "Disponible" : "No disponible"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}