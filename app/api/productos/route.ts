import { NextResponse } from "next/server";

const productos = [
  {
    id: 1,
    nombre: "Tacos al pastor",
    categoria: "Tacos",
    precio: 3.5,
    disponible: true,
  },
  {
    id: 2,
    nombre: "Quesadilla de pollo",
    categoria: "Quesadillas",
    precio: 4.0,
    disponible: true,
  },
  {
    id: 3,
    nombre: "Burrito de carne",
    categoria: "Burritos",
    precio: 5.0,
    disponible: true,
  },
];

export async function GET() {
  return NextResponse.json(productos);
}