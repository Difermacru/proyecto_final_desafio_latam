// URL del backend: variable de entorno en producción, o localhost en desarrollo
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';