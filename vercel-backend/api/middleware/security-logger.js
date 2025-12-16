// Security logging middleware
export function securityLogger(req, res, next) {
  const startTime = Date.now();
  
  // Log request details
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    referer: req.get('Referer'),
    body: req.method === 'POST' ? { ...req.body, email: '[REDACTED]' } : undefined
  };
  
  // Log suspicious activities
  if (req.body && req.body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    console.warn('🚨 SECURITY WARNING: Invalid email format detected:', logData);
  }
  
  if (req.body && req.body.totalAmount && (isNaN(req.body.totalAmount) || req.body.totalAmount > 1000000)) {
    console.warn('🚨 SECURITY WARNING: Suspicious payment amount:', logData);
  }
  
  // Log successful requests
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logData.statusCode = res.statusCode;
    logData.duration = duration;
    
    if (res.statusCode >= 400) {
      console.error('❌ ERROR REQUEST:', logData);
    } else {
      console.log('✅ SUCCESS REQUEST:', logData);
    }
  });
  
  next();
} 