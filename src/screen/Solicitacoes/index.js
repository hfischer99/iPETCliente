import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert } from 'react-native';
import { Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Container } from 'native-base';
import DatePicker from 'react-native-datepicker'
import { ListItem } from 'react-native-elements';


const PetScreen = props => {
  const [pet, setPet] = React.useState({
    pet: []
  });
  const [data, setData] = React.useState({

  });
  const pegaPet = async () => {
    var temp = [];
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaPet', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": 10,

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
  }

  useEffect(() => { pegaPet() });

  const Separator = () => (
    <View style={styles.separator} />
  );

  //const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return (
    <Container>
      <Header style={styles.headerContainer}
        placement="center"
        statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{ width: '100%', backgroundColor: '#836FFF' }}
        centerComponent={{ text: 'MEU PET', style: { color: '#fff' } }}
        leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)} />}
      />
      <ScrollView>
        <View style={styles.details}>
          <Button
            title="INSERIR NOVO PET"
            color="green"
            onPress={() => {
              props.navigation.navigate({
                routeName: 'PetInsert',
              });
            }}
          />
          <Button
            title="ADD PET JÁ CADASTRADO"
            color="#836FFF"
            onPress={() => {
              props.navigation.navigate({
                routeName: 'PetCompartilhado',
              });
            }}
          />
        </View>
        {pet.pet.map(pet => (
          <View style={styles.listItem}>
            <ListItem
              leftAvatar={{
                title: pet.nome,
                size: 'xlarge',
                source: { uri: pet.foto },
                showAccessory: true,
              }}
              title={pet.nome}
              subtitle={pet.raca}
              onPress={() => {
                props.navigation.navigate({
                  routeName: 'PetEdit', params: {
                    PetData: pet
                  }
                });
              }}
              chevron
            />
          </View>
        ))}
      </ScrollView>
    </Container>

  );
};

PetScreen.navigationOptions = (navigationData) => {
  //   const catId = navigationData.navigation.getParam('categoryId');
  //const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: "PET"
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
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

export default PetScreen;
