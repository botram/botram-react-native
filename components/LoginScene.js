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

var {width, height} = require('Dimensions').get('window');

export default class Login extends Component {
  render() {
    return (
      <Container>
          <View style={styles.container}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>
                Logo Botram
              </Text>
            </View>

            <View style={styles.button}>
              <Button primary onPress={() => {
                this.props.navigator.push({index:1})
              }}>
                <Text>
                  button fb
                </Text>
              </Button>
              <Button warning onPress={() => {
                this.props.navigator.push({index:1})
              }}>
                <Text>
                  button google
                </Text>
              </Button>
            </View>
          </View>
      </Container>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#b71c1c',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    marginTop:height/8,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 30
  },
  button: {
    margin:height/80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})
