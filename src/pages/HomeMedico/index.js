import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={{ fontSize: 30 }}>Home médico</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "##a0a4a5",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
