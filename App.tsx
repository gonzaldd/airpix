import React from 'react';

import './global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Main from './src/views';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView>
        <StatusBar hidden />
        <ScrollView contentContainerStyle={styles.container}>
          <Main />
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default App;
