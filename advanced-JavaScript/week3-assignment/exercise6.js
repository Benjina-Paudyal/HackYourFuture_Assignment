const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}

async function getAuthToken() {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "example@example.com",
      password: "Passw0rd",
    }),
  });

  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  return data.token;
}

async function createOrder(items) {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to create order: ${response.status} - ${errorData.detail}`,
    );
  }

  return response.json();
}

async function getMyOrders() {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

//  Test
signup("example@example.com", "Passw0rd") // ignore error if already signed up
  .catch(() => {})
  .then(() => createOrder([{ teaId: 1, grams: 100 }]))
  .then((order) => console.log("Created order:", order.id))
  .then(() => getMyOrders())
  .then((orders) => console.log("All orders count:", orders.length))
  .catch((err) => console.error("Error:", err.message));
