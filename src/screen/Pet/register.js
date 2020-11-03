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
import { set } from 'react-native-reanimated';





const PetScreen = props => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
    })

    const [data, setData] = React.useState({
        nome: '',
        raca: '',
        dt_nascimento: '',
        peso: '',
        porte: '',
        id_pessoa: '',
        foto: [],
        check_textInputChangeNome: false,
        check_textInputChangeRaca: false,
        check_textInputChangePeso: false,
        check_textInputChangeDT: false,
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
        if (val.length > 0) {
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

        console.log(result);

        if (!result.cancelled) {
            setData({ ...data, foto: result });
            setImage(result.uri);
        }
    };

    const registro = async e => {
        console.log(data.nome, data.raca, data.dt_nascimento, data.porte, data.peso)

        let formData = new FormData();
        let localUri = image;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;


        formData.append('Image', { uri: localUri, name: filename, type });
        formData.append('nome', data.nome);
        formData.append('raca', data.raca);
        formData.append('id_pessoa', 11);
        formData.append('peso', data.peso);
        formData.append('data_nascimento', data.dt_nascimento);
        //formData.append('Image', data.foto, "auau");
        // e.preventDefault();

        fetch('http://www.ipet.kinghost.net/v1/account/AdicionarPet', {
            method: "POST",
            body: formData
        })

            .then((response) => response.text())
            .then((responseJson) => {
                console.log("responsejson", responseJson)
                if (responseJson == "ok") {
                    Alert.alert(
                        'Registro',
                        'Pet cadastrado.',
                        [
                            {
                                text: 'Ok', onPress: () => props.navigation.navigate({
                                    routeName: 'Pet'
                                })
                            },

                        ],
                        { cancelable: false }
                    )
                }

            }
            )
            .catch((error) => { console.log("erro fetch", error) });

        console.log({ ...data })
    };


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
                            placeholder="Digite o peso estimado do pet"
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


                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { registro() }}
                        >
                            <LinearGradient
                                colors={['#836FFF', '#bdb3fc']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Registrar</Text>
                            </LinearGradient>
                        </TouchableOpacity>


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