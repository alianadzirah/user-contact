import React from "react";
import { StyleSheet, View } from "react-native";
import Validation from "./components/Validation";

export default function App() {
  return (
    <View style={styles.container}>
      <Validation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
