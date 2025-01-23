import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, ButtonText, ButtonGroup } from '@/components/ui/button';
import NetInfo from '@react-native-community/netinfo';

import useTcpServer from '../hooks/socketServer';
import Gallery from './gallery';

interface ImagePicker {
  uri: string
}

const ServerView = () => {
  const [images, setImages] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<ImagePicker | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deviceIp, setDeviceIp] = useState<string | null>(null)

  const onClientConnect = () => {
    setTimeout(() => {
      const imagesData = images?.map((itm: any) => itm.base64);
      sendMessage(imagesData);
    }, 1000);
  };

  const { sendMessage } = useTcpServer(null);

  const openImagePreview = (image: ImagePicker) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImagePreview = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const getImages = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 10,
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    });
    setImages(result.assets);
    sendMessage(result.assets?.map(itm => itm.base64));
  };

  useEffect(() => {
    // getIpAddress().then((ip) => setDeviceIp(ip));
    NetInfo.fetch().then(state => {
      const ipAddress = (state?.details as { ipAddress: string })?.ipAddress;
      setDeviceIp(ipAddress);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.ipTitle}>IP para el cliente:</Text>
      <Text style={[styles.ipText, styles.pb10]}>{deviceIp}</Text>
      {images?.length > 0 && <Gallery
        data={images}
        keyExtractor={(item: any) => item.uri}
        onPressImage={openImagePreview}
        uriKey="uri"
      />}
      <ButtonGroup flexDirection="column">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          onPress={getImages}>
          <ButtonText>Elegir Fotos</ButtonText>
        </Button>
      </ButtonGroup>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImagePreview}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={closeImagePreview}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.previewImage}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    resizeMode: 'contain',
  },
  ipTitle: {
    fontSize: 14,
    fontWeight: 700,
  },
  ipText: {
    fontSize: 19,
    fontWeight: 700,
  },
  pb10: {
    paddingBottom: 10,
  },
});

export default ServerView;
