import React, {useEffect} from 'react';
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
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TextInputMask } from 'react-native-masked-text'
import { StackActions, NavigationActions } from 'react-navigation'



const EnderecoScreen = props => {
    const EnderecoID = props.navigation.getParam('End');
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn'})],
      })

    const [data, setData] = React.useState({
        id: EnderecoID.Id,
        endereco: EnderecoID.endereco,
        numero: EnderecoID.numero,
        cep: EnderecoID.cep,
        cidade: EnderecoID.cidade,
        complemento: EnderecoID.complemento,
        password: '',
        confirm_password: '',
        check_textInputChangeEndereco: false,
        check_textInputChangeNome: false,
        check_textInputChangeCep: false,
        check_textInputChangeComplemento: false,
        check_textInputChangeCidade: false,
        check_textInputChangeDT: false,
        check_textInputChangeTel: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChangeEndereco = (val) => {
        if( val.length > 2 ) {
            setData({
                ...data,
                endereco: val,
                check_textInputChangeEndereco: true
            });
        } else {
            setData({
                ...data,
            endereco: val,
                check_textInputChangeEndereco: false
            });
        }
    }

    const textInputChangeCidade = (val) => {
        if( val.length > 2 ) {
            setData({
                ...data,
                cidade: val,
                check_textInputChangeCidade: true
            });
        } else {
            setData({
                ...data,
            cidade: val,
                check_textInputChangeCidade: false
            });
        }
    }

    const textInputChangeComplemento = (val) => {
        if( val.length > 2 ) {
            setData({
                ...data,
                complemento: val,
                check_textInputChangeComplemento: true
            });
        } else {
            setData({
                ...data,
            complemento: val,
                check_textInputChangeComplemento: false
            });
        }
    }


    const textInputChangeCep = (val) => {
        if( val.length == 8) {
            setData({
                ...data,
                cep: val,
                check_textInputChangeCep: true
            });
        } else {
            setData({
                ...data,
                cep: val,
                check_textInputChangeCep: false
            });
        }
    }

    
    const textInputChangeNumero = (val) => {
        if( val.length >= 0 ) {
            setData({
                ...data,
                numero: val,
                check_textInputChangeNumero: true
            });
        } else {
            setData({
                ...data,
                numero: val,
                check_textInputChangeNumero: false
            });
        }
    }


    const Excluir = () => {
        //console.log(data.id)
        fetch('http://www.ipet.kinghost.net/v1/account/DeletaEndereco',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "id":data.id
            })
          })
           
           .then((response) => response.json())
           .then((responseJson) => {
             console.log("responsejson",responseJson)
             if(responseJson == "Endereço já cadastrado"){
                setData({
                    ...data,
                    cpf: "teste",
                    check_textInputChangeCPF: false
                });

                Alert.alert(
                    'Excluir',
                    '',
                    [
                      {text: 'Ok', onPress: () => {console.log("continua cadastro")}},                
                      
                    ],
                    { cancelable: false }
                  )
             } else {
                Alert.alert(
                    'Excluir',
                    'Endereço Excluido.',
                    [
                      {text: 'Ok', onPress: () => props.navigation.goBack(null)},                
                        
                    ],
                    { cancelable: false }
                  )
             }
            
           }
           )
           .catch((error) => {console.log("erro fetch",error)});
     
           console.log({...data})
         };

         const registro = () => {
            console.log(data.id)
            fetch('http://www.ipet.kinghost.net/v1/account/EditarEndereco',{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    "id":data.id,
                    "Endereco": data.endereco,
                    "Numero": data.numero,
                    "Cep": data.cep,
                    "Complemento": data.complemento,
                    "Cidade": data.cidade,
                    "id_pessoa": 11
    
                })
              })
               
               .then((response) => response.json())
               .then((responseJson) => {
                 console.log("responsejson",responseJson)
                 if(responseJson == "Endereço já cadastrado"){
                    setData({
                        ...data,
                        cpf: "teste",
                        check_textInputChangeCPF: false
                    });
    
                    Alert.alert(
                        'Registro',
                        'O CPF INFORMADO JÁ EXISTE EM NOSSA BASE.',
                        [
                          {text: 'Ok', onPress: () => {console.log("continua cadastro")}},                
                          {text: 'Resetar senha', onPress: () => console.log('Vai para tela de reset de senha')},
                        ],
                        { cancelable: false }
                      )
                 } else {
                    Alert.alert(
                        'Editar',
                        'Endereço Editado.',
                        [
                          {text: 'Ok', onPress: () => props.navigation.goBack(null)},                
                            
                        ],
                        { cancelable: false }
                      )
                 }
                
               }
               )
               .catch((error) => {console.log("erro fetch",error)});
         
               console.log({...data})
             };
    

        
 
         useEffect(() => {console.log(EnderecoID)},{});


    return (
        
      <View style={styles.container}>
          <StatusBar backgroundColor='#836FFF' barStyle="light-content"/>

        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={[styles.text_footer, {

            }]}>Endereço</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    defaultValue={EnderecoID.endereco}
                    placeholder="Nome da sua Rua"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeEndereco(val)}
                />
                {data.check_textInputChangeEndereco? 
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
            }]}>Número</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    defaultValue={EnderecoID.numero}
                    placeholder="Número do Endereço"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeNumero(val)}
                />
                {data.check_textInputChangeNumero ? 
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
            }]}>CEP</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    defaultValue={EnderecoID.cep}
                    placeholder="CEP do Endereço"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeCep(val)}
                />
                {data.check_textInputChangeCep ? 
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
            }]}>Complemento</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    defaultValue={EnderecoID.complemento}
                    placeholder="Complemento do endereço"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeComplemento(val)}
                />
                {data.check_textInputChangeComplemento ? 
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
            }]}>Cidade</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#0f0f0f"
                    size={20}
                />
                <TextInput 
                    defaultValue={EnderecoID.cidade}
                    placeholder="Digite sua cidade"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeCidade(val)}
                />
                {data.check_textInputChangeCidade ? 
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
                    onPress={() => {registro()}}
                >
                <LinearGradient
                    colors={['green', '#bdb3fc']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Editar</Text>
                </LinearGradient>
                </TouchableOpacity>


            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {Excluir()}}
                >
                <LinearGradient
                    colors={['red', '#bdb3fc']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Excluir</Text>
                </LinearGradient>
                </TouchableOpacity>


            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default EnderecoScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#836FFF'
      
      
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        //paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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