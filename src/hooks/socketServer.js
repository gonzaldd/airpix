import {useEffect, useState} from 'react';
import TcpSocket from 'react-native-tcp-socket';

const useTcpServer = () => {
  const [clientAddress, setClientAddress] = useState(null);

  useEffect(() => {
    const server = TcpSocket.createServer(socket => {
      const address = socket.address();
      console.log('INIT SERVER ', address);

      // Guardamos la dirección del cliente en el estado
      setClientAddress(address);

      socket.on('data', data => {
        console.log('SERVER received message:', data.toString());
        setTimeout(() => socket.write('SERVER Echo server ' + data), 1000);
      });

      socket.on('error', error => {
        console.log('An error occurred with client socket ', error);
      });

      socket.on('close', () => {
        console.log('SERVER Closed connection with ', socket.address());
      });
    }).listen({port: 3002, host: 'localhost'});

    server.on('error', error => {
      console.log('An error occurred with the server', error);
    });

    server.on('close', () => {
      console.log('Server closed connection');
    });

    // Cleanup function to close the server when the component unmounts
    return () => {
      server.close(() => {
        console.log('Server closed');
      });
    };
  }, []);

  // Devolvemos la dirección del cliente conectada
  return clientAddress;
};

export default useTcpServer;
