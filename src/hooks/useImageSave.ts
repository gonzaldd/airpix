import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const useImageSave = () => {
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
    return new Promise<void>((resolve) => {
      Alert.alert(
        'Save Photo',
        'Are you sure you want to save this photo to your gallery?',
        [
          {
            text: 'Cancelar',
            style: 'destructive',
            onPress: () => resolve(),
          },
          {
            text: 'Guardar',
            onPress: async () => {
              await saveBase64ImageToGallery(image);
              resolve();
            },
          },
        ],
        { cancelable: true }
      );
    });

  };

  return { saveBase64ImageToGallery, confirmSavePhoto };
};

export default useImageSave;
