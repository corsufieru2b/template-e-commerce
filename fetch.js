const http = require('http');

http.get('http://localhost:5000/api/products', res => {
  console.log('status', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
}).on('error', e => console.error('error', e));
