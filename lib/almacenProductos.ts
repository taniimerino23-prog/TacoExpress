// CAPA DE DATOS
// Aqui vive la lista de productos y las operaciones sobre ella.
// Las rutas de la API importan de aqui, asi las dos comparten los mismos datos.
//
// Por ahora esta en memoria. Cuando conectemos Firebase, solo se cambian las
// funciones de este archivo y el resto de la app no se toca.

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

export const CATEGORIAS = [
  "Tacos",
  "Quesadillas",
  "Burritos",
  "Bebidas",
  "Complementos",
];

let productos: Producto[] = [
  {
    id: 1,
    nombre: "Tacos al pastor",
    descripcion: "Tortilla de maiz con carne al pastor, cebolla y cilantro.",
    categoria: "Tacos",
    precio: 3.5,
    imagen: "",
    disponible: true,
  },
  {
    id: 2,
    nombre: "Quesadilla de pollo",
    descripcion: "Tortilla de harina rellena de queso y pollo.",
    categoria: "Quesadillas",
    precio: 4.0,
    imagen: "",
    disponible: true,
  },
  {
    id: 3,
    nombre: "Burrito de carne",
    descripcion: "Burrito con carne, frijoles y arroz.",
    categoria: "Burritos",
    precio: 5.0,
    imagen: "",
    disponible: true,
  },
];

export function listar(): Producto[] {
  return productos;
}

export function buscar(id: number): Producto | undefined {
  return productos.find((p) => p.id === id);
}

export function crear(datos: Omit<Producto, "id" | "disponible">): Producto {
  const nuevo: Producto = { ...datos, id: Date.now(), disponible: true };
  productos = [...productos, nuevo];
  return nuevo;
}

export function actualizar(
  id: number,
  datos: Partial<Producto>
): Producto | undefined {
  productos = productos.map((p) => (p.id === id ? { ...p, ...datos, id } : p));
  return buscar(id);
}

export function eliminar(id: number): boolean {
  const antes = productos.length;
  productos = productos.filter((p) => p.id !== id);
  return productos.length < antes;
}

export function alternarDisponible(id: number): Producto | undefined {
  const actual = buscar(id);
  if (!actual) return undefined;
  return actualizar(id, { disponible: !actual.disponible });
}