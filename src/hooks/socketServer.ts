import { useEffect, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';


const useTcpServer = (handler?: any) => {
  const [client, setClient] = useState<any>(null);
  const [clientAddress, setClientAddress] = useState<any>(null);

  useEffect(() => {
    const server = TcpSocket.createServer(socket => {
      const address: any = socket.address();
      setClient(socket);

      // Guardamos la dirección del cliente en el estado
      setClientAddress(address?.address);

      socket.on('connect', () => {
        console.log('SERVER NEW CONNECTION');
      });

      socket.on('data', data => {
        const dataReceived = JSON.parse(data.toString());
        console.log('SERVER received message:', dataReceived);
        if (handler) {
          handler(dataReceived);
        }
      });

      socket.on('error', error => {
        console.log('An error occurred with client socket ', error);
      });

      socket.on('close', () => {
        console.log('SERVER Closed connection with ', socket.address());
      });
    }).listen({ port: 3002, host: 'localhost' });

    server.on('connection', (data) => {
      const clientId = `${data.remoteAddress}:${data.remotePort}`;
      console.log('New client in server', clientId);
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
    };
  }, [handler]);

  const sendMessage = (message: any) => {
    if (client) {
      console.log('SERVER LENGTH', JSON.stringify(message).length);
      client.write(JSON.stringify(message));
      // client.write(message);
    } else {
      console.log('CLIENT: Cannot send message. No connection established.');
    }
  };

  // Devolvemos la dirección del cliente conectada
  return { clientAddress, sendMessage };
};

export default useTcpServer;
