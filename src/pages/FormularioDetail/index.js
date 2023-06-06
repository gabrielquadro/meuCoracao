import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { RadioButton, Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../config'
import { AuthContext } from '../../contexts/auth'
import { Provider as PaperProvider, DefaultTheme, TextInput } from 'react-native-paper';


export default function FormularioDetail({ route }) {
    const { item, medico } = route.params;
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
    const [loading, setLoading] = useState(false);
    const [diagDorPeito, setDiagDorPeito] = useState(item.diagDorPeito);
    const [diagInsuficienciaCard, setDiagInsuficienciaCard] = useState(item.diagInsuficienciaCard);




    const [dignostico, setDiagnostico] = useState('');
    const [dignosticoValue, setDiagnosticoValue] = useState(0);


    const [dorAtiv, setDorAtiv] = useState(item.dorAtiv);
    const [dorAtivValue, setDorAtivValue] = useState(0);

    const [dorAtivBC, setDorAtivBC] = useState(item.dorAtivBC);

    const [dorAtivFA, setDorAtivFA] = useState(item.dorAtivFA);

    const [dorAtivDP, setDorAtivDP] = useState(item.dorAtivDP);

    const [cansacoR, setCansacoR] = useState(item.cansacoR);

    const [batimentoR, setBatimentoR] = useState(item.batimentoR);

    const [faltaArR, setFaltaArR] = useState(item.faltaArR);

    const [dorPeitoR, setDorPeitoR] = useState(item.dorPeitoR);

    const [tonturas, setTonturas] = useState(item.tonturas);

    const [desmaio, setDesmaio] = useState(item.desmaio);

    const [dorPeito, setDorPeito] = useState(item.dorPeito);

    const [pressaoAlta, setPressaoAlta] = useState(item.pressaoAlta);

    const [suadoresFrios, setSuadoresFrios] = useState(item.suadoresFrios);

    const [branco, setBranco] = useState(item.branco);

    const [vomitar, setVomitar] = useState(item.vomitar);

    const [inchaco, setInchaco] = useState(item.inchaco);

    const [outroL, setOutroL] = useState(item.outroL);

    const [nivelDor, setNivelDor] = useState(item.nivelDor);

    const [dorAtivP, setDorAtivP] = useState(item.dorAtivP);

    const [dorPeito200, setDorPeito200] = useState(item.dorPeito200);

    const [dorPeito100, setDorPeito100] = useState(item.dorPeito100);

    const [qualquerAtiv, setQualquerAtiv] = useState(item.qualquerAtiv);



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

    async function handleSave() {
        await db.collection('formulario').doc(item.id).set({
            created: created,
            user: item.user,
            userModificacao: user.uid,
            dataModificacao: new Date(),
            medico: doc,
            resposta: diag,
            respondido: medico && (diag != null && diag != ''),
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
            diagDorPeito: diagDorPeito,
            diagInsuficienciaCard: diagInsuficienciaCard
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
        setLoading(true)
        console.log(item.respondido)
        console.log('a')
        if (item.respondido == true) {
            db.collection("users")
                .doc(item.userModificacao)
                .get()
                .then((value) => {
                    setName(value.data().nome)
                    setIsDoc(value.data().isDoctor)
                    if (item.resposta != null) {
                        setDiag(item.resposta)
                    }
                    setDataTxt(item.dataModificacao)
                    if (item.medico) {
                        setDoc(item.medico)
                    } else {
                        setDoc(value.data().medico)
                    }
                }).finally(() => {
                    setLoading(false)
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
                }).finally(() => {
                    setLoading(false)
                });
        }
        console.log(user)
    }, []);

    return (
        <View style={styles.container}>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator SIZE={70} color="red"></ActivityIndicator>
                </View>
            ) : (
                <ScrollView style={styles.container} >
                    <View style={styles.containerS} >
                        <Text style={{ marginTop: 10 , marginBottom: 10}}>Ultima modificação feita por {name} em {formatarData(dataJson.seconds, dataJson.nanoseconds)}</Text>
                        <View style={{ padding: 10, borderWidth: 1, borderRadius: 4 }}>
                            <Text style={{ marginTop: 10 }}>Insuficiência : {diagInsuficienciaCard}</Text>
                            <Text style={{ marginTop: 10 }}>Dor no peito : {diagDorPeito}</Text>
                        </View>
                        <View>
                            {medico || (diag && diag != '') ?
                                <TextInput
                                    theme={theme}
                                    label={medico ? 'Resposta ao paciente' : 'Respota do médico'}
                                    mode='flat'
                                    textColor="#000"
                                    style={styles.imput}
                                    value={diag}
                                    onChangeText={(text) => setDiag(text)}
                                    editable={medico}
                                />

                                :
                                <View></View>
                            }
                        </View>

                        {/* <Text style={styles.question}>Pergunta 01111?</Text>
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
 */}



                        <View pointerEvents="none">
                            <Text style={styles.question}>1 - Quando o senhor (a) realiza uma atividade física leve (dar uma caminhada, fazer uma atividade em casa ou ir ao supermercado), como se sente em relação:</Text>
                            <Text style={styles.question}>Cansaço:</Text>
                            <RadioButton.Group onValueChange={setDorAtiv} value={dorAtiv} editable={false}>
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

                        </View>
                        {medico ?
                            <TouchableOpacity onPress={handleSave} style={styles.btnSalvar}>
                                <Text style={styles.btnSalvarTxt}>Alterar</Text>
                            </TouchableOpacity>
                            :
                            <View></View>
                        }
                    </View>
                </ScrollView>
            )}


        </View>
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
    imput: {
        marginTop: 12,
        backgroundColor: 'transparent',
        borderColor: '#000',
        borderWidth: 1,
    },
});
