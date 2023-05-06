import React, { useState, useRef, useContext , useEffect} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RadioButton, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../config'
import { AuthContext } from '../../contexts/auth'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';


export default function Formulario() {
    const [checked, setChecked] = useState('');
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const pickerRef = useRef();
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [isSelected, setSelection] = useState('P');
    const [doc, setDoc] = useState('');


    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: 'white',
            onSurfaceVariant: 'white',
        },
    };

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
    useEffect(() => {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((value) => {
            setDoc(value.data().medico);
          });
      }, []);

    async function handleSave() {
        await db.collection('formulario').add({
            created: new Date(),
            user: user.uid,
            pergunta01: isSelected ? isSelected : '',
            opcao1: checked2 ? 'S' : 'N',
            opcao2: checked3 ? 'S' : 'N',
            pergunta3: selectedLanguage ? selectedLanguage : 'opção1',
            medico: doc
        })
            .then(() => {
                console.log('Formulario criado')
            })
            .catch((error) => {
                console.log(error);
            })
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container} >
             <View style={styles.containerS}>
                <Text style={styles.question}>Pergunta 01?</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'white' }}>Sim</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'white' }}>Não</Text>
                        </View>
                    </View>
                </RadioButton.Group>
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

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a0a4a5"
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
    containerS: {
        flex: 1,
        padding: '5%',
        backgroundColor: "#a0a4a5",
    },
});
