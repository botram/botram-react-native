import React, { Component } from 'react';
import FoodFavoriteItem from './Home/FoodFavoriteItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BackAndroid, StyleSheet, Text, View, } from 'react-native';
import { Container, Footer, FooterTab, Button, } from 'native-base';

const iconhome = (<Icon name="home" size={30} color="#6C7A89" />)
const iconcamera = (<Icon name="photo-camera" size={30} color="#6C7A89" />)
const iconfav = (<Icon name="favorite" size={30} color="#b71c1c" />)
const iconSearch = (<Icon name="search" size={30}color="#6C7A89" />)

var {width, height} = require('Dimensions').get('window');

export default class Favorites extends Component {
  render() {
    const appthis = this;
    return (
      <Container>
        <View style={styles.container}>
          <FoodFavoriteItem/>
        </View>

        <Footer >
          <FooterTab style={{backgroundColor:'#ECECEC',}}>
            <Button>
              {iconfav}
            </Button>
            <Button onPress={() => {
              this.props.navigator.popToTop()
            }}>
              {iconhome}
            </Button>
            <Button onPress={() => {
              this.props.navigator.push({title:'SearchScene'})
            }}>
            {iconSearch}
            </Button>
            <Button onPress={() => {
              this.props.navigator.push({title:'CameraScene'})
            }}>
              {iconcamera}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    height:height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  judul: {
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
