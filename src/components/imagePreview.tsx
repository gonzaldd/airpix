import React from 'react';
import { Modal, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';

interface ImagePreviewProps {
  visible: boolean;
  image: { uri: string } | null;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ visible, image, onClose }) => {
  if (!image) { return null; }
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={onClose}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={styles.previewImage}
            />
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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


export default ImagePreview;
