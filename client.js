// client.js
const WebSocket = require('ws');

// Conectarse al servidor WebSocket en el localhost puerto 3002
const ws = new WebSocket('http://localhost:3002');

// Escuchar la apertura de la conexión
ws.on('open', () => {
  console.log('Conectado al servidor WebSocket');

  // Enviar un mensaje al servidor
  ws.send('Hola desde el cliente!');
});

// Escuchar mensajes del servidor
ws.on('message', message => {
  console.log(`Mensaje recibido del servidor: ${message}`);
});

// Escuchar cuando la conexión se cierra
ws.on('close', () => {
  console.log('Desconectado del servidor WebSocket');
});
