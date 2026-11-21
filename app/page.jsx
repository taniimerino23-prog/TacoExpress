"use client";

import { useState, useEffect } from "react";
import { getOrders, updateOrder, createOrder } from "../services/ordersService";

const ESTADOS = [
  "En espera",
  "En preparación",
  "Listo para entregar",
  "Entregado",
];

export default function HomePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para el formulario de nuevo pedido
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState("");
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    // Cargar los pedidos al abrir la página
    getOrders()
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando pedidos:", error);
        setLoading(false);
      });
  }, []);

  // Agregar producto a la lista temporal
  const handleAddItem = (e) => {
    e.preventDefault();

    const cantidad = Number(itemQuantity);
    const precio = Number(itemPrice);

    if (
      !itemName.trim() ||
      !Number.isFinite(precio) ||
      precio <= 0 ||
      !Number.isInteger(cantidad) ||
      cantidad < 1
    ) {
      alert("Ingresa un producto, una cantidad válida y un precio mayor que cero.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: itemName.trim(),
      quantity: cantidad,
      price: precio,
    };

    setItemsList((prev) => [...prev, newItem]);

    // Limpiar campos
    setItemName("");
    setItemQuantity(1);
    setItemPrice("");
  };

  // Eliminar producto de la lista temporal
  const handleRemoveItem = (idToRemove) => {
    setItemsList((prev) =>
      prev.filter((item) => item.id !== idToRemove)
    );
  };

  // Guardar el pedido completo
  const handleCreateOrder = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || itemsList.length === 0) {
      alert("Por favor ingresa el nombre del cliente y añade al menos un producto.");
      return;
    }

    const total = itemsList.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newOrderData = {
      customerName: customerName.trim(),
      createdAt: new Date().toISOString(),
      status: "En espera",
      total,
      items: itemsList,
    };

    try {
      setLoading(true);

      const createdOrder = await createOrder(newOrderData);

      setOrders((prev) => [...prev, createdOrder]);
      setCustomerName("");
      setItemsList([]);

      alert("¡Pedido creado exitosamente!");
    } catch (error) {
      console.error("Error creando pedido:", error);
      alert("Hubo un error al guardar el pedido.");
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado del pedido
  const handleStatusChange = async (id, status) => {
    try {
      // Primero se confirma la actualización en el servidor
      await updateOrder(id, { status });

      // Solo si la actualización fue exitosa, se cambia la pantalla
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === id ? { ...ord, status } : ord
        )
      );
    } catch (error) {
      console.error("Error actualizando estado:", error);
      alert(
        "No se pudo actualizar el estado del pedido. Inténtalo nuevamente."
      );
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="p-8 text-center font-semibold text-gray-700">
        Cargando pedidos...
      </div>
    );
  }

  // Interfaz principal
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Gestión de Pedidos - TacoExpress
      </h1>

      {/* SECCIÓN 1: FORMULARIO DE NUEVO PEDIDO */}
      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10">
        <h2 className="text-xl font-semibold mb-6 text-orange-600">
          Crear Nuevo Pedido
        </h2>

        <form onSubmit={handleCreateOrder}>
          {/* Nombre del Cliente */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Cliente
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej. Juan Pérez"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          {/* Sección para añadir productos */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Añadir Productos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nombre del Producto
                </label>

                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Ej. Tacos al Pastor"
                  className="w-full p-2.5 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Cantidad
                </label>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                  className="w-full p-2.5 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Precio Unitario ($)
                </label>

                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  placeholder="Ej. 1.50"
                  className="w-full p-2.5 text-sm border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full bg-slate-700 text-white p-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  + Añadir Ítem
                </button>
              </div>
            </div>

            {/* Lista de productos añadidos */}
            {itemsList.length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Productos en esta orden:
                </h4>

                <ul className="space-y-2 text-sm">
                  {itemsList.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100"
                    >
                      <span>
                        {item.quantity}x {item.name} - $
                        {item.price.toFixed(2)} c/u
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="text-right mt-4 font-bold text-lg">
                  Total Temporal: $
                  {itemsList
                    .reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {/* Botón para guardar el pedido */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Guardar Orden Completa en TacoExpress
          </button>
        </form>
      </section>

      {/* SECCIÓN 2: MONITOR DE PEDIDOS */}
      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-slate-800">
          Monitor de Pedidos Recientes
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-10 border border-dashed border-gray-200 rounded-xl">
            No hay pedidos registrados todavía.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {order.customerName || "Cliente sin nombre"}
                    </h3>

                    <p className="text-xs text-gray-500">
                      ID: {order.id}
                    </p>

                    <p className="text-xs text-gray-400">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "Fecha no disponible"}
                    </p>
                  </div>

                  <span className="font-bold text-xl text-green-600">
                    ${(Number(order?.total) || 0).toFixed(2)}
                  </span>
                </div>

                {/* Lista de productos */}
                <div className="flex-grow border-t border-gray-100 pt-3 mb-4 space-y-1.5">
                  {Array.isArray(order?.items) && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <p
                        key={item.id || index}
                        className="text-sm text-gray-700 flex justify-between"
                      >
                        <span>
                          {item.quantity || 1}x {item.name || "Producto"}
                        </span>

                        <span className="font-medium text-gray-500">
                          $
                          {(
                            (Number(item?.quantity) || 1) *
                            (Number(item?.price) || 0)
                          ).toFixed(2)}
                        </span>
                      </p>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      Sin productos detallados
                    </p>
                  )}
                </div>

                {/* Control de estado */}
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Estado del Pedido
                  </label>

                  <select
                    value={order.status || "En espera"}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="w-full p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 font-medium focus:ring-1 focus:ring-orange-300"
                  >
                    {ESTADOS.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}