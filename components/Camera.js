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
          <FooterTab style={{backgroundColor:'#616161',}}>
            <Button  onPress={() => {
              this.props.navigator.push({index:1})
            }}>
              <Text style={styles.txtfooter}>Favorites</Text>
            </Button>
            <Button onPress={() => {
              this.props.navigator.popToTop()
            }}>
              <Text style={styles.txtfooter}>Home</Text>
            </Button>
            <Button>
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
});
