import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import iconhome from '../images/home.png';
import iconfav from '../images/fav.png';
import iconcamera from '../images/camera.png';

var {width, height} = require('Dimensions').get('window');

export default class Camera extends Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.judul}>
            This is Camera Page
          </Text>
        </View>

        <Footer >
          <FooterTab style={{backgroundColor:'#BDBDBD',}}>
            <Button  onPress={() => {
              this.props.navigator.push({index:1})
            }}>
              <Image style={{width: 30, height: 30,}} source={iconfav}/>
            </Button>
            <Button onPress={() => {
              this.props.navigator.popToTop()
            }}>
              <Image style={{width: 30, height: 30,}} source={iconhome}/>
            </Button>
            <Button>
              <Image style={{width: 30, height: 30,}} source={iconcamera}/>
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
});
