import { NextResponse } from "next/server";
import {
  actualizar,
  eliminar,
  alternarDisponible,
  buscar,
  CATEGORIAS,
} from "@/lib/almacenProductos";

// En Next.js 15 en adelante, params llega como promesa y hay que esperarla.
type Contexto = { params: Promise<{ id: string }> };

// PUT /api/productos/5 -> edita un producto completo
export async function PUT(request: Request, { params }: Contexto) {
  const { id } = await params;
  const idNum = Number(id);

  if (!buscar(idNum)) {
    return NextResponse.json(
      { error: "El producto no existe." },
      { status: 404 }
    );
  }

  const datos = await request.json();
  const nombre = String(datos.nombre || "").trim();
  const precio = Number(datos.precio);
  const categoria = String(datos.categoria || "");

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

  const actualizado = actualizar(idNum, {
    nombre,
    descripcion: String(datos.descripcion || "").trim(),
    categoria,
    precio,
    imagen: String(datos.imagen || ""),
  });

  return NextResponse.json(actualizado);
}

// PATCH /api/productos/5 -> cambia solo la disponibilidad
export async function PATCH(request: Request, { params }: Contexto) {
  const { id } = await params;
  const actualizado = alternarDisponible(Number(id));

  if (!actualizado) {
    return NextResponse.json(
      { error: "El producto no existe." },
      { status: 404 }
    );
  }

  return NextResponse.json(actualizado);
}

// DELETE /api/productos/5 -> elimina un producto
export async function DELETE(request: Request, { params }: Contexto) {
  const { id } = await params;
  const borrado = eliminar(Number(id));

  if (!borrado) {
    return NextResponse.json(
      { error: "El producto no existe." },
      { status: 404 }
    );
  }

  return NextResponse.json({ id: Number(id) });
}