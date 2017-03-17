import React, { Component } from 'react';
import {
  Container,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import {
  BackAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const iconhome = (<Icon name="home" size={30} color="#FFFFFF" />)
const iconcamera = (<Icon name="photo-camera" size={30} color="#FFFFFF" />)
const iconfav = (<Icon name="favorite" size={30} color="#9E9E9E" />)

var {width, height} = require('Dimensions').get('window');

export default class Favorites extends Component {
  render() {
    const appthis = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      appthis.props.navigator.popToTop()
      return true;
    })
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.judul}>
            All Favorite Foods
          </Text>
        </View>

        <Footer >
          <FooterTab style={{backgroundColor:'#E91E63',}}>
            <Button>
              {iconfav}
            </Button>
            <Button onPress={() => {
              this.props.navigator.popToTop()
            }}>
              {iconhome}
            </Button>
            <Button onPress={() => {
              this.props.navigator.push({index:2})
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
