import React, { useState, useRef, useContext, useEffect } from "react";
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
            primary: 'black',
            onSurfaceVariant: 'black',
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
                            <Text style={{ color: 'black' }}>Sim</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Não</Text>
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





                <Text style={styles.question}>1 - Quando o senhor (a) realiza uma atividade física leve (dar uma caminhada, fazer uma atividade em casa ou ir ao supermercado), como se sente em relação:</Text>
                <Text style={styles.question}>Cansaço:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muito cansado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouco cansado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhum cansaço </Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Batimento cardíaco:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muito aumentado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouco aumentado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}> Nenhuma alteração</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>Falta de ar:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita falta de ar</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca falta de ar</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma falta de ar</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Dor no peito:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita dor</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca dor</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma dor</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>2 - Quando está em repouso (sem esforço) apresenta:</Text>
                <Text style={styles.question}>Cansaço:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muito cansado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouco cansado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhum cansaço</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Batimento cardíaco:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muito aumentado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouco aumentado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}> Nenhuma alteração</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>Falta de ar:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita falta de ar</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca falta de ar</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma falta de ar</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Dor no peito:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita dor</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca dor</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma dor</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>3 - Em relação as tonturas:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>



                <Text style={styles.question}>4 - Em relação ao desmaio:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>5 - Em relação a dor no peito:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>



                <Text style={styles.question}>6 - Em relação a pressão alta:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>7 - Apresenta suadores frios:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>



                <Text style={styles.question}>8 - Apresenta pele do rosto e os lábios da boca brancos:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>9 - Apresenta vontade de vomitar:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>10 - Apresenta inchaço nas pernas, tornozelos e pés:</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>11 - A dor no peito também aparece em algum outro lugar no corpo:</Text>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked2(!checked2);
                            }}
                        />
                        <Text style={styles.radioTxt} onPress={() => {
                            setChecked2(!checked2);
                        }}>Braço esquerdo</Text>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked2(!checked2);
                            }}
                        />
                        <Text style={styles.radioTxt} onPress={() => {
                            setChecked2(!checked2);
                        }}>Mandíbula</Text>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked2(!checked2);
                            }}
                        />
                        <Text style={styles.radioTxt} onPress={() => {
                            setChecked2(!checked2);
                        }}>Estômago</Text>
                    </View>


                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked2(!checked2);
                            }}
                        />
                        <Text style={styles.radioTxt} onPress={() => {
                            setChecked2(!checked2);
                        }}>Costa</Text>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked2(!checked2);
                            }}
                        />
                        <Text style={styles.radioTxt} onPress={() => {
                            setChecked2(!checked2);
                        }}>Pescoço</Text>
                    </View>
                </View>




                

            <Text style={styles.question}>12 - Em uma escala de 1 a 10, sendo 10 a pior dor, como você classifica a sua dor?</Text>
                <RadioButton.Group onValueChange={setSelection} value={isSelected} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="S"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 até 3</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>3 até 5</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>5 até 7</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>7 até 8</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="N"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>9 até 10</Text>
                        </View>
                    </View>
                </RadioButton.Group>
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
        // backgroundColor: "#a0a4a5"
        backgroundColor:'white'
    },
    question: {
        fontSize: 16,
        marginTop: 15,
        marginBottom: 5,
        textAlign: 'justify',
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
        justifyContent: 'center',
        marginBottom: 30
    },
    btnSalvarTxt: {
        fontSize: 18,
        color: '#353840'
    },
    containerS: {
        flex: 1,
        paddingHorizontal: 15,
        // backgroundColor: "#a0a4a5",
        backgroundColor:'white'
    },
});
