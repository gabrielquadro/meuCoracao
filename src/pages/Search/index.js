import React , {  useState , useEffect }from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, FlatList, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Search() {
    const [imput, setImput] = useState('');
    const [users, setUsers] = useState([]);

    

    return (
        <SafeAreaView style={styles.container}>
            <Text>Tela search</Text>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353840',
        paddingTop: 14
    },
    areaimput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        margin: 10,
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    imput: {
        width: '90%',
        backgroundColor: 'F1F1F1',
        height: 40,
        paddingLeft: 8,
        fontSize: 17,
        color:'#121212'
    },
    list: {
        flex: 1,
    }
   

});