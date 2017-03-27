import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';

var {width, height} = require('Dimensions').get('window')
const iconperson = (<Icon name="person" size={20} color="#616161" />)
const iconlogout = (<Icon name="power-settings-new" size={20} color="#616161" />)
const iconfood = (<Icon name="restaurant" size={20} color="#616161" />)
export default class MenuDrawer extends Component {
  constructor(){
    super()
    this.state = {
      user : '',
      name : '',
      token: '',
      profilepicture : 'profilepicture.png',
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userId').then(userId => {
      AsyncStorage.getItem('token').then(token => {
        fetch(`http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/${userId}`, {
          method: 'GET',
          headers: {
            token: token
          }
        })
        .then(res => res.json())
        .then(user => {
          this.setState ({
            name: user.name,
            profilepicture: user.pic,
          })
        }).catch(err => console.log(err))
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avapicture} source={{uri:this.state.profilepicture}} />
          <Text style={styles.nameprofile}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.listmenu}>
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
