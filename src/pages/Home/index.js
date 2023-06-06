import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { db, app, firebase } from '../../config'
import { AuthContext } from '../../contexts/auth'
import ListHome from "../../components/ListHome";
import { StatusBar } from 'expo-status-bar';




export default function Home() {
  const navigation = useNavigation();
  const [userP, setUserP] = useState([]);
  const [form, setForms] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);




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
      setLoading(true)
      let isActive = true;
      async function fetchPosts() {
        db.collection('formulario')
          .where('user', '==', user.uid)
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
            setLoading(false)


          })
      }
      fetchPosts();
      return () => {
        isActive = false;
      }
    }, [])
  )

  function handleForm(item) {
    navigation.navigate("FormularioListTab", { user: item });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator SIZE={70} color="red"></ActivityIndicator>
        </View>
      ) : (
        <View style={styles.container}>
          <Header />


          <View style={styles.container2}>
            {userP.sexo == 'M' ? (
              <Text style={{ fontSize: 20, marginBottom: 10 }} >Bem vindo {userP.nome}</Text>
            ) : (
              <Text style={{ fontSize: 20, marginBottom: 10 }} >Bem vinda {userP.nome}</Text>
            )}


            <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 20 }} >Útlmos registros</Text>

            <TouchableOpacity style={styles.btnAtt} onPress={() => handleForm(user)}>
              <Text style={styles.btnAttTxt}>Vizualiar todos</Text>
            </TouchableOpacity>

            <FlatList
              style={styles.list}
              data={form}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ListHome
                  data={item}
                />
              )}
            >
            </FlatList>

          </View>

          <TouchableOpacity
            style={styles.btnNew}
            //activeOpacity={0.8}
            onPress={() => navigation.navigate("Formulario")}
          >
            <Feather name="plus" color={"#FFF"} size={25} />
          </TouchableOpacity>
        </View>
      )}


    </View>
  )

  //   return (
  //     <View style={styles.container}>
  //       <Header />

  //       <View style={styles.container2}>
  //         {/* <Text style={{ fontSize: 20 }}>Home paciente</Text> */}
  //         <Text style={{ fontSize: 20, marginBottom: 20 }} >Bem vindo {userP.nome}</Text>

  //         <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 20 }} >Útlmos registros</Text>

  //         <TouchableOpacity style={styles.btnAtt} onPress={() => handleForm(user)}>
  //           <Text style={styles.btnAttTxt}>Vizualiar todos</Text>
  //         </TouchableOpacity>

  //         <FlatList
  //           style={styles.list}
  //           data={form}
  //           showsVerticalScrollIndicator={false}
  //           renderItem={({ item }) => (
  //             <ListHome
  //               data={item}
  //             />
  //           )}
  //         >
  //         </FlatList>

  //       </View>

  //       <TouchableOpacity
  //         style={styles.btnNew}
  //         //activeOpacity={0.8}
  //         onPress={() => navigation.navigate("Formulario")}
  //       >
  //         <Feather name="plus" color={"#FFF"} size={25} />
  //       </TouchableOpacity>
  //     </View>
  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#353840",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    margin: 10
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
    marginBottom: 20
  },
});