import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../contexts/auth";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { db, app, firebase } from "../../config";

export default function AtualizarPerfilPaciente() {
  const [name, setName] = useState("");
  const [nameM, setNameM] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signUp, signIn, loadingAuth, signUpMedico, signUpPaciente } =
    useContext(AuthContext);
  const [selectedState, setSelectedState] = useState("");
  const [sexo, setSexo] = useState("");
  const [value, setValue] = useState("");
  const [created, setCreated] = useState("");
  const [isDoc, setIsDoc] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [docSelected, setDocSelected] = useState([]);
  const navigation = useNavigation();
  const { signOut , user } = useContext(AuthContext);
  const [userP, setUserP] = useState({});
  const [info, setInfo] = useState('');

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "white",
      onSurfaceVariant: "white",
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

  const sexoList = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
  ];

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function fetchPosts() {
        db.collection("users")
          .where("isDoctor", "==", true)
          .get()
          .then((snapshoot) => {
            setDoctors([]);
            const list = [];
            snapshoot.docs.map((u) => {
              list.push({
                ...u.data(),
                id: u.id,
              });
            });
            setDoctors(list);
          });
      }
      fetchPosts();
      return () => {
        isActive = false;
      };
    }, [])
  );

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((value) => {
        console.log(value.data());
        setUserP(value.data());
        setName(value.data().nome);
        setValue(value.data().dataNascimento);
        setNameM(value.data().nomeMae);
        setPhoneNumber(value.data().telefone);
        setSexo(value.data().sexo);
        setDocSelected(value.data().medico);
        setCreated(value.data().createdAt);
        setIsDoc(value.data().isDoctor);
        setInfo(value.data().infoAdd1 ? value.data().infoAdd1 : '')
      });
  }, []);

  async function updtade() {
    db.collection("users")
      .doc(user.uid)
      .set({
        createdAt: created,
        telefone: phoneNumber,
        dataNascimento: value,
        isDoctor: isDoc,
        medico: docSelected,
        nome: name,
        nomeMae: nameM,
        sexo: sexo,
        infoAdd1: info
      })
      .then(() => {
        console.log("Atualizou");
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>  
      <TextInput
        theme={theme}
        label="Nome"
        mode="flat"
        textColor="#000"
        style={styles.imput}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        theme={theme}
        label="Data de nascimento"
        mode="flat"
        textColor="#000"
        style={styles.imput}
        value={value}
        onChangeText={(text) => setValue(text)}
      />

      <TextInput
        theme={theme}
        label="Nome da mãe"
        mode="flat"
        textColor="#000"
        style={styles.imput}
        value={nameM}
        onChangeText={(text) => setNameM(text)}
      />

      <TextInput
        theme={theme}
        label="Telefone"
        mode="flat"
        textColor="#000"
        style={styles.imput}
        value={phoneNumber}
        keyboardType="phone-pad"
        onChangeText={(text) => setPhoneNumber(text)}
      />

      <View style={styles.picker}>
        <Picker
          style={{ color: "black" }}
          dropdownIconColor={"black"}
          selectedValue={sexo}
          onValueChange={(value) => setSexo(value)}
        >
          <Picker.Item label="Selecione seu sexo" value="" />
          {sexoList.map((state) => (
            <Picker.Item
              key={state.value}
              label={state.label}
              value={state.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          style={{ color: "black" }}
          dropdownIconColor={"black"}
          selectedValue={docSelected}
          onValueChange={(value) => setDocSelected(value)}
        >
          <Picker.Item label="Selecione seu médico" value="" />
          {doctors.map((state) => (
            <Picker.Item key={state.id} label={state.nome} value={state.id} />
          ))}
        </Picker>
      </View>

      <Text style={{marginTop: 10}}>Informações específicas</Text>
      <TextInput
        theme={theme}
        label="Informação especifica 1"
        mode="flat"
        textColor="#000"
        style={styles.imput}
        value={info}
        onChangeText={(text) => setInfo(text)}
      />

      <TouchableOpacity style={styles.btn} onPress={updtade}>
        <Text style={styles.btnTxt}>Atualizar perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#36393F',
    backgroundColor: "#a0a4a5",
    padding: '5%'
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
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: "white",
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
    color: "#FFF",
    fontSize: 15,
  },
});
