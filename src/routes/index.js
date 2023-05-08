import React, { useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import DocRoutes from './doctor.routes';
import { AuthContext } from '../contexts/auth';

import { db } from '../config'

function Routes() {
    //controla s eta logado
    const { signed, loading } = useContext(AuthContext);
    const { signOut, user } = useContext(AuthContext);
    const [userP, setUserP] = useState([]);
    async function getUser() {
        const userprofile = db.collection('users').doc(user?.uid).get()
            .then((value) => {
                setUserP(value.data());
            })
    }
    getUser();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#36393F' }}>
                <ActivityIndicator size={50} color="#E52246" />
            </View>
        )
    }

    return (
        signed ? userP?.isDoctor ? <DocRoutes /> : <AppRoutes /> : <AuthRoutes />
        //signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;