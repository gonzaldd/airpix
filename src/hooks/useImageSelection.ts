import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

interface ImagePicker {
  uri?: string;
  base64?: string;
}


const useImageSelection = () => {
  const [images, setImages] = useState<ImagePicker[]>([]);

  const getImages = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 10,
      mediaType: 'photo',
      quality: 0.2,
      includeBase64: true,
    });

    if (result.assets) {
      setImages(result.assets.map((itm) => ({ uri: itm.uri, base64: itm.base64 })));
    }
  };
  return { images, getImages };
};

export default useImageSelection;
