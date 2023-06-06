import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Fontisto, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db, app, firebase } from "../../config";
import { useNavigation, useFocusEffect } from "@react-navigation/native";



function ListHome({ data }) {
  const dataJson = JSON.parse(JSON.stringify(data?.created));
  const navigation = useNavigation();

  const getColor = () => {
    if (data.diagDorPeito && data.diagInsuficienciaCard) {
      if (data.diagDorPeito == 'Grave' || data.diagInsuficienciaCard == 'Grave') {
        return 'red';
      } else if (data.diagDorPeito == 'Moderado' || data.diagInsuficienciaCard == 'Moderado') {
        return 'orange'
      } else if (data.diagDorPeito == 'Leve' || data.diagInsuficienciaCard == 'Leve') {
        return 'yellow'
      } else if (data.diagDorPeito == 'Tranquilo' || data.diagInsuficienciaCard == 'Tranquilo') {
        return 'green'
      }
    } else {
      return 'white'
    }
  };

  const getGrav = () => {
    if (data.diagDorPeito && data.diagInsuficienciaCard) {
      if (data.diagDorPeito == 'Grave' || data.diagInsuficienciaCard == 'Grave') {
        return 'Grave';
      } else if (data.diagDorPeito == 'Moderado' || data.diagInsuficienciaCard == 'Moderado') {
        return 'Moderado'
      } else if (data.diagDorPeito == 'Leve' || data.diagInsuficienciaCard == 'Leve') {
        return 'Leve'
      } else if (data.diagDorPeito == 'Tranquilo' || data.diagInsuficienciaCard == 'Tranquilo') {
        return 'Tranquilo'
      }
    } else {
      return ''
    }
  };

  function formatarData(segundos, nanossegundos) {
    // Converter segundos e nanossegundos para milissegundos
    const milissegundos = segundos * 1000 + Math.floor(nanossegundos / 1000000);

    // Criar um objeto Date a partir dos milissegundos
    const data = new Date(milissegundos);

    // Extrair os valores do dia, mês, ano, hora e minuto
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString().padStart(4, '0');
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');

    // Formatar a data no formato desejado
    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;

    return dataFormatada;
  }

  function deleteForm(id) {
    console.log(id)
    db.collection("formulario")
      .doc(id.id)
      .delete()
      .then(() => {
        console.log("deletado");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDelete(id) {
    Alert.alert(
      'Confirmação',
      'Deseja remover?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => deleteForm(id)
        }
      ],
      { cancelable: false }
    );



  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('FormularioDetail', { item: data, medico: false })}>
      <View >
        <MaterialCommunityIcons name="circle" size={40} color={getColor()} />
        <Text>{getGrav()}</Text>
      </View>
      <Text>{formatarData(dataJson.seconds, dataJson.nanoseconds)}</Text>
      {/* <MaterialIcons onPress={(value) => handleDelete(data)} name="delete" size={26} color="red" /> */}
      {/* <Fontisto name="doctor" size={30} color={data.userModificacao ? 'green' : 'red'} /> */}
      <MaterialCommunityIcons name="doctor" size={40} color={data.respondido ? 'green' : 'red'} />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 3,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});

export default ListHome;