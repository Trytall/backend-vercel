// Configuración de API para diferentes entornos
const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3000',
    timeout: 10000
  },
  production: {
    baseUrl: 'https://tu-backend.vercel.app', // Cambiar por tu URL de Vercel
    timeout: 15000
  }
};

// Detectar entorno
const isDevelopment = import.meta.env.DEV;
const config = API_CONFIG[isDevelopment ? 'development' : 'production'];

export const API_BASE_URL = config.baseUrl;
export const API_TIMEOUT = config.timeout;

// Funciones de API
export async function createPaymentPreference(paymentData) {
  const response = await fetch(`${API_BASE_URL}/api/create-preference`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
    signal: AbortSignal.timeout(API_TIMEOUT)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
} 