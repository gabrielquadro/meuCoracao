import React, { useState, useRef , useContext} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RadioButton, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../config'
import { AuthContext } from '../../contexts/auth'

export default function Formulario() {
    const [checked, setChecked] = useState('');
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const pickerRef = useRef();
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);


    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    async function handleSave() {
        await db.collection('formulario').add({
            created: new Date(),
            user: user.uid,
            pergunta01: checked? 'S' : 'N',
            opcao1: checked2? 'S' : 'N',
            opcao2: checked3? 'S' : 'N',
            pergunta3: selectedLanguage? selectedLanguage : 'opção1'
        })
        .then(()=> {
            console.log('Formulario criado')
        })
        .catch((error) => {
            console.log(error);
        })
        navigation.goBack();
    }

    return (
        <View style={styles.container} >
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.question}>Pergunta 01?</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked('first') }}
                    />
                    <Text style={styles.radioTxt}>Sim</Text>
                    <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked('second') }}
                    />
                    <Text style={styles.radioTxt}>Não</Text>
                </View>
                <Text style={styles.question}>Pergunta 02</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                        status={checked2 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked2(!checked2);
                        }}
                    />
                    <Text style={styles.radioTxt} onPress={() => {
                        setChecked2(!checked2);
                    }}>Opção 1</Text>
                    <Checkbox
                        status={checked3 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked3(!checked3);
                        }}
                    />
                    <Text style={styles.radioTxt} onPress={() => {
                        setChecked3(!checked3);
                    }}>Opção 2</Text>
                </View>
                <Text style={styles.question}>Pergunta 03</Text>
                <Picker
                    ref={pickerRef}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Opção 01" value="opção1" />
                    <Picker.Item label="Opção 02" value="opção2" />
                </Picker>

                <TouchableOpacity onPress={handleSave} style={styles.btnSalvar}>
                    <Text style={styles.btnSalvarTxt}>Salvar</Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
        //backgroundColor: "#36393F",
    },
    question: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 5
    },
    radioTxt: {
        fontSize: 18
    },
    btnSalvar: {
        marginTop: 16,
        backgroundColor: '#ddd',
        //width: '80%',
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnSalvarTxt: {
        fontSize: 18,
        color: '#353840'
    },
});
