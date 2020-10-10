import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert, FlatList, TouchableOpacity,RefreshControl } from 'react-native';
import { Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import { ListItem } from 'react-native-elements';


//import { ScrollView } from 'react-native-gesture-handler';

const Endereco = props => {

    const [data, setData] = React.useState({
        endereco:[]
    })

    useEffect(() => {pegaEnd()},{});

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
        await setData({ ...data, endereco: end });
        //console.log(data.endereco)
        renderGridItem(data.endereco)
        
      }

      const renderGridItem = itemData => {
        return (
          <TouchableOpacity style={styles.listItem} onPress={() => {
            props.navigation.navigate({
              routeName: 'EnderecoEdit', params: {
                End: itemData.item
              }
            });
          }}
          >
            <View  style={{...styles.contaniner}}>
              <View style={{...styles.textsView}}>
        <Text style={styles.title} numberOfLines={1}>{itemData.item.endereco}</Text>
        <Text style={styles.title2} numberOfLines={1}>Nº :{itemData.item.numero}</Text>
        <Text>{itemData.item.bairro}  CEP: {itemData.item.cep}</Text>
        <Text>{itemData.item.cidade}</Text>
                </View>
            </View>
          </TouchableOpacity>
        );
      };
 
  const Separator = () => (
    <View style={styles.separator} />
  );
 
  return (
    <Container>
    <Header style={styles.headerContainer}
    placement="center"
    statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
    containerStyle={{ width: '100%', backgroundColor: '#836FFF'}}
    centerComponent={{ text: 'ENDEREÇOS', style: { color: '#fff' } }}
    leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)}/>}
    /> 
    
      <View style={styles.details}>
      <Button
          title="NOVO ENDEREÇO"
          color="gray"
          onPress={() => {
            props.navigation.navigate({
              routeName: 'EnderecoInsert'
            });
          }}
        />
      </View>
      <ScrollView>
                  <FlatList
                    keyExtractor={({ item, index }) => index}
                    data={data.endereco}
                    renderItem={renderGridItem}
                    numColumns={1}
                  />
        </ScrollView>
      
      
    
  </Container>
    
  );
};

Endereco.navigationOptions = (navigationData) => {
//   const catId = navigationData.navigation.getParam('categoryId');
  //const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: "Endereços"
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
    fontSize: 20,
    textAlign: 'center'
  },
  title2: {
    fontSize: 18,
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
  },
  gridItem: {
    flex: 1,
    margin: 20,
    height: 300,
    backgroundColor:"#fff",
    borderRadius:20,
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
  textsView:{
    flex:1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    
    alignItems:'center'
  },
});

export default Endereco;
