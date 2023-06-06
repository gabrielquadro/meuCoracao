import React, { useState, createContext, useEffect } from 'react'
import { auth, db } from '../config'
// import { Alert, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    Modal
} from "react-native";


export const AuthContext = createContext([]);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [msgModal, setMsgModal] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@userMeuCoracao');
            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)

        }
        loadStorage();
    }, [])

    async function signUp(email, password, name, isSelected) {
        setLoadingAuth(true);
        await auth.createUserWithEmailAndPassword(email, password)
            .then((value) => {
                const uid = value.user.uid
                db.collection('users').doc(uid)
                    .set({
                        nome: name,
                        createdAt: new Date(),
                        isDoctor: isSelected
                    }).then(() => {
                        let data = {
                            uid: uid,
                            nome: name,
                            email: value.user.email,
                            isDoctor: isSelected
                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
            })
            .catch((error) => {
                setMsgModal("Erro ao fazer um novo cadastro")
                setModalVisible(true)
                console.log(error);
                setLoadingAuth(false);

            })
    }

    async function signUpMedico(email, password, name, crm, selectedState) {
        setLoadingAuth(true);
        await auth.createUserWithEmailAndPassword(email, password)
            .then((value) => {
                const uid = value.user.uid
                db.collection('users').doc(uid)
                    .set({
                        nome: name,
                        createdAt: new Date(),
                        isDoctor: true,
                        crm: crm,
                        estado: selectedState
                    }).then(() => {
                        let data = {
                            uid: uid,
                            nome: name,
                            email: value.user.email,
                            isDoctor: true,
                            crm: crm,
                            estado: selectedState
                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
            })
            .catch((error) => {
                setMsgModal("Erro ao fazer um novo cadastro")
                setModalVisible(true)
                console.log(error);
                setLoadingAuth(false);

            })
    }

    async function signUpPaciente(email, password, name, phoneNumber, nameM, sexo, docSelected, year, month, day) {
        setLoadingAuth(true);
        console.log(docSelected)
        await auth.createUserWithEmailAndPassword(email, password)
            .then((value) => {
                const uid = value.user.uid
                db.collection('users').doc(uid)
                    .set({
                        nome: name,
                        createdAt: new Date(),
                        isDoctor: false,
                        telefone: phoneNumber,
                        nomeMae: nameM,
                        sexo: sexo,
                        diaNascimento: day,
                        mesNascimento: month,
                        anoNascimento: year,
                        medico: docSelected
                    }).then(() => {
                        let data = {
                            uid: uid,
                            nome: name,
                            email: value.user.email,
                            isDoctor: false,
                            isDoctor: false,
                            telefone: phoneNumber,
                            nomeMae: nameM,
                            sexo: sexo,
                            medico: docSelected,
                            diaNascimento: day,
                            mesNascimento: month,
                            anoNascimento: year
                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
            })
            .catch((error) => {
                // Alert.alert("Atenção", "Erro ao fazer um novo cadastro!");
                setMsgModal("Erro ao fazer um novo cadastro")
                setModalVisible(true)
                console.log(error);
                setLoadingAuth(false);

            })
    }


    async function signIn(email, password) {
        setLoadingAuth(true);

        auth.signInWithEmailAndPassword(email, password)
            .then((value) => {
                const uid = value.user.uid
                const userprofile = db.collection('user').doc(uid).get();
                let data = {
                    uid: uid,
                    nome: userprofile.nome,
                    email: value.user.email
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);


            })
            .catch((error) => {
                // Alert.alert("Atenção", "Usuário ou senha incorreto!");
                setMsgModal("Usuário ou senha incorreto.")
                setModalVisible(true)
                console.log(error);
                setLoadingAuth(false);

            })
    }

    async function signOut() {
        await auth.signOut();
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('@userMeuCoracao', JSON.stringify(data))
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, signUp, signIn, loadingAuth, loading, signOut, user, signUpMedico, signUpPaciente }}>

            <Modal visible={modalVisible} transparent={true} animationType="fade" >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{msgModal}</Text>
                        {/* <Button title="Fechar" onPress={closeModal} /> */}
                        <TouchableOpacity onPress={closeModal} style={styles.btnModal}>
                            <Text style={styles.btnTxt}>Fechar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>



                {children}
            </AuthContext.Provider>




    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#36393F',
        backgroundColor: "#a0a4a5",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#FFF",
        fontSize: 45,
        fontWeight: "bold",
        fontStyle: "italic",
        marginBottom: 20,
    },
    imput: {
        width: "80%",
        marginTop: 12,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
    },
    btn: {
        width: "80%",
        backgroundColor: "#d04556",
        //595458
        borderRadius: 8,
        marginTop: 15,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    btnTxt: {
        color: "#FFF",
        fontSize: 15,
    },
    signUpBtn: {
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    signUpBtnTxt: {
        color: "#FFF",
        fontSize: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: 12,
        width: "80%",
    },
    checkbox: {
        marginRight: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 2,
        marginTop: 12,
        width: '80%',
    },
    imputD: {
        flex: 1,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        padding: 35
    },
    modalText: {
        fontSize: 18,
        marginBottom: 16,
    },
    btnModal: {
        width: '80%',
        backgroundColor: "#d04556",
        //595458
        borderRadius: 8,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 80,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AuthProvider;