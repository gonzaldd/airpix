import {
  Text,
  Image,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import TcpSocket from "react-native-tcp-socket";
import { launchImageLibrary } from "react-native-image-picker";

import useTcpServer from "../hooks/socketServer";
import { useEffect, useState } from "react";

// setTimeout(() => {
//   const options = {
//     port: 3002,
//     host: 'localhost',
//     // localAddress: '127.0.0.1',
//     // reuseAddress: true,
//     // localPort: 20000,
//     // interface: "wifi",
//   };

//   // Create socket
//   const client = TcpSocket.createConnection(options, () => {
//     // Write on the socket
//     client.write('Hello server!');

//     // Close socket
//     // client.destroy();
//   });

//   client.on('data', function (data) {
//     console.log('CLIENT message was received', data.toString());
//   });

//   client.on('error', function (error) {
//     console.log(error);
//   });

//   client.on('close', function () {
//     console.log('CLIENT Connection closed!');
//   });
// }, 3000);

const ServerView = () => {
  // useTcpServer();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para manejar la imagen seleccionada
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const openImagePreview = image => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImagePreview = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const getImages = async () => {
    const result = await launchImageLibrary({ selectionLimit: 10, mediaType: 'photo', quality: 1 });
    console.log("🚀 ~ getImages ~ result:", result);
    setImages(result.assets);
  };

  useEffect(() => {
    try {
      getImages();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>SERVER {images?.length}</Text>
      <FlatList
        data={images}
        keyExtractor={item => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImagePreview(item)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        )}
        numColumns={3} // Número de columnas para ajustar las imágenes por fila
        contentContainerStyle={styles.flatListContent}
      />

      {/* Modal para la vista previa de la imagen */}
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
    justifyContent: "center",
  },
  flatListContent: {
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width / 3 - 10,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    resizeMode: "contain",
  },
});

export default ServerView;
