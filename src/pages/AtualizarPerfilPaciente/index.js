import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AtualizarPerfilPaciente() {
  return (
    <View style={styles.container}>
     
        <Text style={{ fontSize: 30 }}>Atualizar paciente</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36393F",
  },
});
