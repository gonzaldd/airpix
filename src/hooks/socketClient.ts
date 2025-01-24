import { useCallback, useEffect, useRef, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';

const options = {
  port: 3002,
  host: 'localhost',
};

const useTcpSocket = (config?: any) => {
  const retryId = useRef<any>(null);
  const tcpClient = useRef<any>(null);

  const [data, setData] = useState<any>('');
  const [error, setError] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createClient = (connectionConfig: any) =>
    TcpSocket.createConnection(connectionConfig, () => {
      console.log('CLIENT: Connected to server!');
      setIsConnected(true);
    });


  const socketClose = useCallback(() => {
    tcpClient.current.on('close', () => {
      console.log('CLIENT: Connection closed!');
      setIsConnected(false);
    });
  }, []);

  const socketError = useCallback(() => {
    tcpClient?.current?.on('error', (tcpError: any) => {
      console.log('CLIENT: Error occurred:', tcpError);
      setError(tcpError);
      retryId.current = setTimeout(() => {
        console.log('Retry connect');
        tcpClient.current = createClient(config ?? options);
        socketError();
        socketClose();
      }, 4000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newDataFromServer = () => {
    let buffer = '';
    tcpClient.current.on('data', (receivedData: any) => {
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
  };

  useEffect(() => {
    tcpClient.current = createClient(config ?? options);
    socketError();
    socketClose();
    newDataFromServer();

    return () => {
      if (tcpClient) {
        tcpClient.current?.destroy();
        retryId.current && clearTimeout(retryId.current);
        console.log('CLIENT: Socket destroyed on cleanup');
      }
    };
  }, [config, socketClose, socketError]);

  const sendMessage = (message: any) => {
    if (tcpClient.current && isConnected) {
      tcpClient.current.write(JSON.stringify(message));
    } else {
      console.log('CLIENT: Cannot send message. No connection established.');
    }
  };

  return { data, error, isConnected, sendMessage, isLoading };
};

export default useTcpSocket;
