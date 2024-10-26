import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Gallery = ({
  data,
  keyExtractor,
  numColumns,
  onPressImage,
  uriKey,
}: {
  data: any;
  keyExtractor: any;
  numColumns?: number;
  onPressImage?: any;
  uriKey?: string;
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={
        keyExtractor ? keyExtractor : (_, index: number) => String(index)
      }
      renderItem={({ item }: { item: any }) => (
        <TouchableOpacity
          onPress={onPressImage ? () => onPressImage(item) : () => false}>
          <Image
            source={{ uri: uriKey ? item[uriKey] : `data:image/png;base64,${item}` }}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
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
  },
  flatListContent: {
    alignItems: 'center',
  },
});

export default Gallery;
