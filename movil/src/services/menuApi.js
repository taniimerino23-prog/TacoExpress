// CAPA DE DATOS
// Aqui vive la lista de platillos y las operaciones sobre ella.
// Ninguna pantalla guarda datos por su cuenta: todas pasan por aqui.
//
// En esta etapa los datos estan en memoria. Cuando conectemos Firestore
// solo se cambian las funciones de este archivo y las pantallas no se tocan.

export const CATEGORIAS = [
  'Tacos',
  'Quesadillas',
  'Burritos',
  'Bebidas',
  'Complementos',
];

// Emoji que se muestra cuando el platillo no tiene foto
export const EMOJI_CATEGORIA = {
  Tacos: '\u{1F32E}',
  Quesadillas: '\u{1F9C0}',
  Burritos: '\u{1F32F}',
  Bebidas: '\u{1F964}',
  Complementos: '\u{1F952}',
};

let platillos = [
  {
    id: 1,
    nombre: 'Tacos al pastor',
    descripcion: 'Tortilla de maiz con carne al pastor, cebolla y cilantro.',
    categoria: 'Tacos',
    precio: 3.5,
    imagen: '',
    disponible: true,
  },
  {
    id: 2,
    nombre: 'Tacos de asada',
    descripcion: 'Carne asada picada, con salsa verde y limon.',
    categoria: 'Tacos',
    precio: 3.75,
    imagen: '',
    disponible: true,
  },
  {
    id: 3,
    nombre: 'Quesadilla de pollo',
    descripcion: 'Tortilla de harina rellena de queso y pollo.',
    categoria: 'Quesadillas',
    precio: 4.0,
    imagen: '',
    disponible: true,
  },
  {
    id: 4,
    nombre: 'Burrito de carne',
    descripcion: 'Burrito con carne, frijoles y arroz.',
    categoria: 'Burritos',
    precio: 5.0,
    imagen: '',
    disponible: false,
  },
  {
    id: 5,
    nombre: 'Horchata',
    descripcion: 'Bebida fria de arroz con canela. Vaso de 16 oz.',
    categoria: 'Bebidas',
    precio: 1.25,
    imagen: '',
    disponible: true,
  },
];

// Simula la demora de una peticion real, para que la pantalla
// muestre el estado de carga como lo hara con la base de datos.
const demora = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function listarPlatillos() {
  await demora();
  return [...platillos];
}

export async function buscarPlatillo(id) {
  await demora(200);
  return platillos.find((p) => String(p.id) === String(id));
}

export async function crearPlatillo(datos) {
  await demora();
  const nuevo = { ...datos, id: Date.now(), disponible: true };
  platillos = [...platillos, nuevo];
  return nuevo;
}

export async function alternarDisponible(id) {
  await demora(200);
  platillos = platillos.map((p) =>
    String(p.id) === String(id) ? { ...p, disponible: !p.disponible } : p
  );
  return platillos.find((p) => String(p.id) === String(id));
}

export async function eliminarPlatillo(id) {
  await demora(200);
  platillos = platillos.filter((p) => String(p.id) !== String(id));
  return id;
}

// Agrupa los platillos por categoria, en el formato que necesita
// la lista con secciones de la pantalla del menu.
export function agruparPorCategoria(lista) {
  const grupos = {};
  lista.forEach((p) => {
    (grupos[p.categoria] = grupos[p.categoria] || []).push(p);
  });
  return CATEGORIAS.filter((c) => grupos[c]).map((c) => ({
    title: c,
    data: grupos[c],
  }));
}
