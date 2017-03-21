/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons';
const iconnotif = (<Icon name="notifications" size={20} color="#616161" />)
const iconperson = (<Icon name="person" size={20} color="#616161" />)
const iconlogout = (<Icon name="power-settings-new" size={20} color="#616161" />)
const iconfood = (<Icon name="restaurant" size={20} color="#616161" />)
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import thumb from '../dummyFiles/thumb.jpg'
var {width, height} = require('Dimensions').get('window');

export default class MenuDrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avapicture} source={thumb} />
          <Text style={styles.nameprofile}>
            BU TINI
          </Text>
        </View>
        <View style={styles.listmenu}>
          <Row style={{height: 45,justifyContent: 'center',paddingTop:10,}}>
            <Col size={20}><Text style={styles.menuicon}>{iconnotif}</Text></Col>
            <Col size={80}>
              <TouchableOpacity onPress={() => {
                this.props.nav.push({title:'NotificationScene'})
              }}>
              <Text style={styles.txtmenu}>Notifications</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{height: 45,justifyContent: 'center',paddingTop:10,}}>
            <Col size={20}><Text style={styles.menuicon}>{iconperson}</Text></Col>
            <Col size={80}>
              <TouchableOpacity onPress={() => {
                this.props.nav.push({title:'UserProfileScene'})
              }}>
                <Text style={styles.txtmenu}>Profile</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{height: 45,justifyContent: 'center',paddingTop:10,}}>
            <Col size={20}><Text style={styles.menuicon}>{iconfood}</Text></Col>
            <Col size={80}>

              <TouchableOpacity onPress={() => {
                this.props.nav.push({title:'YourFoodsScene'})
              }}>
                <Text style={styles.txtmenu}>Your Foods</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{height: 45,justifyContent: 'center',paddingTop:10,}}>
            <Col size={20}><Text style={styles.menuicon}>{iconlogout}</Text></Col>
            <Col size={80}>
              <TouchableOpacity onPress = {() => {
                AsyncStorage.removeItem("token")
                this.props.nav.resetTo({title:'LoginScene'})
                AsyncStorage.getItem('token').then(data => console.log(data))
              }}>
                <Text style={styles.txtmenu}>Logout</Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  menuicon: {
    paddingLeft:20,
  },
  txtmenu: {
    fontSize:16,
    color:'#616161'
  },
  header: {
    width:width/1.25,
    height:height/4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#B71C1C',
  },
  avapicture: {
    borderRadius:100,
    width: (width/5),
    height: (width/5),
  },

  nameprofile: {
    fontSize: 14,
    marginTop: 5,
    color:'#FFFFFF',
  },
});
