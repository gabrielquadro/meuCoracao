//rotas logado

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons';
import HomeMedico from '../pages/HomeMedico';
import ProfilePaciente from '../pages/ProfilePaciente';
import Search from '../pages/Search';
import AtualizarPerfilPaciente from '../pages/AtualizarPerfilPaciente';
import Formulario from '../pages/Formulario';
import Avaliar from '../pages/Avaliar'
import FormularioDetail from '../pages/FormularioDetail';
import FormularioList from '../pages/FormularioList';
import AtualizarPerfilMedico from '../pages/AtualizarPerfilMedico';
import PerfilPacienteM from '../pages/PerfilPacienteM'
import FormularioListPacientes from '../pages/FormularioListPacientes';
import FormularioListMedico from '../pages/FormularioListMedico';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeMedico" component={HomeMedico} options={{ headerShown: false }} />
            <Stack.Screen name="FormularioDetail" component={FormularioDetail}
                options={{ title: 'Formulário', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
            <Stack.Screen name="FormularioListMedico" component={FormularioListMedico}
                options={{ title: 'Lista de Formulários', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
        </Stack.Navigator>
    )
}

function StackRoutesForm() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FormularioListMedico" component={FormularioListMedico}
                options={{ headerShown: false }}  />
            <Stack.Screen name="FormularioDetail" component={FormularioDetail}
                options={{ title: 'Formulário', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
        </Stack.Navigator>
    )
}

function StackRoutesSearch() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="PerfilPacienteM" component={PerfilPacienteM}
                options={{ title: 'Perfil do paciente', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
            <Stack.Screen name="FormularioDetail" component={FormularioDetail}
                options={{ title: 'Formulário', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
            <Stack.Screen name="AtualizarPerfilPaciente" component={AtualizarPerfilPaciente}
                options={{ title: 'Atualizar Perfil', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
            <Stack.Screen name="FormularioListPacientes" component={FormularioListPacientes}
                options={{ title: 'Formularios', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />
        </Stack.Navigator>
    )
}

function StackRoutesProfile() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfilePaciente} options={{ headerShown: false }} />
            <Stack.Screen name="AtualizarPerfilMedico" component={AtualizarPerfilMedico}
                options={{ title: 'Atualizar Perfil', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />

            <Stack.Screen name="Avaliar" component={Avaliar}
                options={{ title: 'Avaliar o aplicativo', headerTintColor: '#FFF', headerStyle: { backgroundColor: '#36393F' } }} />

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
            <Tab.Screen name="HomeTabMedico" component={StackRoutes}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="home" color={color} size={size} />
                    }
                }} />

            <Tab.Screen name="FormTab" component={StackRoutesForm}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="list" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen name="SearchTab" component={StackRoutesSearch}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="search" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen name="ProfileTab" component={StackRoutesProfile}
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