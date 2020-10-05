
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';


const Headerx = ({ title }) => {
  return (
      
    <Header style={styles.headerContainer}
    placement="center"
    statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
    containerStyle={{ width: '100%', backgroundColor: '#836FFF'}}
    centerComponent={{ text: title, style: { color: '#fff' } }}
    leftComponent={<Ionicons name="md-arrow-round-back" size={25} color="white" onPress={() => props.navigation.goBack(null)}/>}

    />
  );
}

const styles = StyleSheet.create({
    headerContainer: {
      height: Platform.select({
          android: 56,
          default: 44,
        }),
    },
  });
export default Headerx