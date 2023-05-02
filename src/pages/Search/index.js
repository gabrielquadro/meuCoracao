import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../config";
import SearchList from "../../components/SearchList";
import { AuthContext } from '../../contexts/auth'

export default function Search() {
  const [imput, setImput] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (imput === '' || imput === undefined) {

      const subscriber = db.collection('users').orderBy('nome') .where('medico', '==', user.uid)
        .onSnapshot(snapshot => {
          const list = [];
          snapshot.forEach(doc => {
            //mostra só os pacientes
            if (doc.data().isDoctor == false) {
              list.push({
                ...doc.data(),
                id: doc.id
              })
            }

          })
          console.log(list)
          setUsers(list)
        })
      return;
    }

    setUsers([]);
    const subscriber = db.collection('users')
      .where('medico', '==', user.uid)
      .where('nome', '>=', imput)
      .where('nome', '<=', imput + "\uf8ff")
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          //mostra só os pacientes
          if (doc.data().isDoctor == false) {
            list.push({
              ...doc.data(),
              id: doc.id
            })
          }

        })
        console.log(list)
        console.log('uid: '+user.uid)
        setUsers(list)
      })

    return () => subscriber();
  }, [imput])



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaimput}>
        <Feather name="search" color={"#e52246"} size={20} />
        <TextInput
          style={styles.imput}
          placeholder="Digite o nome do usuário"
          onChangeText={(text) => setImput(text)}
        ></TextInput>
      </View>
      <FlatList
        style={styles.list}
        data={users}
        renderItem={({ item }) => <SearchList data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#353840",
    paddingTop: 14,
  },
  areaimput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    margin: 10,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  imput: {
    width: "90%",
    backgroundColor: "F1F1F1",
    height: 40,
    paddingLeft: 8,
    fontSize: 17,
    color: "#121212",
  },
  list: {
    flex: 1,
  },
});
