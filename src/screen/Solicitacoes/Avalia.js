import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert, Picker } from 'react-native';
import { Header, Avatar } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { color } from 'react-native-reanimated';

const FilterScreen = props => {
  const catId = props.navigation.getParam('SolData');
  const Separator = () => (
    <View style={styles.separator} />
  );
  const [selectedValue, setSelectedValue] = useState();

  const [pet, setPet] = React.useState({
    pet: []
  })
  const [endereco, setEndereco] = React.useState({
    endereco: [],
    select: [],
  })
  const [data, setData] = React.useState({
    vlrBtn: 0,
    id: catId.Id,
    id_ServicoEmpresa: catId.id_ServicoEmpresa,
    statusMotorista: catId.motorista,
    statusFormaPag: catId.formapagamento,
    status: catId.status,
    valorFrete: 0,
    avaliacao: catId.avaliacao,
    valorMini: catId.valorMini,
    valor: 0,
    valorTotal: 0,
    FreteValor: 0,
    motorista: catId.motorista,
  });
  const Entrega = () => {
    if (data.motorista == "1") {
      return (
        <View>
          <Separator />
          <View style={{ flexDirection: 'row', widdht: 150, padding: 15 }}>
            <View style={{ textAlign: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', alignItems: 'center', fontSize: 15 }}>Endereço PET: {catId.endereco} - {catId.numero} </Text>
            </View>
          </View>
        </View>

      );
    } else {
      return (
        <View>
        </View>
      );
    }
  }

  const Avaliacao = async (avaliacao) => {
    console.log("entrei", avaliacao)
    await fetch('http://www.ipet.kinghost.net/v1/account/Avaliacao', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             "id_Solicitacoes": parseInt(data.id),
             "id_ServicoEmpresa": parseInt(data.id_ServicoEmpresa),
             "valoravaliacao": avaliacao
     
        
            })
        })
            .then((responseJson) => {
             console.log("resposta",JSON.stringify(responseJson));
                  Alert.alert(
                    'Avaliação',
                    'Obrigado pela sua Avaliação!',
                    [
                        {
                            text: 'Ok', onPress: () => props.navigation.navigate({
                                routeName: 'Solicitacao'
                            })
                        },

                    ],
                    { cancelable: false }
                )   
            }
            )
            .catch((error) => { console.log("erro fetch", error) }); 
 }

 const ratingCompleted = (rating) => {
  console.log("Rating is: " + rating)
}

  const CheckAvaliacao = () => {
    if (data.avaliacao == 0 & data.status == "Concluído") {
      return (
        <View>
          <Text style={styles.details}>AVALIE O SERVIÇO: </Text>
          <Rating startingValue={catId.avaliacao}  onFinishRating={Avaliacao} imageSize={20} style={{ justifyContent: 'center', paddingVertical: 5, paddingTop: 20, fontSize: 14 }} />
        </View>
      );
    } else if (data.avaliacao != 0 & data.status == "Concluído") {
      return (
        <View >
          <Text style={styles.details}>SUA AVALIAÇÃO:</Text>
          <Rating startingValue={catId.avaliacao} readonly='False' imageSize={20} style={{ justifyContent: 'center', paddingVertical: 5, paddingTop: 20, fontSize: 14 }} />
        </View>
      );
    } else {
      return (
        <View>
        </View>
      );
    }

  }

  const CheckFrete = () => {
    if (data.motorista == "1") {
      return (
        <View style={styles.leftComponent}>
          <Text style={styles.titleLeft}>Frete:  R${catId.valor_frete}</Text>
        </View>
      );
    } else {
      return (
        <View>
        </View>
      );
    }

  }

  // useEffect(() => { pegaPet() }, []);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Header style={styles.headerContainer}
        placement="center"
        statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{ width: '100%', backgroundColor: '#836FFF' }}
        centerComponent={{ text: "Avaliação", style: { color: '#fff' } }}
        leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)} />}
      />
      <ScrollView>
        <Image source={{ uri: catId.foto }} style={styles.image} />
        <View style={styles.RightComponent}>
        </View>
        <Text style={styles.title}>{catId.nomefantasia}</Text>
        <View style={styles.details}>
          <Text>Status: {catId.status}</Text>
        </View>
        <CheckAvaliacao />
        <Separator />
        <View style={{ flexDirection: 'row', widdht: 150, padding: 15 }}>
          <View style={{ textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', alignItems: 'center' }}>Descrição: {catId.descricao}</Text>
          </View>
        </View>
        <Separator />
        <View style={{ flexDirection: 'row', widdht: 150, padding: 15 }}>
          <View style={{ textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', alignItems: 'center' }}>PET: {catId.pet}</Text>
          </View>
        </View>
        <Separator />
        <View style={{ flexDirection: 'row', widdht: 150, padding: 15 }}>
          <View style={{ textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', alignItems: 'center', fontSize: 15 }}>Data Serviço: {catId.data} </Text>
          </View>
        </View>
        <Entrega />
        <Separator />
        <View style={{
          flexDirection: 'row', widdht: 150, padding: 15
        }}>
          <View style={styles.leftComponent}>
            <Text style={styles.titleLeft}>Serviço:  R${catId.valor_servico}</Text>
            <View style={{padding:5}}></View>
            <Text style={styles.titleLeft}>Total: R${catId.valor_total}</Text>
          </View>
          <CheckFrete/>
        </View>
        <View style={{
          flexDirection: 'row', widdht: 150, padding: 8
        }}>
          
        </View>
      </ScrollView>
    </View>

  );
};

FilterScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  //const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: "Avaliação"
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
