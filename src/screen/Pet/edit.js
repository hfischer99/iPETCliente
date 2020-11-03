import React from 'react';
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
    Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { Header, Input } from "react-native-elements";
import { TextInputMask } from 'react-native-masked-text'
import { StackActions, NavigationActions } from 'react-navigation'
import { DocumentPicker } from 'expo';
import * as ImagePicker from 'expo-image-picker'
import Moment from 'react-moment';
import moment from 'moment';
import { set } from 'react-native-reanimated';





const PetScreen = props => {
    const PetData = props.navigation.getParam('PetData');
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
    })

    const [data99, setData99] = React.useState({
        controle:0,
    })
    const [data, setData] = React.useState({
        id: PetData.Id,
        nome: PetData.nome,
        raca: PetData.raca,
        dt_nascimento: PetData.data_nascimento,
        peso: PetData.peso,
        porte: PetData.porte,
        id_pessoa: '',
        foto: PetData.foto,
        check_textInputChangeNome: false,
        check_textInputChangeRaca: false,
        check_textInputChangePeso: false,
        check_textInputChangeDT: false,
        alertaKey: '',
        key: '',
        controle: 0,
    });
    const [image, setImage] = React.useState(null);
    // const NewDate = data.dt_nascimento.format("YYYY-MM-DD");

    const textInputChangeNome = (val) => {
        if (val.length > 0) {
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

    const handleImageChange = event => {
        setData9({ controle: 1 })
        const file = URL.createObjectURL(event.target.files[0]);
        setData6({
            selectFile: event.target.files[0],
            profileImage: file
        })
    }

    const textInputChangeRaca = (val) => {
        if (val.length > 2) {
            setData({
                ...data,
                raca: val,
                check_textInputChangeRaca: true
            });
        } else {
            setData({
                ...data,
                raca: val,
                check_textInputChangeRaca: false
            });
        }
    }

    const textInputChangePeso = (val) => {
        if (val > 0) {
            setData({
                ...data,
                peso: val,
                check_textInputChangePeso: true
            });
        } else {
            setData({
                ...data,
                peso: val,
                check_textInputChangePeso: false
            });
        }
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

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //     });
    // };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setData99({...data99,controle:1});

        console.log(result);

        if (!result.cancelled) {
            setData({ ...data, foto: result });
            setImage(result.uri);
        }
    };
    const geraChave = async (rowNome, rowId) => {
        var temp = [];
        console.log('aqui', rowNome, rowId);
        await fetch('http://www.ipet.kinghost.net/v1/account/Encode64', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Id": parseInt(rowId),
                "Nome": rowNome

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                temp = JSON.stringify(responseJson);
                setData({ ...data, alertaKey: "A chave de compartilhamento é: " + responseJson, key: temp })
                alteraChave(responseJson)
            }
            )
            .catch((error) => { console.log("erro fetch", error) });


        //setData({...data, alertaKey: "A chave de compartilhamento é:" + rowNome + rowId})
    }

    const deletaPet = async () => {

        await fetch('http://www.ipet.kinghost.net/v1/account/DeletaPet', {
           method: "POST",
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             "Id": data.id,
    
           })
       })
           .then((responseJson) => {
            if(responseJson.ok === true){
                return(
                    Alert.alert(
                        'Delete',
                        'Pet Deletado!',
                        [
                            {
                                text: 'Ok', onPress: () => props.navigation.navigate({
                                    routeName: 'Pet'
                                })
                            },
    
                        ],
                        { cancelable: false }
                    )   
                );
            }
            console.log(JSON.stringify(responseJson));
    
           }
           )
           .catch((error) => { console.log("erro fetch", error) });
     }

    const alteraChave = async (chave) => {
        let formData = new FormData();
        var dataformat = moment(data.dt_nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
        formData.append('id', data.id);
        formData.append('nome', data.nome);
        formData.append('raca', data.raca);
        formData.append('peso', data.peso);
        formData.append('id_pessoa', 11);
        formData.append('data_nascimento', dataformat);
        formData.append('foto', data.foto);
        formData.append('cod', chave);
        console.log(formData);
        fetch('http://www.ipet.kinghost.net/v1/account/AlterarPet', {
            method: "POST",
            body: formData
        })
            .then((responseJson) => {
                if(responseJson.ok === true){
                    return(
                        Alert.alert(
                            'Chave',
                            'Código de Compartilhamento:' + chave,
                            [
                                {
                                    text: 'Ok', onPress: () => props.navigation.navigate({
                                        routeName: 'Pet'
                                    })
                                },
        
                            ],
                            { cancelable: false }
                        )   
                    );
                }
                console.log(JSON.stringify(responseJson));
                // pegaPet();
            }
            )
            .catch((error) => { console.log("erro fetch", error) });
    }

    const alteraPet = async () => {


        var dataformat = moment(data.dt_nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
        if (!data.nome || !data.raca || !data.peso || !data.dt_nascimento) {
            // setData({ ...data, alerta: 'Verifique se todos os dados estão preenchidos.' })
        } else {
            console.log(data99.controle);
            if (data99.controle == 0) {
                console.log("entrei no controle 0")
                console.log(image)
                let formData = new FormData();
                formData.append('id', data.id);
                formData.append('nome', data.nome);
                formData.append('raca', data.raca);
                formData.append('peso', data.peso);
                formData.append('id_pessoa', parseInt(11));
                formData.append('data_nascimento', dataformat);
                formData.append('foto', data.foto);
                await fetch('http://www.ipet.kinghost.net/v1/account/AlterarPet', {
                    method: "POST",
                    body: formData
                })
                    .then((responseJson) => {
                        if(responseJson.ok === true){
                            return(
                                Alert.alert(
                                    'Editar',
                                    'Pet Alterado!',
                                    [
                                        {
                                            text: 'Ok', onPress: () => props.navigation.navigate({
                                                routeName: 'Pet'
                                            })
                                        },
                
                                    ],
                                    { cancelable: false }
                                )   
                            );
                        }
                        console.log(JSON.stringify(responseJson));

                    }
                    )
                    .catch((error) => { console.log("erro fetch", error) });
            } else {
                console.log("entrei no controle fetch 1")
                var dataformat = moment(data.dt_nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
                let formData = new FormData();
                let localUri = image;
                let filename = localUri.split('/').pop();

                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;


                formData.append('Image', { uri: localUri, name: filename, type });
                formData.append('id', data.id);
                formData.append('nome', data.nome);
                formData.append('raca', data.raca);
                formData.append('peso', data.peso);
                formData.append('id_pessoa', 11);
                formData.append('data_nascimento', dataformat);
                
                await fetch('http://www.ipet.kinghost.net/v1/account/AlterarPet', {
                    method: "POST",
                    body: formData
                })
                    .then((responseJson) => {
                        var response = JSON.parse(responseJson)
                        if(responseJson.ok === true){
                            return(
                                Alert.alert(
                                    'Editar',
                                    'Pet Alterado!',
                                    [
                                        {
                                            text: 'Ok', onPress: () => props.navigation.navigate({
                                                routeName: 'Pet'
                                            })
                                        },
                
                                    ],
                                    { cancelable: false }
                                )   
                            );
                        }
                        console.log(JSON.stringify(responseJson));
                    }
                    )
                    .catch((error) => { console.log("erro fetch", error) });
            }
        }



    }


    return (


        <View style={styles.container}>
            <StatusBar backgroundColor='#836FFF' barStyle="light-content" />
            <Header style={styles.headerContainer}
                placement="center"
                statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
                containerStyle={{ width: '100%', backgroundColor: '#836FFF' }}
                centerComponent={{ text: 'NOVO PET', style: { color: '#fff' } }}
                leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)} />}
            />
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {

                    }]}>Nome do PET</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="paw"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInput
                            defaultValue={data.nome}
                            placeholder="Digite o nome do PET"
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
                    }]}>Raça</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="paw"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInput
                            defaultValue={data.raca}
                            placeholder="Digite a raça do pet"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeRaca(val)}
                        />
                        {data.check_textInputChangeRaca ?
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
                    }]}>Data de Nascimento - (Estimada)</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="paw"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/AAAA'
                            }}
                            value={data.dt_nascimento}
                            defaultValue={data.dt_nascimento}
                            placeholder="Formato DD/MM/AAAA"
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
                    }]}>Peso</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="paw"
                            color="#0f0f0f"
                            size={20}
                        />
                        <TextInput
                            defaultValue={data.peso}
                            placeholder="Digite o peso do PET"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangePeso(val)}
                        />
                        {data.check_textInputChangePeso ?
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

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                        <Button title="SELECIONE A IMAGEM" onPress={pickImage} color="blue" />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
                    <View style={{padding:20}}/>
                    <View style={styles.details}>        
                        <Button title="COMPARTILHAR PET" onPress={() => { geraChave(data.nome, data.id) }} color="#836FFF" />
                        <Button title="EDITAR" onPress={() => { alteraPet() }} color="#836FFF" />
                    </View>
                    <View style={{padding:20}}/>
                    <View style={styles.details}>        
                        <Button title="EXCLUIR" onPress={() => { deletaPet() }} color="gray" />
                    </View>  

                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default PetScreen;

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
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
      },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    headerContainer: {
        height: Platform.select({
            android: 56,
            default: 44,
        }),
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