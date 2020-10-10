import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert, TextInput } from 'react-native';
import { Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Container } from 'native-base';
import DatePicker from 'react-native-datepicker'

const FilterScreen = props => {
  const [data8, setData8] = React.useState({

  });
  var value = [];
  const Separator = () => (
    <View style={styles.separator} />
  );

  const addPetCompartilhado = async (pet) => {

    console.log(data8)
    await fetch('http://www.ipet.kinghost.net/v1/account/AdicionarPetCompartilhado', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "cod": data8,
        "id_pessoa": 10,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson == "Chave não existe") {
          Alert.alert(
            'Erro!',
            'Verifique a chave de compartilhamento!',
            [
              {text: 'Ok', onPress: () => null},                
              
            ],
            { cancelable: false }
          )
        } else {
          Alert.alert(
            'Cadastro',
            'PET Vinculado',
            [
              {text: 'Ok', onPress: () => props.navigation.navigate({
                routeName: 'Menu'})},                
              
            ],
            { cancelable: false }
          )
        }
      }
      )
      .catch((error) => { console.log("erro fetch", error) });
  }




return (
  <Container>
    <Header style={styles.headerContainer}
      placement="center"
      statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
      containerStyle={{ width: '100%', backgroundColor: '#836FFF' }}
      centerComponent={{ text: 'PET COMPARTILHADO', style: { color: '#fff' } }}
      leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)} />}
    />
    <View style={styles.SpaceText}></View>
    <View style={styles.fixToText}>
      <Text style={{ fontSize: 18 }}>Insira o códido de compartilhamento </Text>
    </View>
    <View style={styles.details}>

      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, alignItems: 'center' }}
        onChangeText={text => setData8(text)}
        value={data8}
      />
    </View>
    <View style={styles.fixToText}>
      <Button
        title="AGENDAR SERVIÇO"
        color="#836FFF"
        onPress={() => addPetCompartilhado(data8)}
      />
    </View>
  </Container>

);
};


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    alignItems: 'center',
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  SpaceText: {
    alignItems: 'center',
    paddingTop: 100,
    justifyContent: 'space-between',
  },
  contaniner: {
    flex: 1,
    width: '100%',
    height: '100%'

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
    paddingTop: 100,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  },
  titleLeft: {
    fontSize: 16,
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
