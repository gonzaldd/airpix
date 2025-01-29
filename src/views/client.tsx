import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import Gallery from 'components/gallery';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';

import useTcpSocket from 'hooks/useSocketClient';
import useImageSave from 'hooks/useImageSave';

const ClientView = () => {
  const [socketConfig, setSocketConfig] = useState({});
  const [submit, setSubmit] = useState(false);
  const { confirmSavePhoto } = useImageSave();

  if (!submit) {
    return <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.title}>Conectar al servidor</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            autoFocus
            placeholder="Introduce la IP del servidor"
            onChangeText={(value) => setSocketConfig({ port: 3002, host: value })}
          />
        </Input>
        <Button
          size="lg"
          onPress={() => setSubmit(true)}
          style={styles.button}>
          <ButtonText>Iniciar conexión</ButtonText>
        </Button>
      </View>
    </View>;
  }

  return <GalleryView socketConfig={socketConfig} confirmSavePhoto={confirmSavePhoto} />;
};

const GalleryView = ({ socketConfig, confirmSavePhoto }: { socketConfig: any, confirmSavePhoto: any }) => {
  const { data, isLoading, isConnected } = useTcpSocket(socketConfig);

  return (
    <View style={styles.container}>
      {(isLoading || !isConnected) && <Spinner size={'large'} />}
      {((isLoading || !isConnected) || !isConnected) && <Text style={styles.connectionText}>Conectando al servidor...</Text>}
      {data?.length > 0 && (
        <Gallery
          data={data}
          title="client"
          keyExtractor={(_: any, index: number) => String(index)}
          onPressImage={confirmSavePhoto}
        />
      )}
      {isConnected && <Text style={styles.connectionInfo}>Conectado al servidor</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionText: {
    fontSize: 18,
    fontWeight: 500,
    marginTop: 20,
  },
  connectionInfo: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  input: {
    width: '80%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 600,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default ClientView;
