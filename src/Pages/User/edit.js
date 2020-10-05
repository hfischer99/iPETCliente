import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    AsyncStorage,
    
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TextInputMask } from 'react-native-masked-text'


const SignInScreen =  props => {
    



    const [data, setData] = React.useState({
        nome: '',
        dt_nascimento: '',
        telefone: '',
        email: '',
        check_textInputChangeEmail: false,
        check_textInputChangeNome: false,
        check_textInputChangeDT: false,
        check_textInputChangeTel: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        resposta: [],
        iduser: 0,
    });
    var number;

    async function teste(){
        await AsyncStorage.getItem('id').then((keyValue) => {
            id = keyValue;
             number = parseInt(id, 10 );
             if(data.iduser == 0){
                 setData({
                     ...data,
                     iduser: number
                 })
             }

          }, (error) => {
            //console.log(error) //Display error
          });
    }

    useEffect( () => {
        
        if(data.resposta.length == 0){
            
            teste();
           
            fetch('http://www.ipet.kinghost.net/v1/account/RetornaDados', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Id": data.iduser,
    
                })
            })
    
                .then((response) => response.json())
                .then((responseJson) => {
                   //console.log(responseJson);
                   setData({resposta: JSON.parse(responseJson)})
                }
                )
                .catch((error) => { console.log("erro fetch", error) });
            
           
        } 
       
      });


      
      const atualizanovamente = () => {
          
 
       
            fetch('http://www.ipet.kinghost.net/v1/account/RetornaDados', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Id": 4,
    
                })
            })
    
                .then((response) => response.json())
                .then((responseJson) => {
                   console.log(responseJson);
                   setData({resposta: JSON.parse(responseJson)})
                }
                )
                .catch((error) => { console.log("erro fetch", error) });
        } 
       
     
      

    const textInputChangeDtNascimento = (val) => {
        if (val.length >= 9) {
            setData({
                ...data,
                dt_nascimento: val,
                check_textInputChangeDT: true
            });
        } else {
            setData({
                ...data,
                dt_nascimento: val,
                check_textInputChangeDT: false
            });
        }
    }

    const textInputChangeTelefone = (val) => {
        if (val.length >= 11) {
            setData({
                ...data,
                telefone: val,
                check_textInputChangeTel: true
            });
        } else {
            setData({
                ...data,
                telefone: val,
                check_textInputChangeTel: false
            });
        }
    }

    const textInputChangeNome = (val) => {
        if (val.length > 3) {
            setData({
                ...data,
                nome: val,
                check_textInputChangeNome: true
            });
        } else {
            setData({
                ...data,
                nome: val,
                check_textInputChangeNome: false
            });
        }
    }

    const altera = () => {
        fetch('http://www.ipet.kinghost.net/v1/account/AlterarUsuario', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Id": 4,
                "Nome": data.nome,
                "Data_nascimento": data.dt_nascimento,
                "Telefone": data.telefone,

            })
        })

            .then((response) => response.json())
            .then((responseJson) => {
                

                    Alert.alert(
                        'Atualizado',
                        'Dados cadastrais atualizado.',
                        [
                            { text: 'Ok', onPress: () => atualizanovamente() },

                        ],
                        { cancelable: false }
                    )
                }

            
            )
            .catch((error) => { console.log("erro fetch", error) });

        console.log({ ...data })
    };
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#836FFF' barStyle="light-content" />

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {

                    }]}>Nome Completo</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInput
                            defaultValue={data.resposta.nome}
                            placeholder="Seu nome completo"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeNome(val)}
                        />
                        {data.check_textInputChangeNome ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>


                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Data de Nascimento</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#0f0f0f"
                            size={20}
                        />
                         <TextInput
                            defaultValue={data.resposta.data_nascimento}
                            placeholder="Formato AAAA/MM/DD"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeDtNascimento(val)}
                        />
                        {data.check_textInputChangeDT ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Telefone</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#0f0f0f"
                            size={20}
                        />
                      

                            <TextInput
                            defaultValue={data.resposta.telefone}
                            placeholder="Seu Telefone"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(valx) => textInputChangeTelefone(valx)}
                        />
                        {data.check_textInputChangeTel ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>


                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { altera() }}
                        >
                            <LinearGradient
                                colors={['#836FFF', '#bdb3fc']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Editar</Text>
                            </LinearGradient>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#836FFF'


    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingTop: 150
        
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#836FFF',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});