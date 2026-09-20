// RUTA DE API (corre en el servidor, no en el navegador)
// El navegador manda la imagen aqui, y este archivo la reenvia a ImgBB.
//
// Por que no subir directo desde el navegador?
// Porque habria que poner la clave de ImgBB en el codigo del cliente, y
// cualquiera podria verla con F12. Aqui la clave se queda en el servidor.
// La rubrica pide justamente "no exponer credenciales ni API keys".

export async function POST(request) {
  const clave = process.env.IMGBB_API_KEY;

  if (!clave) {
    return Response.json(
      { error: 'Falta configurar IMGBB_API_KEY en .env.local' },
      { status: 500 }
    );
  }

  try {
    const formulario = await request.formData();
    const archivo = formulario.get('imagen');

    if (!archivo) {
      return Response.json({ error: 'No se recibio ninguna imagen.' }, { status: 400 });
    }

    // Validacion en el servidor. La del navegador se puede saltar,
    // asi que nunca se confia solo en ella.
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(archivo.type)) {
      return Response.json(
        { error: 'Formato no permitido. Use JPG, PNG o WEBP.' },
        { status: 400 }
      );
    }

    const MAX = 2 * 1024 * 1024; // 2 MB
    if (archivo.size > MAX) {
      return Response.json(
        { error: 'La imagen pesa mas de 2 MB.' },
        { status: 400 }
      );
    }

    // ImgBB espera la imagen en base64.
    const buffer = Buffer.from(await archivo.arrayBuffer());
    const base64 = buffer.toString('base64');

    const cuerpo = new FormData();
    cuerpo.append('image', base64);

    const respuesta = await fetch(
      `https://api.imgbb.com/1/upload?key=${clave}`,
      { method: 'POST', body: cuerpo }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok || !datos.success) {
      return Response.json(
        { error: 'ImgBB rechazo la imagen.' },
        { status: 502 }
      );
    }

    // Solo devolvemos lo que la app necesita: la URL publica y una miniatura.
    return Response.json({
      url: datos.data.url,
      miniatura: datos.data.thumb?.url || datos.data.url,
    });
  } catch (e) {
    return Response.json({ error: 'Error al subir la imagen.' }, { status: 500 });
  }
}