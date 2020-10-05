import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert } from 'react-native';
import { Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Container } from 'native-base';
import { CreditCardInput, LiteCreditCardInput } from "react-native-input-credit-card";
import pagarme from '../../lib/pagarme';
import PagarMeWebView from '../../lib/pagarmeWebView'

//import { ScrollView } from 'react-native-gesture-handler';

const FilterScreen = props => {
  const [data, setData] = React.useState({
    resposta: [],
    texto: "",
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    valor: '',
    cardhash: '',
    nomePessoa: '',
    email: '',
    cpf: '',
    error: '',
    cartao:[],

});
const card = {
  card_number: data.cartao.values.number,
  card_holder_name: data.cartao.values.name,
  card_expiration_date: data.cartao.values.expiry,
  card_cvv: data.cartao.values.cvc
  }
  const PegaDados= () =>{
    hash();
    console.log(data.cardhash)

  }
//   const hash = () => {
//     pagarme.client.connect({ encryption_key: 'ek_test_NA3xJ9GOfZQylBmi0ifhbOE6rOfUkm' })
//     .then(client => client.security.encrypt(card))
//     .then(card_hash => setData({
//         ...data,
//         cardhash: card_hash
//     }))
// }
  const catId = props.navigation.getParam('categoryId');
  var date = new Date().getDate();
  var month = new Date().getMonth()
  var year = new Date().getFullYear();
  var monthMax = month + 1;
  var monthMaxDate = monthMax + 1;
  const Separator = () => (
    <View style={styles.separator} />
  );
  const fazPagamento = async () => {

       
    console.log("entrei", data.cardhash)
    
fetch('https://api.pagar.me/1/transactions?', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
            "api_key": "ak_test_KpivEkrnxyTXHnEQ2XOmTm5NPs3lcV",
            "amount": "100",//data.valor,
            "card_hash": data.cardhash,
            "customer": {
              "external_id": "#3311",
              "name": "Morpheus Fishburne", //data.nomePessoa,
              "type": "individual",
              "country": "br",
              "email": "teste@teste.com", //data.email,
              "documents": [
                {
                  "type": "cpf",
                  "number": "106.390.099-99",//data.cpf
                }
              ],
              "phone_numbers": ["+5511999998888", "+5511888889999"],
            "birthday": "1965-01-01"
            },
            "billing": {
              "name": "Trinity Moss",
              "address": {
                "country": "br",
                "state": "sp",
                "city": "Cotia",
                "neighborhood": "Rio Cotia",
                "street": "Rua Matrix",
                "street_number": "9999",
                "zipcode": "06714360"
              }
            },
            "shipping": {
              "name": "Neo Reeves",
              "fee": 1000,
              "delivery_date": "2000-12-21",
              "expedited": true,
              "address": {
                "country": "br",
                "state": "sp",
                "city": "Cotia",
                "neighborhood": "Rio Cotia",
                "street": "Rua Matrix",
                "street_number": "9999",
                "zipcode": "06714360"
              }
            },
            "items": [
              {
                "id": "r123",
                "title": "Red pill",
                "unit_price": 10000,
                "quantity": 1,
                "tangible": true
              },
              {
                "id": "b123",
                "title": "Blue pill",
                "unit_price": 10000,
                "quantity": 1,
                "tangible": true
              }
            ]
        }

    )
})
    .then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
       setData({resposta: JSON.parse(responseJson)})
    }
    )
    .catch((error) => { console.log("erro fetch", error) });
}
  const pagarMeRef = React.createRef();

  onPress = async () => { 
    console.log("Qualquer coisa")
    if (pagarMeRef.current) {
      try {
        const result = await pagarMeRef.current.getCardHash(card);
        console.log('CARD HASH', result);
      } catch (error) {
        console.log('error', error);
      }
    }
  }

  const s = StyleSheet.create({
    switch: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    container: {
      backgroundColor: "#F5F5F5",
      marginTop: 60,
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
  });

  return (
    <Container>
    <Header style={styles.headerContainer}
    placement="center"
    statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
    containerStyle={{ width: '100%', backgroundColor: '#836FFF'}}
    centerComponent={{ text: 'Pagamento', style: { color: '#fff' } }}
    leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)}/>}
    /> 
      <View style={{...styles.contaniner}}>
      <Button
          title="AGENDAR SERVIÇO"
          color="#836FFF"
          onPress={()=> console.log(PegaDados())}
        />
            <CreditCardInput
              autoFocus
              requiresName={true}
              requiresCVC={true}
              validColor="black"
              invalidColor="red"
              placeholderColor="darkgray"
              labelStyle={{color: "black", fontSize:12}}
              inpuStyle={{color: "black", fontSize:16}}
              onChange={form => setData({...data,cartao: form})} 
             />
             <PagarMeWebView ref={pagarMeRef} />
        <Button title="Pagar" onPress={onPress} />
      </View>
      
      
  </Container>
  
    
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
  contaniner:{
    flex:1,
    width:'100%',
    height:'100%'
    
  },
  leftComponent: {
    flex:1,
    height: 50
  },
  RightComponent: {
    flex:2,
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
  contaniner:{
    flex:1,
    width:'100%',
    height:'100%'
    
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
