import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';

const RenderItem = ({ item, onPressImage, uriKey }: { item: any, onPressImage: any, uriKey?: string }) => {
  const itemFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(itemFadeAnim, {
      toValue: 1,
      duration: 500, // Duration for each item's fade-in
      useNativeDriver: true,
    }).start();
  }, [itemFadeAnim]);

  return (
    <TouchableOpacity
      onPress={onPressImage ? () => onPressImage(item) : () => false}
    >
      <Animated.View style={{ opacity: itemFadeAnim }}>
        <Image
          source={{
            uri: uriKey ? item[uriKey] : `data:image/png;base64,${item}`,
          }}
          style={styles.image}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const Gallery = ({
  data,
  keyExtractor,
  numColumns,
  onPressImage,
  uriKey,
  title,
}: {
  data: any;
  keyExtractor: any;
  numColumns?: number;
  onPressImage?: any;
  uriKey?: string;
  title?: string
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // You can adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.FlatList
      style={styles.gallery}
      ListHeaderComponent={title === 'server' ? <Text style={styles.imgTitle}>Tus imagenes compartidas</Text> : null}
      data={data}
      keyExtractor={
        keyExtractor ? keyExtractor : (_, index: number) => String(index)
      }
      renderItem={(props) => <RenderItem {...props} onPressImage={onPressImage} uriKey={uriKey} />}
      numColumns={numColumns ?? 3}
      contentContainerStyle={styles.flatListContent}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width / 3 - 10,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  flatListContent: {
    alignItems: 'center',
  },
  gallery: {
    maxHeight: '80%',
  },
  imgTitle: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 10,
  },
});

export default Gallery;
