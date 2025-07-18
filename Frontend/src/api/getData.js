const API_URL = import.meta.env.VITE_API_URL;
const CAR_API_URL = import.meta.env.VITE_CAR_API_URL;
const LOCALHOST = import.meta.env.VITE_LOCALHOST;

export const getData = async (path) => {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error("Błąd pobierania danych");
  let data = await response.json();
  return data;
};
export const getDataParams = async (endpoint, params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `${API_URL}${endpoint}${queryString ? "?" + queryString : ""}`
  );
  if (!response.ok) throw new Error("Błąd pobierania danych");
  let data = await response.json();
  return data;
};
export const getDataBodyType = async (endpoint, param) => {
  const response = await fetch(
    `${API_URL}${endpoint}${"?bodyType=" + param}${"&PageSize=5"}`
  );
  if (!response.ok) throw new Error("Błąd pobierania danych");
  let data = await response.json();
  return data;
};
export const getCarApiData = async (path) => {
  const response = await fetch(`${CAR_API_URL}${path}`);
  console.log(`${CAR_API_URL}${path}`);
  if (!response.ok) throw new Error("Błąd pobierania danych");
  let data = await response.json();
  return data;
};
export const register = async (params) => {
  console.log(params);
  const response = await fetch(`${API_URL}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error("Błąd pobierania danych");
  let data = await response.json();
  return data;
};
export const login = async (params) => {
  const response = await fetch(
    `${LOCALHOST}login?useCookies=true&useSessionCookies=true`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(params),
    }
  );
  if (!response.ok) throw new Error("Błąd pobierania danych");
  console.log(response);
  return "Zalogowano pomyślnie!";
};
export const fetchUser = async (id) => {
  const res = await fetch(`https://localhost:7067/api/user/${id ? id : ""}`, {
    method: "GET",
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    console.log("Nie udało się pobrać użytkownika");
  }
};
export const fetchChatHistory = async (userId) => {
  const res = await fetch(`${API_URL}chat/history/${userId}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Nie udało się pobrać wiadomości");
  return await res.json(); // [{ from, to, text, timestamp }]
};
export const fetchAllChatHistory = async () => {
  const res = await fetch(`${API_URL}chat/history/`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Nie udało się pobrać wiadomości");
  return await res.json(); // [{ from, to, text, timestamp }]
};
export const logout = async () => {
  const res = await fetch(`${LOCALHOST}logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Nie udało się wylogować");
  return await res.json();
};
