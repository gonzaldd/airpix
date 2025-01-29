import { launchImageLibrary } from 'react-native-image-picker';

export interface ImagePicker {
  uri?: string;
  base64?: string;
}


const useImageSelection = () => {
  const getImages = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 10,
      mediaType: 'photo',
      quality: 0.2,
      includeBase64: true,
    });

    if (result.assets) {
      const imagesData = result.assets.map((itm) => ({ uri: itm.uri, base64: itm.base64 }));
      return imagesData;
    }
  };
  return { getImages };
};

export default useImageSelection;
