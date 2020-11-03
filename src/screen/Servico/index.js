import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert, Picker } from 'react-native';
import { Header, Avatar } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { color } from 'react-native-reanimated';
// import { Picker } from 'native-base';
//import { ScrollView } from 'react-native-gesture-handler';

const FilterScreen = props => {
  const catId = props.navigation.getParam('categoryId');
  const Separator = () => (
    <View style={styles.separator} />
  );
  const [selectedValue, setSelectedValue] = useState();

  const [pet, setPet] = React.useState({
    pet: []
  })
  const [endereco, setEndereco] = React.useState({
    endereco: [],
    select:[],
  })
  
  const [data, setData] = React.useState({
    color1: 'gray',
    color2: 'gray',
    vlrBtn: 0,
    id_servico_empresa: catId.id_servico_empresa,
    empresa: catId.empresa,
    statusMotorista: catId.motorista,
    statusFormaPag: catId.formapagamento,
    color1moto: 'gray',
    color2moto: 'gray',
    vlrBtnmoto: 0,
    distancia: 2,
    precoKm: 10,
    valorFrete: 0,
    valorMini: catId.valorMini,
    valorP: catId.valorP,
    valorM: catId.valorM,
    valorG: catId.valorG,
    valor: 0,
    valorTotal: 0,
    latitudeOrigem: catId.latitude,
    longitudeOrigem: catId.longitude,
    resposta: "O",
    teste: ['1', '2', '3'],
  });
  const [Solicitacao, setSolicitacao] = React.useState({
    valor_total : '',
    valor_frete : '',
    valor_servico:'',
    motorista : '',
    formapagamento :  '',
    id_pet : '',
    id_pessoa : '',
    status : '',
    id_servico_empresa : '',
    endereco : '',
    data : '',
    id_empresa : '',
    empresa: '',
  });

  const Check = (btn) => {
    if (btn == "1") {
      setData({ ...data, color1: 'green', color2: 'gray', vlrBtn: 1 })
    } else {
      setData({ ...data, color1: 'gray', color2: 'green', vlrBtn: 2 })
    }
  }
  const CheckMoto = (btn) => {
    if (btn == "1") {
      setData({ ...data, color1moto: 'green', color2moto: 'gray', vlrBtnmoto: 1 })
    } else {
      setData({ ...data, color1moto: 'gray', color2moto: 'green', vlrBtnmoto: 2 })
    }
  }

  const pegaPet = async () => {
    var temp = [];
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaPet', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": 11,

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        // setData({endereco: JSON.parse(responseJson)});
        temp = JSON.parse(responseJson);

      }
      )
      .catch((error) => { console.log("erro fetch", error) });
    setPet({ ...pet, pet: temp });
     if(data.statusMotorista == "1"){
      pegaEnd()
    }
  }
  const FreteValor = () => {
    if (data.statusMotorista == "1") {
      return (
        <View style={styles.leftComponent}>
          <Text style={styles.titleLeft}>Frete:  R${data.valorFrete}</Text>
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }

  const CheckMotorista = () => {
    if (data.statusMotorista == "1") {
      return (
        <View style={styles.details}>
          <Button title="Quero motorista" color={data.color1moto} onPress={() => CheckMoto("1")} />
          <Button title="Não quero motorista" color={data.color2moto} onPress={() => CheckMoto("2")} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.details}>
          <Text>Não disponível</Text>
        </View>
      );
    }
  }

  const CheckEndereco = () => {
    if (data.statusMotorista == "1") {
      return (
        <View style={styles.details}>
        <Text style={{ textAlign: 'center', alignItems: 'center' }}>Escolha o endereço de busca:</Text>
        <View/>
        <View style={styles.details}></View>
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => calculaValorFrete(itemValue)}
      >
        <Picker.Item label=" " value="js" />
        {endereco.endereco.map(message => (
          <Picker.Item label={message.endereco} value={message} />
        ))}
        
      </Picker>
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }
  const pegaEnd = async () => {
    var end = [];
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaEndereco', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": 11,

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        end = JSON.parse(responseJson);
      }
      )
      .catch((error) => { console.log("erro fetch pega end", error) });
    //console.log(testeEndereco)
    await setEndereco({ ...endereco, endereco: end });
    // calculaValorFrete()
  }

  const CheckFormaPagt = () => {
    if (data.statusFormaPag == "1") {
      return (
        <View style={styles.details}>
          <Button title="Dinheiro / Cartão" color={data.color1} onPress={() => Check("1")} />
          <Button title="Pagseguro" color={data.color2} onPress={() => Check("2")} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.details}>
          <Button title="Dinheiro / Cartão" color={data.color1} onPress={() => Check("1")} />
        </View>
      );
    }
  }

  const SelecionaPet = async (dog) => {
    var calcula = 0;
    if(dog.porte == "Mini"){
      calcula = parseFloat(data.valorMini) + parseFloat(data.valorFrete);
      await setData({...data,valor: data.valorMini, valorTotal: calcula.toFixed(2)})
    }else if(dog.porte == "P"){
      calcula = parseFloat(data.valorP) + parseFloat(data.valorFrete);
      await setData({...data,valor: data.valorP, valorTotal: calcula.toFixed(2)})
    }else if (dog.porte == "M"){
      calcula = parseFloat(data.valorM) + parseFloat(data.valorFrete);
      await setData({...data,valor: data.valorM, valorTotal: calcula.toFixed(2)})
    }else if (dog.porte == "G"){
      calcula = parseFloat(data.valorG) + parseFloat(data.valorFrete);
      await setData({...data,valor: data.valorG, valorTotal: calcula.toFixed(2)})
    }
    console.log(data.valor)
  }
  
  useEffect(() => { pegaPet() }, []);

  const calculaValorFrete = async (id) => {
    setSelectedValue(id);
    //console.log(id);
    console.log(catId)
    var valorF = 0;
    var valorT = 0;
    var soma = 0;
    await fetch('http://www.ipet.kinghost.net/api/corridas/distanciakm', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "latitudeOrigem": data.latitudeOrigem,
        "longitudeOrigem": data.longitudeOrigem,
        "latitudeDestino": id.latitude,
        "longitudeDestino": id.longitude,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        valorF = responseJson;
      }
      )
      .catch((error) => { console.log("erro fetch", error) });
    valorF = parseFloat(catId.precokm * valorF / 1000).toFixed(2);
    valorT = parseFloat(data.valor);
    soma = parseFloat(valorF) + parseFloat(valorT);
    //console.log(soma)
    await setData({ ...data,valorTotal:soma.toFixed(2),valorFrete: valorF });
  }

  const CheckPagina = () => {
    setSolicitacao({...Solicitacao, valor_total: data.valorTotal, valor_frete: data.valorFrete, valor_servico:data.valorFrete, formapagamento:data.vlrBtn,id_pessoa: 10, motorista:data.vlrBtnmoto, empresa: data.empresa})
    console.log(Solicitacao)
    console.log(catId)
    if (data.vlrBtn == 0) {
      Alert.alert(
        '💰 Selecione forma de pagamento 💰'
      )
    }
    else if(data.valor === 0){
      Alert.alert(
        '🐾 Selecione seu pet 🐾'
      )
    }
    else {
      console.log(Solicitacao)
      if (data.vlrBtn == 1) {
        props.navigation.navigate({
          routeName: 'Agendamento', params: {
            categoryId: catId
          }
        });
      }
      // else {
      //   props.navigation.navigate({
      //     routeName: 'Card', params: {
      //       categoryId: catId
      //     }
      //   });
      // }
    }

  }

  //console.log(catId)
  //const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Header style={styles.headerContainer}
        placement="center"
        statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{ width: '100%', backgroundColor: '#836FFF' }}
        centerComponent={{ text: catId.nomeFantasia, style: { color: '#fff' } }}
        leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)} />}
      />
      <ScrollView>


        <Image source={{ uri: catId.foto }} style={styles.image} />
        <View style={styles.RightComponent}>
            <Rating startingValue={catId.avaliacao} readonly='False' imageSize={20} style={{ justifyContent: 'center', paddingVertical: 5, paddingTop:20, fontSize: 14 }} />
        </View>
        <Text style={styles.title}>{catId.nomeFantasia}</Text>
        <View style={styles.details}>
          <Text>{catId.descricao}</Text>
        </View>
        <Separator />
        <View style={styles.details}>
          <View style={{ textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', alignItems: 'center' }}>Localização Loja: {catId.bairro} - {catId.cidade}</Text>
          </View>
        </View> 
        <Separator />
        <View style={{ flexDirection: 'row', widdht: 150, padding: 15 }}>
          <View style={{ textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', alignItems: 'center', fontSize: 15 }}>Formas de Pagamento: </Text>
          </View>
        </View>
        <CheckFormaPagt />

        <Separator />

        <View style={{ flexDirection: 'row', widdht: 150, padding: 15 }}>
          <View style={{ textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', alignItems: 'center', fontSize: 15 }}>Motorista: </Text>
          </View>
        </View>
        <CheckMotorista />
        <Separator />
        <View style={styles.details}>
          <Text style={{ textAlign: 'center', alignItems: 'center', fontSize: 15 }}>Escolha seu PET: </Text>
        </View>
        <View style={styles.details}>
          <ScrollView horizontal={true} style={{ paddingTop: 30 }}>
            {pet.pet.map(message => (
              <View>
                <Avatar
                  rounded
                  size="xlarge"
                  onPress={() => SelecionaPet(message)}
                  title={message.nome}
                  activeOpacity={0.7}
                  source={{ uri: message.foto} }
                  containerStyle={{ paddingLeft: 20 }}
                />
                <Text>{message.nome} - {message.raca}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Separator />
        <CheckEndereco />
        <Separator />

        <View style={{
          flexDirection: 'row', widdht: 150, padding: 15
        }}>
          <View style={styles.leftComponent}>
            <Text style={styles.titleLeft}>Serviço:  R${data.valor}</Text>
            <Text style={styles.titleLeft}>Total: {data.valorTotal}</Text>
          </View>
          <FreteValor />  
        </View>
        <View style={{
          flexDirection: 'row', widdht: 150, padding: 8
        }}>
          <View style={styles.leftComponent}>
            <Button
              title="SOLICITAR SERVIÇO"
              color="#836FFF"
              onPress={() => {
                // console.log(pet);
                //console.log(data.endereco);
                 CheckPagina()
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>

  );
};

FilterScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  //const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: catId.nomeFantasia
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  leftComponent: {
    flex: 1,
    height: 50
  },
  RightComponent: {
    flex: 2,
    height: 50
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  },
  titleLeft: {
    fontSize: 20,
    textAlign: 'left',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerContainer: {
    height: Platform.select({
      android: 56,
      default: 44,
    }),
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default FilterScreen;
