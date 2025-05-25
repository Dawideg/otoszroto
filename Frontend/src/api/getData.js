const API_URL = import.meta.env.VITE_API_URL;
const CAR_API_URL = import.meta.env.VITE_CAR_API_URL;

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
export const getCarApiData = async (path) => {
  const response = await fetch(`${CAR_API_URL}${path}`);
  console.log(`${CAR_API_URL}${path}`);
  if (!response.ok) throw new Error("Błąd pobierania danych");
  let data = await response.json();
  return data;
};
