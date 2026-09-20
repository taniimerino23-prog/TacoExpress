import { NextResponse } from "next/server";
import { listar, crear, CATEGORIAS } from "@/lib/almacenProductos";

// GET /api/productos  -> devuelve todos los productos
export async function GET() {
  return NextResponse.json(listar());
}

// POST /api/productos -> crea un producto nuevo
export async function POST(request: Request) {
  const datos = await request.json();

  const nombre = String(datos.nombre || "").trim();
  const precio = Number(datos.precio);
  const categoria = String(datos.categoria || "");

  // Validacion en el servidor. La del navegador se puede saltar,
  // asi que nunca se confia solo en ella.
  if (nombre.length < 3) {
    return NextResponse.json(
      { error: "El nombre debe tener al menos 3 caracteres." },
      { status: 400 }
    );
  }
  if (Number.isNaN(precio) || precio <= 0) {
    return NextResponse.json(
      { error: "El precio debe ser mayor que cero." },
      { status: 400 }
    );
  }
  if (!CATEGORIAS.includes(categoria)) {
    return NextResponse.json(
      { error: "La categoria no es valida." },
      { status: 400 }
    );
  }

  const nuevo = crear({
    nombre,
    descripcion: String(datos.descripcion || "").trim(),
    categoria,
    precio,
    imagen: String(datos.imagen || ""),
  });

  return NextResponse.json(nuevo, { status: 201 });
}