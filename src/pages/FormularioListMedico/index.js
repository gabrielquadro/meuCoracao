import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { db, app, firebase } from '../../config'
import { AuthContext } from '../../contexts/auth'
import ListFormMedico from "../../pages/ListFormMedico";


export default function FormularioListMedico() {
    const navigation = useNavigation();
    const [userP, setUserP] = useState([]);
    const [form, setForms] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);



    // useEffect(() => {
    //     async function fetchPosts() {
    //         setLoading(true)
    //         await db.collection('formulario')
    //             .where('medico', '==', user.uid)
    //             .orderBy('created', 'desc')
    //             .get()
    //             .then((snapshoot) => {
    //                 setForms([]);
    //                 const formList = [];
    //                 snapshoot.docs.map(u => {
    //                     formList.push({
    //                         ...u.data(),
    //                         id: u.id,
    //                     })
    //                 })

    //                 setForms(formList);
    //                 setLoading(false)
    //             })
    //     }
    //     fetchPosts();
    // }, [])

    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            async function fetchPosts() {
                await db.collection('formulario')
                    .where('medico', '==', user.uid)
                    .orderBy('created', 'desc')
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
                    .finally(() => {
                        setLoading(false)
                    })
            }
            fetchPosts();
            console.log('entra')
        }, [])
    );

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
                        <Text style={{ fontSize: 20 }}>Formulários</Text>
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
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#353840",
    },
    container2: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 20
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
        width: '100%',
        marginTop: 20
    }
});
