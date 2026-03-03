/**
 * REQUEST LOGGER MIDDLEWARE
 * 
 * Enregistre toutes les requêtes HTTP
 * Format: [TIME] METHOD URL - STATUS
 */

export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Hook la réponse pour capturer le status
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusColor = statusCode >= 400 ? '❌' : statusCode >= 300 ? '🔄' : '✅';
    
    console.log(
      `${statusColor} [${new Date().toISOString()}] ${req.method} ${req.path} - ${statusCode} (${duration}ms)`
    );
  });

  next();
};
