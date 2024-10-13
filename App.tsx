import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet
} from 'react-native';
import TcpSocket from 'react-native-tcp-socket';
import Main from './src/views'

import { Colors } from 'react-native/Libraries/NewAppScreen';
import useSocketServer from './src/hooks/socketServer';


// setTimeout(() => {
//   const options = {
//     port: 3002,
//     host: 'localhost',
//     // localAddress: '127.0.0.1',
//     // reuseAddress: true,
//     // localPort: 20000,
//     // interface: "wifi",
//   };

//   // Create socket
//   const client = TcpSocket.createConnection(options, () => {
//     // Write on the socket
//     client.write('Hello server!');

//     // Close socket
//     // client.destroy();r
//   });

//   client.on('data', function (data) {
//     console.log('CLIENT message was received', data.toString());
//   });

//   client.on('error', function (error) {
//     console.log(error);
//   });

//   client.on('close', function () {
//     console.log('CLIENT Connection closed!');
//   });
// }, 3000);

function App(): React.JSX.Element {
  // const clientAddress: any = useSocketServer();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Main />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default App;
