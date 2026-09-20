export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  disponible: boolean;
}

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await fetch("/api/productos");

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return respuesta.json();
}