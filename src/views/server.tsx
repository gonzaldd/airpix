import React, { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, ButtonText, ButtonGroup } from '@/components/ui/button';

import useTcpServer from '../hooks/socketServer';
import Gallery from './gallery';

interface ImagePicker {
  uri: string
}

const ServerView = () => {
  const { sendMessage } = useTcpServer();
  const [images, setImages] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<ImagePicker | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      quality: 0.1,
      includeBase64: true,
    });
    setImages(result.assets);
    sendMessage(result.assets?.map(itm => itm.base64));
  };

  return (
    <View style={styles.container}>
      {/* <Text>IP del servidor: {ip}</Text> */}
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
});

export default ServerView;
