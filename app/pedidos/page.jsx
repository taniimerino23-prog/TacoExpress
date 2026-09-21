"use client";
import { useState, useEffect } from "react";
import { getOrders, updateOrder, createOrder } from "../../services/ordersService";

const ESTADOS = ["En espera", "En preparación", "Listo para entregar", "Entregado"];

export default function Modulo3Page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para la edición de nombres
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  // Estado para el formulario de nuevo pedido
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState("");
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Agregar producto a la lista temporal del formulario
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice) return;

    const newItem = {
      name: itemName,
      quantity: Number(itemQuantity),
      price: parseFloat(itemPrice),
    };

    setItemsList([...itemsList, newItem]);
    setItemName("");
    setItemQuantity(1);
    setItemPrice("");
  };

  // Guardar el pedido completo en json-server
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || itemsList.length === 0) {
      alert("Por favor ingresa el nombre del cliente y al menos un producto.");
      return;
    }

    const total = itemsList.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const newOrderData = {
      id: `ORD-${Date.now().toString().slice(-3)}`,
      customerName,
      createdAt: new Date().toISOString(),
      status: "En espera",
      total,
      items: itemsList,
    };

    try {
      const created = await createOrder(newOrderData);
      setOrders([...orders, created]);
      // Limpiar formulario
      setCustomerName("");
      setItemsList([]);
    } catch (error) {
      alert("Error al guardar la orden.");
    }
  };

  // Cambiar estado del pedido
  const handleStatusChange = async (id, status) => {
    try {
      await updateOrder(id, { status });
      setOrders((prev) =>
        prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
      );
    } catch (error) {
      alert("No se pudo actualizar el estado.");
    }
  };

  // Editar nombre del cliente
  const handleSaveName = async (id) => {
    if (!newName.trim()) return;
    try {
      await updateOrder(id, { customerName: newName });
      setOrders((prev) =>
        prev.map((ord) => (ord.id === id ? { ...ord, customerName: newName } : ord))
      );
      setEditingId(null);
      setNewName("");
    } catch (error) {
      alert("No se pudo editar el nombre.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center font-semibold text-gray-700">Cargando pedidos...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* ➕ FORMULARIO PARA CREAR PEDIDO */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">➕ Crear Nueva Orden</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Cliente:</label>
            <input
              type="text"
              placeholder="Ej. Ana Martínez"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border p-2 rounded text-sm text-gray-800 border-gray-300"
            />
          </div>

          {/* Formulario secundario para añadir ítems */}
          <div className="p-4 bg-gray-50 rounded border border-gray-200 space-y-3">
            <p className="text-sm font-semibold text-gray-700">Agregar Producto al Pedido:</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Producto (ej. Taco al Pastor)"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border p-2 rounded text-sm text-gray-800 border-gray-300 col-span-2"
              />
              <input
                type="number"
                min="1"
                placeholder="Cant."
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                className="border p-2 rounded text-sm text-gray-800 border-gray-300"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio ($)"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                className="border p-2 rounded text-sm text-gray-800 border-gray-300"
              />
            </div>
            <button
              onClick={handleAddItem}
              className="bg-gray-800 text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-gray-700"
            >
              + Agregar Ítem
            </button>
          </div>

          {/* Lista preliminar de items agregados */}
          {itemsList.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Productos añadidos:</p>
              <ul className="text-sm divide-y divide-gray-100">
                {itemsList.map((it, i) => (
                  <li key={i} className="py-1 text-gray-700">
                    • {it.quantity}x {it.name} - ${it.price.toFixed(2)} c/u
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleCreateOrder}
            className="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600 transition-colors shadow"
          >
            Guardar Orden en la Web
          </button>
        </div>
      </div>

      {/* 📋 LISTA DE PEDIDOS */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Monitor de Pedidos
        </h1>
        <div className="grid gap-4">
          {orders.map((ord) => (
            <div key={ord.id} className="p-5 border rounded-lg shadow-sm bg-white border-gray-200">
              {/* Cabecera del Pedido */}
              <div className="flex justify-between items-center mb-3">
                {editingId === ord.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="border p-1 text-sm rounded bg-gray-50 border-gray-300"
                    />
                    <button
                      onClick={() => handleSaveName(ord.id)}
                      className="bg-green-600 text-white text-xs px-3 py-1.5 rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white text-xs px-2 py-1.5 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-gray-800">
                      Pedido #{ord.id} — {ord.customerName}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingId(ord.id);
                        setNewName(ord.customerName);
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 border rounded"
                    >
                      ✏️ Editar nombre
                    </button>
                  </div>
                )}

                <span className="text-sm font-semibold text-gray-700">
                  Total: ${ord.total?.toFixed(2)}
                </span>
              </div>

              {/* Items */}
              <div className="mb-3 pl-2 border-l-2 border-orange-400 bg-orange-50/50 p-2 rounded-r">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Items:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {ord.items?.map((item, idx) => (
                    <li key={idx}>
                      • {item.quantity}x <strong>{item.name}</strong> (${item.price?.toFixed(2)})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Estado */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <label className="text-sm font-medium text-gray-700">Estado:</label>
                <select
                  value={ord.status}
                  onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                  className="border p-1.5 rounded text-sm bg-gray-50 text-gray-800"
                >
                  {ESTADOS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}