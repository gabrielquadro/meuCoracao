import React, { useState, createContext, useEffect } from 'react'
import { auth, db } from '../config'
import {Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext([]);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@userMeuCoracao');
            if(storageUser){
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
                Alert.alert("Usuário ou senha incorreto!");
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

    async function storageUser(data){
        await AsyncStorage.setItem('@userMeuCoracao', JSON.stringify(data))
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, signUp, signIn , loadingAuth, loading, signOut, user}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;