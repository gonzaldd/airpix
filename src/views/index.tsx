import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { createStaticNavigation, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ServerView from "./server";
import ClientView from "./client";

const Index = () => {
  const navigation = useNavigation();

  const goServer = () => {
    navigation.navigate("Server");
  };

  const goClient = () => {
    navigation.navigate("Client");
  };

  return (
    <View style={styles.container}>
      <Button title="Server" onPress={goServer} />
      <Button title="Client" onPress={goClient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home: { screen: Index, options: { title: "Home" } },
    Server: { screen: ServerView },
    Client: { screen: ClientView },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
