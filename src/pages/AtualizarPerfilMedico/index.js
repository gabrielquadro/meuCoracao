import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../contexts/auth";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { db, app, firebase } from "../../config";

export default function AtualizarPerfilMedico() {
  const [name, setName] = useState("");
  const [nameM, setNameM] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signUp, signIn, loadingAuth, signUpMedico, signUpPaciente } =
    useContext(AuthContext);
  const [selectedState, setSelectedState] = useState("");
  const [created, setCreated] = useState("");
  const [isDoc, setIsDoc] = useState(false);
  const navigation = useNavigation();
  const { signOut, user } = useContext(AuthContext);
  const [userP, setUserP] = useState({});
  const [crm, setCRM] = useState("");
  const [loading, setLoading] = useState(false);


  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      onSurfaceVariant: 'black',
    },
  };

  const stateList = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amazonas", value: "AM" },
    { label: "Amapá", value: "AP" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Paraná", value: "PR" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Santa Catarina", value: "SC" },
    { label: "Sergipe", value: "SE" },
    { label: "São Paulo", value: "SP" },
    { label: "Tocantins", value: "TO" },
  ];

  useEffect(() => {
    setLoading(true)
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((value) => {
        console.log(value.data());
        setUserP(value.data());
        setName(value.data().nome);
        setSelectedState(value.data().estado)
        setCRM(value.data().crm)
        setCreated(value.data().createdAt);
        setIsDoc(value.data().isDoctor);
      })
      .finally(() => {
        setLoading(false)
      });
  }, []);

  async function updtade() {
    db.collection("users")
      .doc(user.uid)
      .set({
        createdAt: created,
        isDoctor: isDoc,
        estado: selectedState,
        crm: crm,
        nome: name
      })
      .then(() => {
        console.log("Atualizou");
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.goBack();
  }

  const handleStateChange = (value) => {
    setSelectedState(value);
  }

  return (
    <View style={{flex:1}}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator SIZE={70} color="red"></ActivityIndicator>
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            theme={theme}
            label='Nome completo'
            mode='flat'
            textColor="#000"
            style={styles.imput}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            theme={theme}
            label='CRM'
            mode='flat'
            textColor="#000"
            style={styles.imput}
            value={crm}
            onChangeText={(text) => setCRM(text)}
          />
          <View style={styles.picker}>
            <Picker
              dropdownIconColor={'white'}
              selectedValue={selectedState}
              onValueChange={handleStateChange}>
              <Picker.Item label="Selecione um estado" value="" />
              {stateList.map((state) => (
                <Picker.Item
                  key={state.value}
                  label={state.label}
                  value={state.value}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.btn} onPress={updtade}>
            <Text style={styles.btnTxt}>Atualizar perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#36393F',
    // backgroundColor: "#a0a4a5",
    paddingHorizontal: '8%'
    //justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 45,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 20,
  },
  imput: {
    width: "100%",
    marginTop: 12,
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderWidth: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    marginTop: 12,
    width: "100%",
  },
  btn: {
    width: "100%",
    backgroundColor: "#d04556",
    //595458
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontSize: 15,
  },
});
