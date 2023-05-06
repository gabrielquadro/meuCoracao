import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Header from "../../components/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { db, app, firebase } from '../../config'
import { AuthContext } from '../../contexts/auth'
// import ListHome from "../../components/ListHome";
import ListFormMedico from '../../pages/ListFormMedico'

export default function Home() {

  const navigation = useNavigation();
  const [userP, setUserP] = useState([]);
  const [form, setForms] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getUser() {
      const userprofile = db.collection('users').doc(user.uid).get()
        .then((value) => {
          setUserP(value.data());
        })
    }
    getUser();

  }, [])

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function fetchPosts() {
        db.collection('formulario')
          .where('medico', '==', user.uid)
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then((snapshoot) => {
            setForms([]);
            const formList = [];
            snapshoot.docs.map(u => {
              formList.push({
                ...u.data(),
                id: u.id,
              })
            })

            setForms(formList);

          })
      }
      fetchPosts();
      return () => {
        isActive = false;
      }
    }, [])
  )


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>

        <Text style={{ fontSize: 20, marginBottom: 20 }} >Bem vindo {userP.nome}</Text>


        <TouchableOpacity style={styles.btnAtt} onPress={() => navigation.navigate("SearchTab")}>
          <Text style={styles.btnAttTxt}>Vizualiar todos os pacientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAtt} onPress={() => navigation.navigate("FormTab")}>
          <Text style={styles.btnAttTxt}>Vizualiar todos os formularios</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20 }} >Útlmos registros do seus pacientes</Text>

        <FlatList
          style={styles.list}
          data={form}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListFormMedico
              data={item}
            />
          )}
        >
        </FlatList>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "##a0a4a5",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 30
    //justifyContent: "center",
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
  list: {
    flex: 1,
    width: '100%'
  },
  btnAtt: {
    // backgroundColor: '#428cfd',
    backgroundColor: "#ddd",
    width: "80%",
    height: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
