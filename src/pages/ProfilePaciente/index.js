import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { db, app, firebase } from '../../config'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from "@react-navigation/native";


export default function ProfilePaciente() {
    const navigation = useNavigation();
    const { signOut, user } = useContext(AuthContext);
    const [urlI, setUrlI] = useState(null);
    const [userP, setUserP] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [name, setName] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            uploadImage(result.assets[0].uri);

        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child("fotoPerfil/" + user.uid);
        const snapshot = await ref.put(blob);
        console.log('Uploaded a blob or file!');
        setIsLoading(true)
        getImageFromFirebase();
    };

    const getImageFromFirebase = async () => {
        try {
            const ref = firebase.storage().ref().child('fotoPerfil/' + user.uid);
            const url = await ref.getDownloadURL();
            setUrlI(url);
        } catch (e) {
            setUrlI(null)
        }

    };


    async function handleSignOut() {
        await signOut();
    }



    // useEffect(() => {
    //     async function getUser() {
    //         const userProfileRef = db.collection('users').doc(user.uid);
    //         try {
    //             const userProfile = await userProfileRef.get();
    //             setUserP(userProfile.data())
    //             setName(userProfile.data().nome)
    //             setEmail(userProfile.data().email)
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     getUser();
    //     getImageFromFirebase();
    // }, [])

    useEffect(() => {
        db.collection("users")
            .doc(user.uid)
            .get()
            .then((value) => {
                setUserP(value.data());
                setName(value.data().nome);
            });
        getImageFromFirebase();
    }, []);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            db.collection("users")
                .doc(user.uid)
                .get()
                .then((value) => {
                    setUserP(value.data());
                    setName(value.data().nome);
                });
            getImageFromFirebase();
            return () => {
                isActive = false;
            };
        }, [])
    );



    return (
        <View style={styles.container}>
            <Header />

            <TouchableOpacity style={styles.UploadButton} onPress={pickImage}>
                <Text style={styles.UploadButtonTxt}>+</Text>
                {urlI ?

                    <Image
                        style={styles.img}
                        source={{ uri: urlI }}
                    />

                    :

                    <Image
                        style={styles.img}
                        source={require('../../assets/avatar.png')}
                    />
                }
            </TouchableOpacity>

            <Text style={styles.nome} >{name}</Text>
            <Text style={styles.email} >{user.email}</Text>
            <TouchableOpacity style={styles.btnAtt} onPress={() => navigation.navigate("AtualizarPerfilPaciente")}>
                <Text style={styles.btnAttTxt} >Atualizar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAtt} onPress={() => navigation.navigate("Avaliar")}>
                <Text style={styles.btnAttTxt} >Avalair o aplicativo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.btnSair}>
                <Text style={{ ...styles.btnSairTxt }}>Sair</Text>
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
        // backgroundColor: '#428cfd',
        backgroundColor: '#ddd',
        width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAttTxt: {
        fontSize: 15,
        color: '#000'
    },
    btnSair: {
        marginTop: 16,
        backgroundColor: '#ff4040',
        width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnSairTxt: {
        fontSize: 15,
        color: '#fff'
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