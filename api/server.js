import app from './vercel.js';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API local escuchando en http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💳 Create preference: http://localhost:${PORT}/api/create-preference`);
  console.log(`🔔 Webhook: http://localhost:${PORT}/api/webhook`);
}); 