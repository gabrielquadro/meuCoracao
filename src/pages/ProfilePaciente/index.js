import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { db } from '../../config'


export default function ProfilePaciente() {

    const { signOut, user } = useContext(AuthContext);
    const [ urlI, setUrlI ] = useState('https://sujeitoprogramador.com/steve.png');
    const [userP, setUserP] = useState([]);


    async function handleSignOut() {
        await signOut();
    }


    
    return (
        <View style={styles.container}>
            <Header />
        
            <Text>Tela profile paciente</Text>

            <TouchableOpacity onPress={handleSignOut} style={styles.btnSair}>
                <Text style={styles.btnSairTxt}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353840',
        alignItems: 'center'
    },
    nome: {
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f1f1f1'
    },
    email: {
        color: '#f1f1f1',
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 28,
        fontSize: 18,
        fontStyle: 'italic'
    },
    btnAtt: {
        marginTop: 16,
        backgroundColor: '#428cfd',
        width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAttTxt: {
        fontSize: 18,
        color: '#FFF'
    },
    btnSair: {
        marginTop: 16,
        backgroundColor: '#ddd',
        width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnSairTxt: {
        fontSize: 18,
        color: '#353840'
    },
    img: {
        // width: 120,
        // height: 120,
        // borderRadius: 15,
        // marginTop: 20,
        width: 160,
        height: 160,
        borderRadius: 80
    },
    UploadButton: {
        marginTop: '20%',
        backgroundColor: '#fff',
        width: 165,
        height: 165,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 8,
        zIndex: 99

    },
    UploadButtonTxt: {
        fontSize: 55,
        position: 'absolute',
        zIndex: 99,
        bottom: '-10%',
        right: '-10%',
        color:'#FFF'

    }


});