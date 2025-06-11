export async function setLogin({ email, password }) {
  // CSRF cookie al
  await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });

  // Tarayıcıdaki CSRF token’ı oku
  const xsrfToken = getCookie("XSRF-TOKEN");

  // Login isteği gönder
  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken), // Bu çok önemli
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Giriş başarısız");
  }

  const data = await res.json();
  console.log(data);
  return data;
}

// Yardımcı fonksiyon (çerezden değer alır)
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
}

export async function logout() {
  await fetch("http://localhost:8000/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
}
