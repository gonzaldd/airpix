import React, { useState } from 'react';
// import { Button, ButtonGroup, ButtonText } from '@/components/ui/button';

import useTcpSocket from '../hooks/socketClient';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import Gallery from './gallery';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const ClientView = () => {
  const [socketConfig] = useState({
    port: 3002,
    host: 'localhost',
  });

  const { data, isLoading, isConnected } = useTcpSocket(socketConfig);

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

  return (
    <View style={styles.container}>
      {(isLoading || !isConnected) && <Spinner />}
      {(isLoading || !isConnected) && <Text>Conectando al servidor...</Text>}
      {data?.length > 0 && (
        <Gallery
          data={data}
          keyExtractor={(_: any, index: number) => String(index)}
          onPressImage={confirmSavePhoto}
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
