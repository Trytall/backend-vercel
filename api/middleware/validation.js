// Validation middleware
export function validatePaymentData(req, res, next) {
  const { nombre, email, telefono, provincia, localidad, modalidad, cursos, totalAmount } = req.body;
  
  const errors = [];
  
  // Required fields validation
  if (!nombre || nombre.trim().length < 2) {
    errors.push('Nombre debe tener al menos 2 caracteres');
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email inválido');
  }
  
  if (!telefono || telefono.length < 8) {
    errors.push('Teléfono inválido');
  }
  
  if (!provincia || provincia.trim().length < 2) {
    errors.push('Provincia requerida');
  }
  
  if (!localidad || localidad.trim().length < 2) {
    errors.push('Localidad requerida');
  }
  
  if (!modalidad || !['online', 'presencial'].includes(modalidad.toLowerCase())) {
    errors.push('Modalidad inválida');
  }
  
  if (!cursos || !Array.isArray(cursos) || cursos.length === 0) {
    errors.push('Debe seleccionar al menos un curso');
  }
  
  if (!totalAmount || isNaN(totalAmount) || totalAmount < 1000) {
    errors.push('Monto inválido');
  }
  
  // Sanitize inputs
  req.body.nombre = nombre?.trim().replace(/[<>]/g, '');
  req.body.email = email?.toLowerCase().trim();
  req.body.telefono = telefono?.replace(/[^\d+\-\(\)\s]/g, '');
  req.body.provincia = provincia?.trim().replace(/[<>]/g, '');
  req.body.localidad = localidad?.trim().replace(/[<>]/g, '');
  req.body.modalidad = modalidad?.toLowerCase().trim();
  req.body.cursos = cursos?.map(curso => curso.trim().replace(/[<>]/g, ''));
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
} 