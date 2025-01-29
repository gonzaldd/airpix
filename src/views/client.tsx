import React, { useState } from 'react';

import useTcpSocket from 'hooks/useSocketClient';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import Gallery from 'components/gallery';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';

const ClientView = () => {
  const [socketConfig, setSocketConfig] = useState({
    port: 3002,
    host: 'localhost',
  });
  const [submit, setSubmit] = useState(false);

  const saveBase64ImageToGallery = async (base64Image: any) => {
    const filePath = `${RNFS.DocumentDirectoryPath}/image.jpg`;

    try {
      await RNFS.writeFile(filePath, base64Image, 'base64');
      await CameraRoll.save(filePath, { type: 'photo' });

      Alert.alert('Success', 'La imagen se ha guardado correctamente!');
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo guardar la imagen.');
    }
  };

  const confirmSavePhoto = (image: any) => {
    Alert.alert(
      'Save Photo',
      'Are you sure you want to save this photo to your gallery?',
      [
        {
          text: 'Cancelar',
          style: 'destructive',
        },
        {
          text: 'Guardar',
          onPress: () => saveBase64ImageToGallery(image),
        },
      ],
      { cancelable: true }
    );
  };

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
            onChangeText={(value) => setSocketConfig({ ...socketConfig, host: value })}
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
