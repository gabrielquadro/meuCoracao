import React, { useState, useContext } from "react";
import Checkbox from 'expo-checkbox';
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { signUp, signIn, loadingAuth } = useContext(AuthContext);
  const [isSelected, setSelection] = useState(false);

  async function handleSignIn() {
    if (!email || !senha) {
      Alert.alert("Informe todos os campos");
    }

    await signIn(email, senha);
  }

  async function handSignUp() {
    if (!name || !email || !senha) {
      Alert.alert("Informe todos os campos");
      return;
    }
    //cadastrar usuário
    await signUp(email, senha, name, isSelected);
  }

  if (login) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          meu
          <Text style={{ color: "#ff1933" }}>Coração</Text>
          <FontAwesome name="heartbeat" size={35} color="#ff1933" />
        </Text>
        <TextInput
          style={styles.imput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="email"
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.imput}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          placeholder="senha"
          placeholderTextColor="#000"
        />
        <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <Text style={styles.btnTxt}>Acessar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpBtn}>
          <Text onPress={() => setLogin(!login)} style={styles.signUpBtnTxt}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        meu
        <Text style={{ color: "#ff1933" }}>Coração</Text>
        <FontAwesome name="heartbeat" size={35} color="#ff1933" />
      </Text>
      <TextInput
        style={styles.imput}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="nome"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.imput}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="email"
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.imput}
        value={senha}
        onChangeText={(text) => setSenha(text)}
        placeholder="senha"
        placeholderTextColor="#000"
      />

      <View style={styles.checkboxContainer}>
      <Checkbox
          style={styles.checkbox}
          value={isSelected}
          onValueChange={setSelection}
          color="black"
        />
        <Text>É médico?</Text>
      </View>

      <TouchableOpacity onPress={handSignUp} style={styles.btn}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <Text style={styles.btnTxt}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setLogin(!login)}
        style={styles.signUpBtn}
      >
        <Text style={styles.signUpBtnTxt}>Já possuo uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#36393F',
    backgroundColor: "#a0a4a5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 45,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 20,
  },
  imput: {
    width: "80%",
    backgroundColor: "#fafcfb",
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    fontSize: 17,
  },
  btn: {
    width: "80%",
    backgroundColor: "#d04556",
    //595458
    borderRadius: 8,
    marginTop: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "#FFF",
    fontSize: 15,
  },
  signUpBtn: {
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtnTxt: {
    color: "#FFF",
    fontSize: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 12,
    width: "80%",
  },
  checkbox: {
    marginRight: 10,
  },
});
