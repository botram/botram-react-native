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
} from 'react-native';

var {width, height} = require('Dimensions').get('window');

export default class Favorites extends Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.judul}>
            All Favorite Foods
          </Text>
        </View>

        <Footer >
          <FooterTab style={{backgroundColor:'#616161',}}>
            <Button>
              <Text style={styles.txtfooter}>Favorites</Text>
            </Button>
            <Button onPress={() => {
              this.props.navigator.popToTop()
            }}>
              <Text style={styles.txtfooter}>Home</Text>
            </Button>
            <Button onPress={() => {
              this.props.navigator.push({index:2})
            }}>
              <Text style={styles.txtfooter}>Camera</Text>
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
    backgroundColor: '#F5FCFF',
  },
  txtfooter: {
    color: '#FFFFFF',
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
