// CAPA DE SERVICIOS
// Funciones que hablan con la API REST desde el navegador.
// Ningun componente hace fetch por su cuenta: todo pasa por aqui.

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

export type DatosProducto = Omit<Producto, "id" | "disponible">;

// Lee el mensaje de error que manda la API, si viene alguno.
async function revisar(respuesta: Response, mensajePorDefecto: string) {
  if (respuesta.ok) return;
  let detalle = mensajePorDefecto;
  try {
    const datos = await respuesta.json();
    if (datos?.error) detalle = datos.error;
  } catch {
    // La respuesta no traia JSON; se queda el mensaje por defecto.
  }
  throw new Error(detalle);
}

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await fetch("/api/productos");

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return respuesta.json();
}

export async function crearProducto(datos: DatosProducto): Promise<Producto> {
  const respuesta = await fetch("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  await revisar(respuesta, "No se pudo guardar el producto");
  return respuesta.json();
}

export async function actualizarProducto(
  id: number,
  datos: DatosProducto
): Promise<Producto> {
  const respuesta = await fetch(`/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  await revisar(respuesta, "No se pudo actualizar el producto");
  return respuesta.json();
}

export async function eliminarProducto(id: number): Promise<number> {
  const respuesta = await fetch(`/api/productos/${id}`, { method: "DELETE" });

  await revisar(respuesta, "No se pudo eliminar el producto");
  return id;
}

export async function alternarDisponibilidad(id: number): Promise<Producto> {
  const respuesta = await fetch(`/api/productos/${id}`, { method: "PATCH" });

  await revisar(respuesta, "No se pudo cambiar la disponibilidad");
  return respuesta.json();
}
