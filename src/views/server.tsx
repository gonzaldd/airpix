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
import { Button, ButtonIcon } from '@/components/ui/button';
import { PaperclipIcon } from '@/components/ui/icon';
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
  const [deviceIp, setDeviceIp] = useState<string | null>(null);
  const hasImages = images?.length > 0;

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
      quality: 0.2,
      includeBase64: true,
    });
    setImages(result.assets);
    sendMessage(result.assets?.map(itm => itm.base64));
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      const ipAddress = (state?.details as { ipAddress: string })?.ipAddress;
      setDeviceIp(ipAddress);
    });
  }, []);

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
          onPress={getImages}>
          <ButtonIcon as={PaperclipIcon} />
        </Button>
      </View>

      <View style={styles.ipText}>
        <Text style={[styles.ipText]}>{deviceIp}</Text>
      </View>
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
