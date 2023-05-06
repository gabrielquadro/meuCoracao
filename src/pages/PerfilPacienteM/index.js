import React, { useState, useContext, useCallback, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import { db, app, firebase } from "../../config";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ListHome from "../../components/ListHome";


export default function ProfilePaciente({ route }) {
    const { item } = route.params;
    const navigation = useNavigation();
    const { signOut, user } = useContext(AuthContext);
    const [urlI, setUrlI] = useState(null);
    const [userP, setUserP] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [medico, setMedico] = useState(false);
    const [form, setForms] = useState([]);

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
        const ref = firebase
            .storage()
            .ref()
            .child("fotoPerfil/" + item.id);
        const snapshot = await ref.put(blob);
        console.log("Uploaded a blob or file!");
        setIsLoading(true);
        getImageFromFirebase();
    };

    const getImageFromFirebase = async () => {
        try {
            const ref = firebase
                .storage()
                .ref()
                .child("fotoPerfil/" + item.id);
            const url = await ref.getDownloadURL();
            setUrlI(url);
        } catch (e) {
            setUrlI(null);
        }
    };


    useEffect(() => {
        db.collection("users")
            .doc(item.id)
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
                .doc(item.id)
                .get()
                .then((value) => {
                    setUserP(value.data());
                    setName(value.data().nome);
                    setMedico(value.data().isDoctor);
                });
            getImageFromFirebase();
            return () => {
                isActive = false;
            };
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            async function fetchPosts() {
                db.collection('formulario')
                    .where('user', '==', item.id)
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
                        console.log(formList)

                    })
            }
            fetchPosts();
            return () => {
                isActive = false;
            }
        }, [])
    )

    function handleAtt(item) {
        navigation.navigate("AtualizarPerfilPaciente", {user : item});
    }

    function handleForm(item) {
        navigation.navigate("FormularioListPacientes", {user : item});
    }

    return (
        <View style={styles.container}>


                {urlI ? (
                    <Image style={styles.img} source={{ uri: urlI }} />
                ) : (
                    <Image
                        style={styles.img}
                        source={require("../../assets/avatar.png")}
                    />
                )}
  

            <Text style={styles.nome}>Perfil de {name}</Text>
            
            <TouchableOpacity style={styles.btnAtt} onPress={() => handleAtt(item)}>
                <Text style={styles.btnAttTxt}>Atualizar perfil do paciente</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 20, marginBottom: 10, color:'white' }} >Úlmos registros</Text>

            <TouchableOpacity style={styles.btnAtt} onPress={() => handleForm(item)}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#353840",
        alignItems: "center",
        paddingTop: 10
    },
    nome: {
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 28,
        fontWeight: "bold",
        color: "#f1f1f1",
        marginBottom: 20
    },
    email: {
        color: "#f1f1f1",
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 28,
        fontSize: 18,
        fontStyle: "italic",
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
    btnAttTxt: {
        fontSize: 15,
        color: "#000",
    },
    btnSair: {
        marginTop: 16,
        backgroundColor: "#ff4040",
        width: "80%",
        height: 40,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    btnSairTxt: {
        fontSize: 15,
        color: "#fff",
    },
    img: {
        // width: 120,
        // height: 120,
        // borderRadius: 15,
        // marginTop: 20,
        width: 160,
        height: 160,
        borderRadius: 80,
    },
    UploadButton: {
        marginTop: "20%",
        backgroundColor: "#fff",
        width: 165,
        height: 165,
        borderRadius: 90,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 8,
        zIndex: 99,
    },
    UploadButtonTxt: {
        fontSize: 55,
        position: "absolute",
        zIndex: 99,
        bottom: "-10%",
        right: "-10%",
        color: "#FFF",
    },
    list: {
        flex: 1,
        width: '90%',
    }
});
