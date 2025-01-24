import { useEffect, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';


const useTcpServer = (handler?: any, onConnect?: any) => {
  const [clients, setClients] = useState<Array<any>>([]);

  useEffect(() => {
    const server = TcpSocket.createServer(client => {
      const address: any = client.address();
      const port = client.remotePort;

      setClients(prevClients => [...prevClients, { [`${address}:${port}`]: client }]);

      client.on('data', data => {
        const dataReceived = JSON.parse(data.toString());
        console.log('SERVER received message:', dataReceived);
        if (handler) {
          handler(dataReceived);
        }
      });

      client.on('error', error => {
        console.log('An error occurred with client socket ', error);
      });

      client.on('close', () => {
        console.log('SERVER Closed connection with ', address, port);
      });
    }).listen({ port: 3002, host: 'localhost' });

    server.on('connection', (data) => {
      const clientId = `${data.remoteAddress}:${data.remotePort}`;
      console.log('New client in server', clientId);
      onConnect && onConnect();
    });

    server.on('error', error => {
      console.log('An error occurred with the server', error);
    });

    server.on('close', () => {
      console.log('Server closed connection');
    });

    return () => {
      server.close(() => {
        console.log('Server closed');
      });
      clients.forEach((clientObj) => {
        const clientKey = Object.keys(clientObj)[0];
        const client = clientObj[clientKey];
        client?.destroy();
      });
    };
  }, [handler, clients.length, onConnect, clients]);

  const sendMessage = (message: any) => {
    if (clients.length > 0) {
      clients.forEach((clientObj) => {
        const clientKey = Object.keys(clientObj)[0];
        const client = clientObj[clientKey];
        try {
          client.write(JSON.stringify(message));
        } catch (error) {
          console.log('Error on send data.');
        }
      });
    } else {
      console.log('SERVER: Cannot send message. No connection established.');
    }
  };

  // Devolvemos la dirección del cliente conectada
  return { sendMessage };
};

export default useTcpServer;
