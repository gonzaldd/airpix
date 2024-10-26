import { useEffect, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';

const options = {
  port: 3002,
  host: 'localhost',
};

const useTcpSocket = (config?: any) => {
  const [client, setClient] = useState<any>(null);
  const [data, setData] = useState<any>('');
  const [error, setError] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let tcpClient = TcpSocket.createConnection(config ?? options, () => {
      console.log('CLIENT: Connected to server!');
      setIsConnected(true);
    });

    let buffer = '';

    tcpClient.on('data', (receivedData) => {
      try {
        const newData = receivedData.toString();
        buffer += newData;
        if (newData.startsWith('[')) {
          setIsLoading(true);
        }
        if (newData.endsWith('"]')) {
          setData(JSON.parse(buffer));
          buffer = '';
          setIsLoading(false);
        }

      } catch (err) {
        console.log('Failed to parse JSON:', err);
      }
    });

    tcpClient.on('error', (tcpError) => {
      console.error('CLIENT: Error occurred:', tcpError);
      setError(tcpError);
    });

    tcpClient.on('close', () => {
      console.log('CLIENT: Connection closed!');
      setIsConnected(false);
    });

    setClient(tcpClient);

    return () => {
      if (tcpClient) {
        tcpClient.destroy();
        console.log('CLIENT: Socket destroyed on cleanup');
      }
    };
  }, [config]);

  const sendMessage = (message: any) => {
    if (client && isConnected) {
      client.write(JSON.stringify(message));
    } else {
      console.log('CLIENT: Cannot send message. No connection established.');
    }
  };

  return { data, error, isConnected, sendMessage, isLoading };
};

export default useTcpSocket;
