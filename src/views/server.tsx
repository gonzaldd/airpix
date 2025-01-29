import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { Button, ButtonIcon } from '@/components/ui/button';
import { PaperclipIcon } from '@/components/ui/icon';
import { useRoute } from '@react-navigation/native';

import useSocketServer from 'hooks/useSocketServer';
import Gallery from 'components/gallery';
import useImageSelection, { ImagePicker } from 'hooks/useImageSelection';
import ImagePreview from 'components/imagePreview';

const ServerView = () => {
  const [images, setImages] = useState<ImagePicker[]>([]);
  const { getImages } = useImageSelection();
  const [selectedImage, setSelectedImage] = useState<ImagePicker | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const route = useRoute();
  const { deviceIp } = route?.params as { deviceIp: string };
  const hasImages = images?.length > 0;

  const { sendMessage } = useSocketServer(deviceIp);

  const openImagePreview = (image: ImagePicker) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImagePreview = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const handleImageSelection = async () => {
    const selectedImages = await getImages();
    sendMessage(selectedImages?.map(itm => itm.base64));
    setImages(selectedImages ?? []);
  };

  return (
    <View style={styles.container}>
      {!hasImages && <Text style={styles.ipTitle}>Seleccioná imagenes de tu galeria</Text>}
      {hasImages && <Gallery
        data={images}
        title="server"
        keyExtractor={(item: any) => item.uri}
        onPressImage={openImagePreview}
        uriKey="uri"
      />}
      <View style={styles.addButton}>
        <Button
          size="lg"
          className="rounded-full p-3.5"
          onPress={handleImageSelection}>
          <ButtonIcon as={PaperclipIcon} />
        </Button>
      </View>

      <View style={styles.ipText}>
        <Text style={[styles.ipText]}>{deviceIp}</Text>
      </View>
      <ImagePreview visible={isModalVisible} image={selectedImage} onClose={closeImagePreview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
    fontSize: 18,
    fontWeight: 500,
  },
  ipText: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  pb10: {
    paddingBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});

export default ServerView;
