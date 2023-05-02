import React, { useState, useContext, useCallback , useEffect} from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Button
} from "react-native";
import { TextInput, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from "../../contexts/auth";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { db, app, firebase } from '../../config'



export default function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [nameM, setNameM] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [crm, setCRM] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const { signUp, signIn, loadingAuth, signUpMedico, signUpPaciente } = useContext(AuthContext);
  const [isSelected, setSelection] = useState('P');
  const [selectedState, setSelectedState] = useState('');
  const [sexo, setSexo] = useState('');
  const [value, setValue] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [docSelected, setDocSelected] = useState([]);
  const navigation = useNavigation();



  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white',
      onSurfaceVariant: 'white',
    },
  };

  const stateList = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Tocantins', value: 'TO' }
  ];

  const sexoList = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ];

  const handleStateChange = (value) => {
    setSelectedState(value);
  }

  async function handleSignIn() {
    if (!email || !senha) {
      Alert.alert("Informe email e senha.");
    }

    await signIn(email, senha);
  }

  async function handSignUp() {
    if (isSelected == 'M') {
      //case médico
      if (!name || !email || !senha || !crm || selectedState == '') {
        Alert.alert("Informe todos os campos.");
        return;
      } else {
        //cadastrar médico
        await signUpMedico(email, senha, name, crm, selectedState);
      }
    } else {
      //cadastro de paciente
      if (!name || !email || !senha || !phoneNumber || !nameM || !value || !sexo || !docSelected) {
        Alert.alert("Informe todos os campos.");
        return;
      } else {
        await signUpPaciente(email, senha, name, phoneNumber, nameM, value, sexo , docSelected);
      }

    }
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
          theme={theme}
          label='Email'
          mode='flat'
          textColor="#000"
          style={styles.imput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          theme={theme}
          label='Senha'
          mode='flat'
          textColor="#000"
          style={styles.imput}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={hidePass}
          right={<TextInput.Icon icon={({ color, size }) => (
            <AntDesign name="eye" size={24} color="white" onPress={() => setHidePass(!hidePass)} />
          )} />}
        />
        <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <Text style={styles.btnTxt}>Acessar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate("Cadastrar")}>
          <Text 
          // onPress={() => setLogin(!login)}
           style={styles.signUpBtnTxt}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#a0a4a5", }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          meu
          <Text style={{ color: "#ff1933" }}>Coração</Text>
          <FontAwesome name="heartbeat" size={35} color="#ff1933" />
        </Text>

        <Text style={{ marginBottom: 20, color: 'white', fontWeight: 'bold', fontSize: 25 }}>
          Cadastrar uma nova conta
        </Text>

        <RadioButton.Group onValueChange={setSelection} value={isSelected} >
          <View style={{ flexDirection: 'row' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
              <RadioButton
                value="P"
                theme={theme}
              />
              <Text style={{ color: 'white' }}>Sou paciente</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="M"
                theme={theme}
              />
              <Text style={{ color: 'white' }}>Sou médico</Text>
            </View>
          </View>
        </RadioButton.Group>

        {isSelected == 'P' ?
          <View style={{ width: '100%', justifyContent: "center", alignItems: "center", }}>
            <TextInput
              theme={theme}
              label='Nome'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <TextInput
              theme={theme}
              label='Data de nascimento'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={value}
              onChangeText={(text) => setValue(text)}
            />

            <TextInput
              theme={theme}
              label='Nome da mãe'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={nameM}
              onChangeText={(text) => setNameM(text)}
            />

            <TextInput
              theme={theme}
              label='Telefone'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={phoneNumber}
              keyboardType="phone-pad"
              onChangeText={(text) => setPhoneNumber(text)}
            />



            <View style={styles.picker}>
              <Picker
                style={{ color: 'white' }}
                dropdownIconColor={'white'}
                selectedValue={sexo}
                onValueChange={(value) => setSexo(value)}>
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
                style={{ color: 'white' }}
                dropdownIconColor={'white'}
                selectedValue={sexo}
                onValueChange={(value) => setSexo(value)}>
                <Picker.Item label="Selecione seu médico" value="" />
                {doctors.map((state) => (
                  <Picker.Item
                    key={state.id}
                    label={state.nome}
                    value={state.id}
                  />
                ))}
              </Picker>
            </View>

            <TextInput
              theme={theme}
              label='Email'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              theme={theme}
              label='Senha'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={senha}
              onChangeText={(text) => setSenha(text)}
              secureTextEntry
            />

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
              <Text style={{ ...styles.signUpBtnTxt, marginBottom: 30 }}>Já possuo uma conta</Text>
            </TouchableOpacity>
          </View>
          :
          //médico
          <View style={{ width: '100%', justifyContent: "center", alignItems: "center", }}>
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
                style={{ color: 'white' }}
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

            <TextInput
              theme={theme}
              label='Email'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              theme={theme}
              label='Senha'
              mode='flat'
              textColor="#000"
              style={styles.imput}
              value={senha}
              onChangeText={(text) => setSenha(text)}
              secureTextEntry
            />

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
              <Text style={{ ...styles.signUpBtnTxt, marginBottom: 30 }}>Já possuo uma conta</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </ScrollView>
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
    marginTop: 12,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
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
  picker: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2,
    marginTop: 12,
    width: '80%',
  },
});
