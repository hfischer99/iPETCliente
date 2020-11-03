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
    solicitacao: [],
  });
  const pegaSolicitacao = async () => {

    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacao', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id_pessoa": 10,

        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setData({...data, solicitacao: JSON.parse(responseJson) })

        }
        )
        .catch((error) => { console.log("erro fetch", error) });

  }

  useEffect(() => { pegaSolicitacao() }, []);

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
        centerComponent={{ text: 'SOLICITAÇÕES', style: { color: '#fff' } }}
        leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)} />}
      />
      <ScrollView>
        {data.solicitacao.map(sol => (
          <View style={styles.listItem}>
            <ListItem
              leftAvatar={{
                title: sol.nomeFantasia,
                size: 'xlarge',
                source: { uri: sol.foto },
                showAccessory: false,
              }}
              title={sol.descricao}
              subtitle={sol.status}
              onPress={() => {
                props.navigation.navigate({
                  routeName: 'Avalia', params: {
                    SolData: sol
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
