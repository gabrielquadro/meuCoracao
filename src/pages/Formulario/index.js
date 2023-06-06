import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from "react-native";
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

    const [dignostico, setDiagnostico] = useState('');
    const [dignosticoValue, setDiagnosticoValue] = useState(0);


    const [dorAtiv, setDorAtiv] = useState('');

    const [dorAtivBC, setDorAtivBC] = useState('');

    const [dorAtivFA, setDorAtivFA] = useState('');

    const [dorAtivDP, setDorAtivDP] = useState('');

    const [cansacoR, setCansacoR] = useState('');

    const [batimentoR, setBatimentoR] = useState('');

    const [faltaArR, setFaltaArR] = useState('');

    const [dorPeitoR, setDorPeitoR] = useState('');

    const [tonturas, setTonturas] = useState('');

    const [desmaio, setDesmaio] = useState('');

    const [dorPeito, setDorPeito] = useState('');

    const [pressaoAlta, setPressaoAlta] = useState('');

    const [suadoresFrios, setSuadoresFrios] = useState('');

    const [branco, setBranco] = useState('');

    const [vomitar, setVomitar] = useState('');

    const [inchaco, setInchaco] = useState('');

    const [outroL, setOutroL] = useState('');

    const [nivelDor, setNivelDor] = useState('');

    const [dorAtivP, setDorAtivP] = useState('');

    const [dorPeito200, setDorPeito200] = useState('');

    const [dorPeito100, setDorPeito100] = useState('');

    const [qualquerAtiv, setQualquerAtiv] = useState('');

    const [alertDor, setAlertDor] = useState('');

    const [alertInsufCard, setAlertInsufCard] = useState('');

    const [msgModal, setMsgModal] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const openModal2 = () => {
        setModalVisible2(true);
    };

    const closeModal2 = () => {
        setModalVisible2(false);
        navigation.goBack();
    };

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

    function getGravInsuficiencia() {
        let soma = 0;
        let resposta = '';

        //soma valores de dorAtiv
        //1 - Quando o senhor (a) realiza uma atividade física leve (dar uma caminhada, fazer uma atividade 
        //em casa ou ir ao supermercado), como se sente em relação: Cansaço:
        if (dorAtiv == 'Muito') {
            soma = soma + 3;
        } else if (dorAtiv == 'Moderadamente') {
            soma = soma + 2;
        } else if (dorAtiv == 'Pouco') {
            soma = soma + 1;
        } else if (dorAtiv == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de dorAtivBC
        //1 - Quando o senhor (a) realiza uma atividade física leve (dar uma caminhada, fazer uma atividade 
        //em casa ou ir ao supermercado), como se sente em relação: Batimnto cadiaco:
        if (dorAtivBC == 'Muito') {
            soma = soma + 3;
        } else if (dorAtivBC == 'Moderadamente') {
            soma = soma + 2;
        } else if (dorAtivBC == 'Pouco') {
            soma = soma + 1;
        } else if (dorAtivBC == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de dorAtivFA
        //1 - Quando o senhor (a) realiza uma atividade física leve (dar uma caminhada, fazer uma atividade 
        //em casa ou ir ao supermercado), como se sente em relação: falta de ar:
        if (dorAtivFA == 'Muito') {
            soma = soma + 3;
        } else if (dorAtivFA == 'Moderadamente') {
            soma = soma + 2;
        } else if (dorAtivFA == 'Pouco') {
            soma = soma + 1;
        } else if (dorAtivFA == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de cansacoR
        if (cansacoR == 'Muito') {
            soma = soma + 3;
        } else if (cansacoR == 'Moderadamente') {
            soma = soma + 2;
        } else if (cansacoR == 'Pouco') {
            soma = soma + 1;
        } else if (cansacoR == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de batimentoR
        if (batimentoR == 'Muito') {
            soma = soma + 3;
        } else if (batimentoR == 'Moderadamente') {
            soma = soma + 2;
        } else if (batimentoR == 'Pouco') {
            soma = soma + 1;
        } else if (batimentoR == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de faltaArR
        if (faltaArR == 'Muito') {
            soma = soma + 3;
        } else if (faltaArR == 'Moderadamente') {
            soma = soma + 2;
        } else if (faltaArR == 'Pouco') {
            soma = soma + 1;
        } else if (faltaArR == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de tonturas
        if (tonturas == 'Diariamente') {
            soma = soma + 3;
        } else if (tonturas == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (tonturas == 'UmaTres') {
            soma = soma + 1;
        } else if (tonturas == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de desmaio
        if (desmaio == 'Diariamente') {
            soma = soma + 3;
        } else if (desmaio == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (desmaio == 'UmaTres') {
            soma = soma + 1;
        } else if (desmaio == 'Nunca') {
            soma = soma + 0;
        }


        //soma valores de pressaoAlta
        if (pressaoAlta == 'Diariamente') {
            soma = soma + 3;
        } else if (pressaoAlta == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (pressaoAlta == 'UmaTres') {
            soma = soma + 1;
        } else if (pressaoAlta == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de suadoresFrios
        if (suadoresFrios == 'Diariamente') {
            soma = soma + 3;
        } else if (suadoresFrios == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (suadoresFrios == 'UmaTres') {
            soma = soma + 1;
        } else if (suadoresFrios == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de branco
        if (branco == 'Diariamente') {
            soma = soma + 3;
        } else if (branco == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (branco == 'UmaTres') {
            soma = soma + 1;
        } else if (branco == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de vomitar
        if (vomitar == 'Diariamente') {
            soma = soma + 3;
        } else if (vomitar == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (vomitar == 'UmaTres') {
            soma = soma + 1;
        } else if (vomitar == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de inchaco
        if (inchaco == 'Diariamente') {
            soma = soma + 3;
        } else if (inchaco == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (inchaco == 'UmaTres') {
            soma = soma + 1;
        } else if (inchaco == 'Nunca') {
            soma = soma + 0;
        }

        if (soma >= 0 && soma <= 10) {
            resposta = 'Tranquilo'
        } else if (soma >= 11 && soma <= 20) {
            resposta = 'Leve'
        } else if (soma >= 21 && soma <= 30) {
            resposta = 'Moderado'
        } else if (soma > 30) {
            resposta = 'Grave'
        }

        return resposta;
    }

    function getGravDor() {
        let soma = 0;
        let resposta = '';

        //soma valores de dorAtivDP
        if (dorAtivDP == 'Muito') {
            soma = soma + 3;
        } else if (dorAtivDP == 'Moderadamente') {
            soma = soma + 2;
        } else if (dorAtivDP == 'Pouco') {
            soma = soma + 1;
        } else if (dorAtivDP == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de dorPeitoR
        if (dorPeitoR == 'Muito') {
            soma = soma + 3;
        } else if (dorPeitoR == 'Moderadamente') {
            soma = soma + 2;
        } else if (dorPeitoR == 'Pouco') {
            soma = soma + 1;
        } else if (dorPeitoR == 'Nenhum') {
            soma = soma + 0;
        }

        //soma valores de dorPeito
        if (dorPeito == 'Diariamente') {
            soma = soma + 3;
        } else if (dorPeito == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (dorPeito == 'UmaTres') {
            soma = soma + 1;
        } else if (dorPeito == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de outroL
        if (outroL == 'Diariamente') {
            soma = soma + 3;
        } else if (outroL == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (outroL == 'UmaTres') {
            soma = soma + 1;
        } else if (outroL == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de nivelDor
        if (nivelDor == 'SeteaOito' || nivelDor == 'NoveaDez') {
            soma = soma + 3;
        } else if (nivelDor == 'CincoaSete') {
            soma = soma + 2;
        } else if (nivelDor == 'TresaCinco') {
            soma = soma + 1;
        } else if (nivelDor == 'UmaTres') {
            soma = soma + 0;
        }

        //soma valores de dorAtivP
        if (dorAtivP == 'Diariamente') {
            soma = soma + 3;
        } else if (dorAtivP == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (dorAtivP == 'UmaTres') {
            soma = soma + 1;
        } else if (dorAtivP == 'Nunca') {
            soma = soma + 0;
        }


        //soma valores de dorPeito100
        if (dorPeito100 == 'Diariamente') {
            soma = soma + 3;
        } else if (dorPeito100 == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (dorPeito100 == 'UmaTres') {
            soma = soma + 1;
        } else if (dorPeito100 == 'Nunca') {
            soma = soma + 0;
        }

        //soma valores de qualquerAtiv
        if (qualquerAtiv == 'Diariamente') {
            soma = soma + 3;
        } else if (qualquerAtiv == 'QuatroaSeis') {
            soma = soma + 2;
        } else if (qualquerAtiv == 'UmaTres') {
            soma = soma + 1;
        } else if (qualquerAtiv == 'Nunca') {
            soma = soma + 0;
        }


        if (soma >= 0 && soma <= 5) {
            resposta = 'Tranquilo'
        } else if (soma >= 6 && soma <= 15) {
            resposta = 'Leve'
        } else if (soma >= 16 && soma <= 23) {
            resposta = 'Moderado'
        } else if (soma >= 24) {
            resposta = 'Grave'
        }

        return resposta;
    }

    async function handleSave() {
        if (dorAtiv != '' && dorAtivBC != '' && dorAtivFA != '' && dorAtivDP != '' && cansacoR != '' && batimentoR != ''
            && faltaArR != '' && dorPeitoR != '' && tonturas != '' && desmaio != '' && dorPeito != '' && pressaoAlta != ''
            && suadoresFrios != '' && branco != '' && vomitar != '' && inchaco != '' && outroL != '' && nivelDor != '' &&
            dorAtivP != '' && dorPeito200 != '' && dorPeito100 != '' && qualquerAtiv != '') {


            const respostaGravInsuficiencia = getGravInsuficiencia();
            const respostaGravDor = getGravDor();

            await db.collection('formulario').add({
                created: new Date(),
                user: user.uid,
                medico: doc,
                dorAtiv: dorAtiv,
                dorAtivBC: dorAtivBC,
                dorAtivFA: dorAtivFA,
                dorAtivDP: dorAtivDP,
                cansacoR: cansacoR,
                batimentoR: batimentoR,
                faltaArR: faltaArR,
                dorPeitoR: dorPeitoR,
                tonturas: tonturas,
                desmaio: desmaio,
                dorPeito: dorPeito,
                pressaoAlta: pressaoAlta,
                suadoresFrios: suadoresFrios,
                branco: branco,
                vomitar: vomitar,
                inchaco: inchaco,
                outroL: outroL,
                nivelDor: nivelDor,
                dorAtivP: dorAtivP,
                dorPeito200: dorPeito200,
                dorPeito100: dorPeito100,
                qualquerAtiv: qualquerAtiv,
                diagDorPeito: respostaGravDor,
                diagInsuficienciaCard: respostaGravInsuficiencia
            })
                .then(() => {
                    console.log('Formulario criado')

                    if (respostaGravDor == 'Grave') {
                        setAlertDor('Sua dor no peito é classificada como grave. É importante procurar atendimento médico imediatamente para avaliação e tratamento adequados.')
                    } else if (respostaGravDor == 'Moderado') {
                        setAlertDor('Sua dor no peito está em um nível moderado. É recomendado buscar orientação médica para uma avaliação mais detalhada.')
                    } else if (respostaGravDor == 'Leve') {
                        setAlertDor('Sua dor no peito é considerada leve. Recomenda-se monitorar os sintomas e, se necessário, agendar uma consulta médica para um acompanhamento adequado.')
                    } else if (respostaGravDor == 'Tranquilo'){
                        setAlertDor('Sua dor no peito está em um nível tranquilo. No entanto, é sempre importante estar atento aos sinais de qualquer mudança e procurar assistência médica se necessário.')
                    }

                    if (respostaGravInsuficiencia == 'Grave') {
                        setAlertInsufCard('Sua insuficiência cardíaca está em um estágio grave. É fundamental buscar atendimento médico especializado o mais rápido possível para um plano de tratamento apropriado.')
                    } else if (respostaGravInsuficiencia == 'Moderado') {
                        setAlertInsufCard('Sua insuficiência cardíaca é de intensidade moderada. É aconselhável agendar uma consulta com um cardiologista para uma avaliação mais detalhada e orientações sobre o tratamento.')
                    } else if (respostaGravInsuficiencia == 'Leve') {
                        setAlertInsufCard('Sua insuficiência cardíaca é leve. Recomenda-se seguir um estilo de vida saudável, tomar a medicação prescrita conforme orientação médica e comparecer às consultas de acompanhamento.')
                    } else  if (respostaGravInsuficiencia == 'Tranquilo'){
                        setAlertInsufCard('Sua insuficiência cardíaca está em um estado tranquilo. No entanto, é essencial adotar medidas de prevenção, como seguir uma dieta equilibrada, realizar exercícios físicos adequados e tomar a medicação conforme prescrição médica.')
                    }
                    openMModal2()
                    // navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            // Alert.alert('É necessário responder todas as perguntas!')
            setMsgModal("É necessário responder todas as perguntas.")
            setModalVisible(true)
        }
    }

    return (
        <ScrollView style={styles.container} >
            <View style={styles.containerS}>
                {/* <Text style={styles.question}>Pergunta 01?</Text>
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
                </Picker> */}


                <Modal visible={modalVisible} transparent={true} animationType="fade" >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{msgModal}</Text>
                            {/* <Button title="Fechar" onPress={closeModal} /> */}
                            <TouchableOpacity onPress={closeModal} style={styles.btnModal}>
                                <Text style={styles.btnTxt}>Fechar</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <Modal visible={modalVisible2} transparent={true} animationType="fade" >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>

                            <Text style={{ ...styles.modalText2, marginBottom: 10 }}>{alertInsufCard}</Text>
                            <Text style={styles.modalText2}>{alertDor}</Text>

                            <View style={{borderRadius: 8 , borderWidth: 1, padding: 10}}>
                                <Text style={{...styles.modalText, fontSize: 14}}>Durante o pós-operatório cardíaco, é fundamental seguir as orientações médicas para uma recuperação adequada. Certifique-se de descansar o suficiente, tomar a medicação prescrita, realizar atividades físicas leves conforme autorizado pelo médico, adotar uma alimentação saudável e evitar esforços excessivos. Além disso, esteja atento a quaisquer sinais de complicações, como aumento da dor no peito, dificuldade respiratória ou inchaço excessivo, e informe imediatamente sua equipe médica para obter assistência adequada.</Text>
                            </View>
                            <TouchableOpacity onPress={closeModal2} style={styles.btnModal}>
                                <Text style={styles.btnTxt}>Finalizar</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>





                <Text style={styles.question}>1 - Quando o senhor (a) realiza uma atividade física leve (dar uma caminhada, fazer uma atividade em casa ou ir ao supermercado), como se sente em relação:</Text>
                <Text style={styles.question}>Cansaço:</Text>
                <RadioButton.Group onValueChange={setDorAtiv} value={dorAtiv} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Muito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muito cansado</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Moderadamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Moderadamente cansado</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Pouco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouco cansado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nenhum"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhum cansaço </Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Batimento cardíaco:</Text>
                <RadioButton.Group onValueChange={setDorAtivBC} value={dorAtivBC} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Muito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muito aumentado</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Moderadamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Moderadamente aumentado</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Pouco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouco aumentado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nenhum"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma alteração </Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>Falta de ar:</Text>
                <RadioButton.Group onValueChange={setDorAtivFA} value={dorAtivFA} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Muito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita Muita falta de ar</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Moderadamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Moderadamente com falta de ar</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Pouco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca falta de ar</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nenhum"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma falta de ar </Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Dor no peito:</Text>
                <RadioButton.Group onValueChange={setDorAtivDP} value={dorAtivDP} >

                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Muito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita dor</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Moderadamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Dor moderada</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Pouco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca dor</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nenhum"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma dor</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>2 - Quando está em repouso (sem esforço) apresenta:</Text>
                <Text style={styles.question}>Cansaço:</Text>
                <RadioButton.Group onValueChange={setCansacoR} value={cansacoR} >

                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Muito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muito cansado</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Moderadamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Moderadamente cansado</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Pouco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouco cansado</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nenhum"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhum cansaço </Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Batimento cardíaco:</Text>
                <RadioButton.Group onValueChange={setBatimentoR} value={batimentoR} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                        <RadioButton
                            value="Muito"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Muito aumentado</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                        <RadioButton
                            value="Moderadamente"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Moderadamente aumentado</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Pouco"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Pouco aumentado</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Nenhum"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Nenhuma alteração </Text>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>Falta de ar:</Text>
                <RadioButton.Group onValueChange={setFaltaArR} value={faltaArR} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Muito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita Muita falta de ar</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Moderadamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Moderadamente com falta de ar</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Pouco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca falta de ar</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nenhum"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma falta de ar </Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>Dor no peito:</Text>
                <RadioButton.Group onValueChange={setDorPeitoR} value={dorPeitoR} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Muito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Muita dor</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Moderadamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Dor moderada</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Pouco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Pouca dor</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nenhum"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nenhuma dor</Text>
                        </View>

                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>3 - Em relação as tonturas:</Text>
                <RadioButton.Group onValueChange={setTonturas} value={tonturas} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>



                <Text style={styles.question}>4 - Em relação ao desmaio:</Text>
                <RadioButton.Group onValueChange={setDesmaio} value={desmaio} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>5 - Em relação a dor no peito:</Text>
                <RadioButton.Group onValueChange={setDorPeito} value={dorPeito} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>



                <Text style={styles.question}>6 - Em relação a pressão alta:</Text>
                <RadioButton.Group onValueChange={setPressaoAlta} value={pressaoAlta} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <Text style={styles.question}>7 - Apresenta suadores frios:</Text>
                <RadioButton.Group onValueChange={setSuadoresFrios} value={suadoresFrios} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>



                <Text style={styles.question}>8 - Apresenta pele do rosto e os lábios da boca brancos:</Text>
                <RadioButton.Group onValueChange={setBranco} value={branco} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>9 - Apresenta vontade de vomitar:</Text>
                <RadioButton.Group onValueChange={setVomitar} value={vomitar} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>10 - Apresenta inchaço nas pernas, tornozelos e pés:</Text>
                <RadioButton.Group onValueChange={setInchaco} value={inchaco} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="Diariamente"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Diariamente</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="QuatroaSeis"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="Nunca"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>Nunca apresento</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                <Text style={styles.question}>11 - 11.	A dor no peito também aparece em algum outro lugar no corpo como: braço esquerdo, mandíbula, estômago, costas ou pescoço:</Text>
                <RadioButton.Group onValueChange={setOutroL} value={outroL} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                        <RadioButton
                            value="Diariamente"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Diariamente</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="QuatroaSeis"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="UmaTres"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Nunca"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Nunca apresento</Text>
                    </View>

                </RadioButton.Group>





                <Text style={styles.question}>12 - Em uma escala de 1 a 10, sendo 10 a pior dor, como você classifica a sua dor?</Text>
                <RadioButton.Group onValueChange={setNivelDor} value={nivelDor} >
                    <View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                            <RadioButton
                                value="UmaTres"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>1 até 3</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="TresaCinco"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>3 até 5</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="CincoaSete"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>5 até 7</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="SeteaOito"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>7 até 8</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="NoveaDez"
                                theme={theme}
                            />
                            <Text style={{ color: 'black' }}>9 até 10</Text>
                        </View>
                    </View>
                </RadioButton.Group>



                <Text style={styles.question}>13 - Você tem dor no peito após atividades intensas prolongadas:</Text>
                <RadioButton.Group onValueChange={setDorAtivP} value={dorAtivP} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                        <RadioButton
                            value="Diariamente"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Diariamente</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="QuatroaSeis"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="UmaTres"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Nunca"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Nunca apresento</Text>
                    </View>

                </RadioButton.Group>




                <Text style={styles.question}>14 - Você tem dor no peito após caminhar 200 m ou subir dois lances de escada:</Text>
                <RadioButton.Group onValueChange={setDorPeito200} value={dorPeito200} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                        <RadioButton
                            value="Diariamente"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Diariamente</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="QuatroaSeis"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="UmaTres"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Nunca"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Nunca apresento</Text>
                    </View>

                </RadioButton.Group>


                <Text style={styles.question}>15 - Você tem dor no peito após caminhar 100 m ou subir um lance de escada:</Text>
                <RadioButton.Group onValueChange={setDorPeito100} value={dorPeito100} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                        <RadioButton
                            value="Diariamente"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Diariamente</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="QuatroaSeis"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="UmaTres"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Nunca"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Nunca apresento</Text>
                    </View>

                </RadioButton.Group>


                <Text style={styles.question}>16 - Você tem dor no peito após realizar qualquer atividade:</Text>
                <RadioButton.Group onValueChange={setQualquerAtiv} value={qualquerAtiv} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                        <RadioButton
                            value="Diariamente"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Diariamente</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="QuatroaSeis"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>4 a 6 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="UmaTres"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>1 a 3 vezes na semana</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value="Nunca"
                            theme={theme}
                        />
                        <Text style={{ color: 'black' }}>Nunca apresento</Text>
                    </View>

                </RadioButton.Group>









                <TouchableOpacity onPress={handleSave} style={styles.btnSalvar}>
                    <Text style={styles.btnSalvarTxt}>Salvar</Text>
                </TouchableOpacity>

            </View >

        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#a0a4a5"
        backgroundColor: 'white'
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
        backgroundColor: 'white'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        padding: 35
    },
    modalText: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'justify'
    },
    modalText2: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'justify'
    },
    btnModal: {
        width: '80%',
        backgroundColor: "#d04556",
        //595458
        borderRadius: 8,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    btnTxt: {
        color: "#FFF",
        fontSize: 15,
    },
});
