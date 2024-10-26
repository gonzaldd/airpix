import React, { useState } from 'react';
// import { Button, ButtonGroup, ButtonText } from '@/components/ui/button';

import useTcpSocket from '../hooks/socketClient';
import { StyleSheet, Text, View } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import Gallery from './gallery';

const ClientView = () => {
  const [socketConfig] = useState({
    port: 3002,
    host: 'localhost',
  });

  const { data, isLoading, isConnected } = useTcpSocket(socketConfig);

  return (
    <View style={styles.container}>
      {(isLoading || !isConnected) && <Spinner />}
      {(isLoading || !isConnected) && <Text>Conectando al servidor...</Text>}
      {data?.length > 0 && (
        <Gallery
          data={data}
          keyExtractor={(_: any, index: number) => String(index)}
        />
      )}
      {/* <ButtonGroup flexDirection="column">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          onPress={() => sendMessage({ action: 'getPhotos' })}>
          <ButtonText>Test message</ButtonText>
        </Button>
      </ButtonGroup> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClientView;
