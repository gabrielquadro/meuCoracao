import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txt}>
        meu
        <Text style={{ color: "#ff1933" }}>Coração</Text>
        <FontAwesome name="heartbeat" size={20} color="#ff1933" />
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#353840",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#c7c7c7",
  },
  txt: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 15,
    fontStyle: "italic",
  },
});

export default Header;
