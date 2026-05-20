const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getToken = () => localStorage.getItem('meowtopia_token');

const headers = (withAuth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (withAuth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

const handleResponse = async (res) => {
  // Guard against empty body (server down, proxy error, etc.)
  const text = await res.text();
  if (!text) throw new Error('No response from server. Make sure the backend is running.');
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Invalid response from server.');
  }
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

const safeFetch = (url, options) =>
  fetch(url, options).catch(() => {
    throw new Error('Cannot reach the server. Make sure the backend is running on port 5000.');
  });

// Auth
export const apiSignup = (email, password) =>
  safeFetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const apiLogin = (email, password) =>
  safeFetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const apiGetMe = () =>
  safeFetch(`${BASE_URL}/auth/me`, {
    headers: headers(true),
  }).then(handleResponse);

// Cats
export const apiGetCats = () =>
  safeFetch(`${BASE_URL}/cats`, { headers: headers(true) }).then(handleResponse);

export const apiGetCat = (id) =>
  safeFetch(`${BASE_URL}/cats/${id}`, { headers: headers(true) }).then(handleResponse);

// Favorites
export const apiGetFavorites = () =>
  safeFetch(`${BASE_URL}/favorites`, { headers: headers(true) }).then(handleResponse);

export const apiAddFavorite = (catId) =>
  safeFetch(`${BASE_URL}/favorites/${catId}`, {
    method: 'POST',
    headers: headers(true),
  }).then(handleResponse);

export const apiRemoveFavorite = (catId) =>
  safeFetch(`${BASE_URL}/favorites/${catId}`, {
    method: 'DELETE',
    headers: headers(true),
  }).then(handleResponse);

// Adoptions
export const apiGetAdoptions = () =>
  safeFetch(`${BASE_URL}/adoptions`, { headers: headers(true) }).then(handleResponse);

export const apiAdoptCat = (catId) =>
  safeFetch(`${BASE_URL}/adoptions/${catId}`, {
    method: 'POST',
    headers: headers(true),
  }).then(handleResponse);
