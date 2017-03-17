import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const iconhome = (<Icon name="home" size={30} color="#9E9E9E" />)
const iconcamera = (<Icon name="photo-camera" size={30} color="#FFFFFF" />)
const iconfav = (<Icon name="favorite" size={30} color="#FFFFFF" />)

var {width, height} = require('Dimensions').get('window');

export default class Home extends Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.judul}>
            Welcome to Botram
          </Text>
          <Text style={styles.instructions}>
            Sini Makan!
          </Text>

        </View>

        <Footer >
          <FooterTab style={{backgroundColor:'#E91E63',}}>
            <Button onPress={() => {
              this.props.navigator.push({index:1})
            }}>
              {iconfav}
            </Button>
            <Button>
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
