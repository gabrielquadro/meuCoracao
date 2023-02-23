import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { db } from '../../config'

export default function SearchList({ data }) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {

            //console.log(data.user);
            const userprofile = db.collection('users').doc(data.user).get()
                .then((value) => {
                    setUser(value.data());
                    console.log(user)
                })
        }
        getUser();
    }, [])
    return (
        <TouchableOpacity style={styles.container}>
            <Image
            style={styles.img}
            source={require('../../assets/avatar.png')}
        />
            <Text numberOfLines={1} style={styles.name}>{data.nome}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#222227',
        borderRadius: 4
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 10
    },
    name: {
        color: '#f1f1f1',
        fontSize: 17
    }


});