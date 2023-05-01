//rotas não logado

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../pages/Login';
import Cadastrar from '../pages/Cadastrar';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Cadastrar'
                component={Cadastrar}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}
export default AuthRoutes;