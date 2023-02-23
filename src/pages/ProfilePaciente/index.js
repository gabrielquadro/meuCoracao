import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { db, app, firebase } from '../../config'
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePaciente() {

    const { signOut, user } = useContext(AuthContext);
    const [urlI, setUrlI] = useState('https://sujeitoprogramador.com/steve.png');
    const [userP, setUserP] = useState([]);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);

        if (!result.canceled) {
            uploadImage(result.uri, user.uid);
            setImage(result.assets[0].uri);
            setUrlI(result.assets[0].uri);
        }
    };

    const uploadImage = async(uri, imgName) => {
        const resposnse = await fetch(uri);
        const blob = await resposnse.blob();
        var ref = db.storage.ref().child("imagesPerfil/" + imgName);
        return ref.put(blob);

    }


    async function handleSignOut() {
        await signOut();
    }

    useEffect(() => {
        async function getUser() {
            const userprofile = db.collection('users').doc(user.uid).get()
                .then((value) => {
                    setUserP(value.data());
                })
        }
        getUser();
    }, [])

    return (
        <View style={styles.container}>
            <Header />

            {urlI ? (
                <TouchableOpacity style={styles.UploadButton} onPress={pickImage}>
                    <Text style={styles.UploadButtonTxt}>+</Text>
                    <Image
                        style={styles.img}
                        source={{ uri: urlI }}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.UploadButton} onPress={() => alert("CLICOU 2")}>
                    <Text style={styles.UploadButtonTxt}>+</Text>
                </TouchableOpacity>

            )}

            {/* <Image
                style={styles.img}
                source={require('../../assets/avatar.png')}
            /> */}




            <Text style={styles.nome} >{userP.nome}</Text>
            <Text style={styles.email} >{user.email}</Text>
            <TouchableOpacity style={styles.btnAtt}>
                <Text style={styles.btnAttTxt}>Atualizar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.btnSair}>
                <Text style={styles.btnSairTxt}>Sair</Text>
            </TouchableOpacity>
            {/* <Button title='Sair' onPress={handleSignOut}></Button> */}
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
        color: '#FFF'

    }


});