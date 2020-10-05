import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Alert } from 'react-native';
import { Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Container } from 'native-base';
import DatePicker from 'react-native-datepicker'

//import { ScrollView } from 'react-native-gesture-handler';

const FilterScreen = props => {
  const catId = props.navigation.getParam('categoryId');
  var date = new Date().getDate();
  var month = new Date().getMonth()
  var year = new Date().getFullYear();
  var monthMax = month + 1;
  var monthMaxDate = monthMax + 1;
  const Separator = () => (
    <View style={styles.separator} />
  );
 
  //const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return (
    <Container>
    <Header style={styles.headerContainer}
    placement="center"
    statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
    containerStyle={{ width: '100%', backgroundColor: '#836FFF'}}
    centerComponent={{ text: 'Agendamento - ' + catId.nomeFantasia, style: { color: '#fff' } }}
    leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)}/>}
    /> 
      <View style={styles.details}>
        <DatePicker
          style={{width: 250, textAlign:'center'}}
          //date={this.state.date}
          mode="date"
          placeholder="Selecione uma data para Agendamento"
          format="YYYY-MM-DD"
          minDate= {year + '-' + monthMax + '-' + date}
          maxDate={year + '-' + monthMaxDate + '-' + date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          //onDateChange={(date) => {this.setState({date: date})}}
        />
      </View>
      <Button
          title="AGENDAR SERVIÇO"
          color="#836FFF"
          onPress={() => {
            props.navigation.navigate({
              routeName: 'Card', params: {
                categoryId: catId
              }
            });
          }}
        />
    
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
