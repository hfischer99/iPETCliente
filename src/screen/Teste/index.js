import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Colors from '../../Components/Colors'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Searchbar } from 'react-native-paper';
import { ButtonGroup} from "react-native-elements";
import { set } from 'react-native-reanimated';
import { Input } from 'react-native-elements';
import {Container, Header, Tab, Tabs} from 'native-base';



const Tela = props => {

  const [data, setData] = useState({
    resposta: [],
    veterinaria: [],
    texto: "lindo",
  });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting search ${search}`)
    };
    var texto = ""
    const updateSearch = (search) => {
      texto = search;
      fetch('http://www.ipet.kinghost.net/api/corridas/ServicosEmpresaNome', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Cidade": "Pinhais",
            "nomeFantasia": texto
    
        })
    })
    
        .then((response) => response.json())
        .then((responseJson) => {
           console.log("teste",responseJson);
           setData({resposta: JSON.parse(responseJson)})
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
    };

    const veterinaria = () => {
      fetch('http://www.ipet.kinghost.net/api/corridas/ServicosEmpresaNome', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Cidade": "Pinhais",
            "descricao": "Veterinaria"
    
        })
    })
    
        .then((response) => response.json())
        .then((responseJson) => {
           console.log("teste",responseJson);
           setData({resposta: JSON.parse(responseJson)})
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
    };

    useEffect(() => {
      if(data.resposta.length == 0 )
      {
      fetch('http://www.ipet.kinghost.net/api/corridas/ServicosEmpresaAvaliacao', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Cidade": "Pinhais",
  
        })
      })
  
        .then((response) => response.json())
        .then((responseJson) => {
          setData({ resposta: JSON.parse(responseJson) })
          //console.log(data.resposta)
  
  
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
      }
    }, {});

  const renderGridItem = itemData => {
    return (
      <TouchableOpacity style={styles.gridItem} onPress={() => {
        props.navigation.navigate({
          routeName: 'Servico', params: {
            categoryId: itemData.item
          }
        });
      }}
      >
        <View  style={{...styles.contaniner}}>
          <ImageBackground source={{uri: itemData.item.foto}} style={styles.bgImage}>
          </ImageBackground>
          <View style={{...styles.textsView}}>
              <Text style={styles.title} numberOfLines={1}>{itemData.item.nomeFantasia}</Text>
              <Text>{itemData.item.descricao}</Text>
              <Text>Valor Médio R$ {itemData.item.valor}</Text>
              <View style={{ alignItems:'flex-end', paddingVertical: 5 }}>
              <Rating startingValue={itemData.item.avaliacao} readonly={true} imageSize={20} style={{ paddingVertical: 5,fontSize:20 }}/>
              
            </View>
            </View>
            
        </View>
      </TouchableOpacity>
    );
  };

  const renderGridItemVet = itemData => {
    return (
      <TouchableOpacity style={styles.gridItem} onPress={() => {
        props.navigation.navigate({
          routeName: 'Servico', params: {
            categoryId: itemData.item
          }
        });
      }}
      >
        <View  style={{...styles.contaniner}}>
          <ImageBackground source={{uri: itemData.item.foto}} style={styles.bgImage}>
          </ImageBackground>
          <View style={{...styles.textsView}}>
              <Text style={styles.title} numberOfLines={1}>{itemData.item.nomeFantasia}</Text>
              <Text>{itemData.item.descricao}</Text>
              <Text>Valor Médio R$ {itemData.item.valor}</Text>
              <View style={{ alignItems:'flex-end', paddingVertical: 5 }}>
              <Rating startingValue={itemData.item.avaliacao} readonly='False' imageSize={20} style={{ paddingVertical: 5,fontSize:20 }}/>
              
            </View>
            </View>
            
        </View>
      </TouchableOpacity>
    );
  };

  return (
    
    <Container>
       <Header style={styles.headerContainer}
          placement="center"
          statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
          containerStyle={{ width: '100%', backgroundColor: '#836FFF'}}
          centerComponent={{ text: 'Bem vindo ao iPet', style: { color: '#fff' }}}
        />
            <Tabs initialPage={0} color={"#836FFF"}>
              <Tab heading="Pet Shop" >
                
                <Searchbar
                  placeholder="Pesquise Aqui"
                  //leftIcon={{ type: 'font-awesome', name: 'comment' }}
                  //style={styles}
                  onChangeText={value => updateSearch(value)}
                />
                <ScrollView>
                  <FlatList
                    keyExtractor={({ item, index }) => index}
                    data={data.resposta}
                    renderItem={renderGridItem}


                    numColumns={1}
                  />
                </ScrollView>
                
              </Tab>
        <Tab heading="Veterinária">
            <Searchbar
               placeholder="Pesquise Aqui"
                //leftIcon={{ type: 'font-awesome', name: 'comment' }}
                //style={styles}
                onChangeText={value => updateSearch(value)}
             />
             <ScrollView>
                <FlatList
                  keyExtractor={({ item, index }) => index}
                  data={data.resposta}
                  renderItem={renderGridItemVet}


                  numColumns={1}
                />
              </ScrollView>
          </Tab>
          <Tab heading="Promoções">
                <View style={[ styles.container, { backgroundColor: '#eee' } ]}>
                       <Text>Aba 3</Text>             
                </View>
          </Tab>
        </Tabs>
      </Container>
  );


 


};

Tela.navigationOptions = {
  headerTitle: 'iPet',
  textAlign: "center",
  alignItems: 'center',
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 20,
    height: 300,
    backgroundColor:"#fff",
    borderRadius:10,
    shadowColor:'black',
    shadowOpacity: 0.26,
    shadowOffset:{width: 0, height: 2},
    shadowRadius:10,
    elevation:3,
    padding:1,
    overflow: 'hidden',
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
  title:{
    //fontFamily: 'open-sans-bold',
    fontSize:22,
  },
  bgImage:{
    flex:2,
    borderRadius:10,
    width:'100%',
    height:'110%',
    alignItems:'flex-start'
  },
  textsView:{
    flex:1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    width:'50%',
    height:'80%',
    alignItems:'flex-start'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default Tela;
//export default MenuScreen;