//rotas logado

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons';
import Home from '../pages/Home';
import ProfilePaciente from '../pages/ProfilePaciente';
import AtualizarPerfilPaciente from '../pages/AtualizarPerfilPaciente';
import Formulario from '../pages/Formulario';
import Avaliar from '../pages/Avaliar'
import FormularioDetail from '../pages/FormularioDetail';
import FormularioList from '../pages/FormularioList';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Formulario" component={Formulario}
                options={{ title: 'Novo formulário', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
            <Stack.Screen name="FormularioDetail" component={FormularioDetail}
                options={{ title: 'Formulário', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />

        </Stack.Navigator>
    )
}

function StackRoutesProfile() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfilePaciente} options={{ headerShown: false }} />
            <Stack.Screen name="AtualizarPerfilPaciente" component={AtualizarPerfilPaciente}
                options={{ title: 'Atualizar Perfil', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
            <Stack.Screen name="Avaliar" component={Avaliar}
                options={{ title: 'Avaliar o aplicativo', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />

        </Stack.Navigator>
    )
}

function StackRoutesForm() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FormularioList" component={FormularioList} options={{ headerShown: false }} />
            <Stack.Screen name="FormularioDetail" component={FormularioDetail}
                options={{ title: 'Formulário', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
        </Stack.Navigator>
    )
}

function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFF',
                tabBarStyle: {
                    backgroundColor: '#202225',
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen name="HomeTab" component={StackRoutes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="home" color={color} size={size} />
                    }
                }} />

            <Tab.Screen name="FormularioListTab" component={StackRoutesForm}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="list" color={color} size={size} />
                    }
                }} />

            <Tab.Screen name="ProfilePerfil" component={StackRoutesProfile}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="user" color={color} size={size} />
                    }
                }}
            />

        </Tab.Navigator>
    )
}

export default AppRoutes;