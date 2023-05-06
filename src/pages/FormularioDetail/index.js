import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RadioButton, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../config'
import { AuthContext } from '../../contexts/auth'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';


export default function FormularioDetail({ route }) {
    const { item } = route.params;
    const [checked, setChecked] = useState('');
    const [checked2, setChecked2] = useState(item.opcao1 == 'S');
    const [checked3, setChecked3] = useState(item.opcao2 == 'S');
    const [selectedLanguage, setSelectedLanguage] = useState(item.pergunta3);
    const pickerRef = useRef();
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [isSelected, setSelection] = useState(item.pergunta01);
    const [created, setCreated] = useState(item.created);
    const [update, setUpdate] = useState(item.dataModificacao ? item.dataModificacao : new Date());
    const [name, setName] = useState("");
    const [dataTxt, setDataTxt] = useState(new Date());
    const [isDoc, setIsDoc] = useState(false);
    const [diag, setDiag] = useState('');
    const [doc, setDoc] = useState('');



    const dataJson = JSON.parse(JSON.stringify(item.dataModificacao != null ? item.dataModificacao : item.created));

    function formatarData(segundos, nanossegundos) {

        // Converter segundos e nanossegundos para milissegundos
        const milissegundos = segundos * 1000 + Math.floor(nanossegundos / 1000000);

        // Criar um objeto Date a partir dos milissegundos
        const data = new Date(milissegundos);

        // Extrair os valores do dia, mês, ano, hora e minuto
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear().toString().padStart(4, '0');
        const hora = data.getHours().toString().padStart(2, '0');
        const minuto = data.getMinutes().toString().padStart(2, '0');

        // Formatar a data no formato desejado
        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;

        return dataFormatada;
    }

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

    async function handleSave() {
        await db.collection('formulario').doc(item.id).set({
            created: created,
            user: item.user,
            pergunta01: isSelected,
            opcao1: checked2 ? 'S' : 'N',
            opcao2: checked3 ? 'S' : 'N',
            pergunta3: selectedLanguage ? selectedLanguage : 'opção1',
            userModificacao: user.uid,
            dataModificacao: new Date(),
            medico: doc
        })
            .then(() => {
                console.log('Atualiado')
            })
            .catch((error) => {
                console.log(error);
            })
        navigation.goBack();
    }

    useEffect(() => {
        if (item.userModificacao) {
            db.collection("users")
                .doc(item.userModificacao)
                .get()
                .then((value) => {
                    setName(value.data().nome)
                    setIsDoc(value.data().isDoctor)
                    if (value.data().diagnostico != null) {
                        setDiag(value.data().diagnostico)
                    }
                    setDataTxt(item.dataModificacao)
                    if (item.medico) {
                        setDoc(item.medico)
                    }else{
                        setDoc(value.data().medico)
                    }
                });
        } else {
            db.collection("users")
                .doc(item.user)
                .get()
                .then((value) => {
                    setName(value.data().nome)
                    setIsDoc(value.data().isDoctor)
                    setDataTxt(item.created)
                    setDoc(value.data().medico)
                });
        }
    }, []);

    return (
        <ScrollView style={styles.container} >
            <View style={styles.containerS}>
                <Text>Ultima modificação feita por {name} em {formatarData(dataJson.seconds, dataJson.nanoseconds)}</Text>
                {diag ?
                    <TextInput
                        theme={theme}
                        label='Diagnostico'
                        mode='flat'
                        textColor="#000"
                        style={styles.imput}
                        value={diag}
                        onChangeText={(text) => setDiag(text)}
                        editable={!isDoc}
                    />
                    :
                    <View></View>
                }

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
                    <Text style={styles.btnSalvarTxt}>Alterar</Text>
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
    imput: {
        width: "100%",
        marginTop: 12,
        backgroundColor: "transparent",
        borderColor: "#fff",
        borderWidth: 1,
    },
});
