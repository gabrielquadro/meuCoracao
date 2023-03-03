import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={{ fontSize: 30 }}>Home paciente</Text>
      </View>
      <TouchableOpacity
        style={styles.btnNew}
        //activeOpacity={0.8}
        onPress={() => navigation.navigate("Home")}
      >
        <Feather name="plus" color={"#FFF"} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#353840",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnNew: {
    position: "absolute", //por cima de tudo
    bottom: "5%",
    right: "6%",
    width: 60,
    height: 60,
    backgroundColor: "#202225",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99, //sobre toda interface
  },
});
