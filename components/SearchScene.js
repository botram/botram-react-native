import React, { Component } from 'react';
import { Container, Content, Header, Item, Input, Button, Footer, FooterTab } from 'native-base';
import {
  BackAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const iconhome = (<Icon name="home" size={30} color="#6C7A89" />)
const iconcamera = (<Icon name="photo-camera" size={30} color="#6C7A89" />)
const iconfav = (<Icon name="favorite" size={30} color="#6C7A89" />)
const iconSearch = (<Icon name="search" size={30}color="#b71c1c" />)

var {width, height} = require('Dimensions').get('window');

export default class Search extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#B71C1C'}}>

            <Item>
                <Icon name="search" color={'#B71C1C'} size={25}/>
                <Input placeholder="Search" />
            </Item>
            <Button transparent>
              <Text style={{color: '#B71C1C'}}>Search</Text>
            </Button>
        </Header>

        <Content>

        </Content>

        <Footer style={{position: 'absolute', bottom:0, left: 0, right: 0}}>
          <FooterTab style={{backgroundColor:'#ECECEC'}}>
            <Button onPress={() => {
              this.props.navigator.push({title:'FavoritesScene'})
            }}>
              {iconfav}
            </Button>
            <Button onPress={() => {
              this.props.navigator.popToTop()
            }}>
              {iconhome}
            </Button>
            <Button>
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
