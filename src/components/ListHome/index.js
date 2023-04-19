import React from 'react';
import { View, Text, StyleSheet } from 'react-native';




function ListHome({ data }) {
    const dataJson = JSON.parse(JSON.stringify(data?.created));

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

    return (
        <View style={styles.container}>
            <Text>{formatarData(dataJson.seconds, dataJson.nanoseconds)}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        margin: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 3,
        padding: 10,
        alignItems:'center', 
        justifyContent:'center'
    },

});

export default ListHome;