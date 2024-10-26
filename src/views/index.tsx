import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, ButtonText, ButtonGroup } from '@/components/ui/button';

import ServerView from './server';
import ClientView from './client';

const Index = () => {
  const navigation = useNavigation();

  const goServer = () => {
    navigation.navigate('Server');
  };

  const goClient = () => {
    navigation.navigate('Client');
  };

  return (
    <View style={styles.container}>
      <ButtonGroup flexDirection="column">
        <Button size="lg" variant="solid" action="primary" onPress={goServer}>
          <ButtonText>Compartir Imagenes</ButtonText>
        </Button>
        <Button size="lg" variant="solid" action="secondary" onPress={goClient}>
          <ButtonText>Importar Imagenes</ButtonText>
        </Button>
      </ButtonGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home: { screen: Index, options: { headerShown: false } },
    Server: { screen: ServerView, options: { headerShown: false } },
    Client: { screen: ClientView, options: { headerShown: false } },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
