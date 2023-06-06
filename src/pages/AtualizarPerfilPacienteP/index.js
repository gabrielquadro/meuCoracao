import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
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
  const [value, setValue] = useState('');
  const [created, setCreated] = useState("");
  const [isDoc, setIsDoc] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [docSelected, setDocSelected] = useState([]);
  const navigation = useNavigation();
  const { signOut, user } = useContext(AuthContext);
  const [userP, setUserP] = useState({});
  const [info, setInfo] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cirurgia, setCirurgia] = useState('');
  const [loading, setLoading] = useState(false);
  const [diabetes, setDiabetes] = useState('');
  const [hipertencao, setHipertencao] = useState('');
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

  const tipoCirurgia = [
    { label: "Revascularização do miocardio", value: "RM" },
    { label: "Troca valvar aortica", value: "TVA" },
    { label: "Troca valvar mitral", value: "TVM" },
    { label: "Reconstrução de aorta", value: "RA" },
    { label: "Implante de marcapasso", value: "IM" },
    { label: "Cirurgia estrutural(comunicação inreratrial", value: "CE" },
  ];

  const sexoList = [
    { label: "Masculino", value: "M" },
    { label: "Feminino", value: "F" },
  ];

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleDayChange = (value) => {
    setDay(value);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
  };

  const handleYearChange = (value) => {
    setYear(value);
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
    setLoading(true)
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((value) => {
        console.log(value.data());
        setUserP(value.data());
        setName(value.data().nome);
        // setValue(JSON.parse(JSON.stringify(value.data().dataNascimento)));
        setNameM(value.data().nomeMae);
        setPhoneNumber(value.data().telefone);
        setSexo(value.data().sexo);
        setDocSelected(value.data().medico);
        setCreated(value.data().createdAt);
        setIsDoc(value.data().isDoctor);
        setDay(value.data().diaNascimento)
        setMonth(value.data().mesNascimento)
        setYear(value.data().anoNascimento)
        setCirurgia(value.data().cirurgia)
        setDiabetes(value.data().diabetes ? value.data().diabetes : '')
        setHipertencao(value.data().hipertencao ? value.data().hipertencao : '')
      }).finally(() => {
        setLoading(false)

      });
  }, []);

  async function updtade() {
    console.log(user.uid)
    db.collection("users")
      .doc(user.uid)
      .set({
        createdAt: created,
        telefone: phoneNumber,
        dataNascimento: new Date(year, month - 1, day),
        isDoctor: isDoc,
        medico: docSelected,
        nome: name,
        nomeMae: nameM,
        sexo: sexo,
        diaNascimento: day,
        mesNascimento: month,
        anoNascimento: year,
        cirurgia: cirurgia,
        diabetes: diabetes,
        hipertencao: hipertencao
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
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator SIZE={70} color="red"></ActivityIndicator>
        </View>
      ) : (
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
          <Text style={{ color: 'black', width: '80%', marginVertical: 12 }}>Data de nascimento</Text>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <TextInput
              theme={theme}
              mode='flat'
              style={{ ...styles.imputD, marginRight: 5 }}
              placeholder="Dia"
              value={day}
              onChangeText={handleDayChange}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>/</Text>
            <TextInput
              theme={theme}
              style={{ ...styles.imputD, marginRight: 5 }}
              placeholder="Mês"
              value={month}
              onChangeText={handleMonthChange}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>/</Text>
            <TextInput
              theme={theme}
              style={styles.imputD}
              placeholder="Ano"
              value={year}
              onChangeText={handleYearChange}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>

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

          <Text style={{ marginTop: 10 }}>Cirugia</Text>
          <View style={styles.picker}>
            <Picker
              style={{ color: "black" }}
              dropdownIconColor={"black"}

              selectedValue={cirurgia}
              onValueChange={(value) => setCirurgia(value)}
            >
              <Picker.Item label="Selecione seu cirurgia" value="" />
              {tipoCirurgia.map((state) => (
                <Picker.Item
                  key={state.value}
                  label={state.label}
                  value={state.value}
                />
              ))}
            </Picker>
          </View>

          <Text style={{ marginTop: 10 }}>Possui diabetes?</Text>
          <RadioButton.Group onValueChange={setDiabetes} value={diabetes} editable={false}>
            <View style={{ flexDirection: 'row' }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                <RadioButton
                  value="Sim"
                  theme={theme}
                />
                <Text style={{ color: 'black' }}>Sim</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                <RadioButton
                  value="Nao"
                  theme={theme}
                />
                <Text style={{ color: 'black' }}>Não</Text>
              </View>
            </View>
          </RadioButton.Group>

          <Text style={{ marginTop: 10 }}>Possui hipertenção?</Text>
          <RadioButton.Group onValueChange={setHipertencao} value={hipertencao} editable={false}>
            <View style={{ flexDirection: 'row' }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                <RadioButton
                  value="Sim"
                  theme={theme}
                />
                <Text style={{ color: 'black' }}>Sim</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                <RadioButton
                  value="Nao"
                  theme={theme}
                />
                <Text style={{ color: 'black' }}>Não</Text>
              </View>

            </View>
          </RadioButton.Group>


          <TouchableOpacity style={styles.btn} onPress={updtade}>
            <Text style={styles.btnTxt}>Atualizar perfil</Text>
          </TouchableOpacity>
        </ScrollView>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#36393F',
    // backgroundColor: "#a0a4a5",
    paddingHorizontal: '8%',
    //justifyContent: "center",
    // alignItems: "center",
  },
  imput: {
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
    marginBottom: 40
  },
  btnTxt: {
    color: "#FFF",
    fontSize: 15,
  },
  imputD: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 1
  },
});
