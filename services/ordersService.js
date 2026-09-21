const API_URL = "https://6ab07cb89751d2b03e6c2eec.mockapi.io";

export async function getOrders() {
  const response = await fetch(`${API_URL}/orders`);
  if (!response.ok) throw new Error("Error al obtener los pedidos.");
  return response.json();
}

export async function updateOrder(orderId, updatedFields) {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) throw new Error("Error al actualizar el pedido.");
  return response.json();
}

export async function createOrder(newOrder) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newOrder),
  });
  if (!response.ok) throw new Error("Error al crear el pedido.");
  return response.json();
}