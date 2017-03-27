import React, { Component } from 'react';
import FoodItemCard from './Home/FoodItemCard'
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Button, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity, } from 'react-native';

var {width, height} = require('Dimensions').get('window');
const iconBack = (<Icon name="navigate-before" size={30} color="#FFFFFF" style={{padding:10}}/>)

export default class UserProfile extends Component {
  constructor(){
    super()
    this.state = {
      user : '',
      name : '',
      profilepicture : 'ava.png',
      address : '',
      phone: ''
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userId').then(data => {
      AsyncStorage.getItem('token').then(token => {
        this.setState({
          user:data
        })
        fetch(`http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/${data}`,{
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
          city: user.city || 'please update your city',
          address: user.address || 'please update your address',
          phone: user.phone || 'please update your phone'
         })
       })
      })
    })
  }
  render() {
    return (
      <Container>
        <View>
          <Row style={{height: 50,backgroundColor:'#B71C1C',}}>
           <Col size={32}>
             <TouchableOpacity  onPress={() => {this.props.navigator.popToTop()}}>
               <Text style={{padding:10,}}>{iconBack}</Text>
             </TouchableOpacity>
           </Col>
           <Col size={68}><Text style={{padding:10,color: '#FFFFFF',fontSize:22, }}>My Profile</Text></Col>
          </Row>
        </View>
        <Content>
          <View style={styles.profileHead}>
            <Image source={{uri:this.state.profilepicture}} style={{ resizeMode: 'cover', width: width/3, height: height/5, margin: height/30, borderRadius: 100}}/>
          </View>
          <View style={styles.profileBottom}>
            <Text style={{marginTop: height/30, fontSize: height/21, color: '#bf4d4d'}}>
              {this.state.name}
            </Text>
          </View>
          <View style={styles.profileDetail}>
            <Text style={{marginTop: height/50, fontSize: height/40}}>
              <Icon name='location-city' size={20} color={'#bf4d4d'} />
              {this.state.city}
            </Text>
            <Text style={{marginTop: height/50, fontSize: height/40}}>
              <Icon name='location-on' size={20} color={'#bf4d4d'} />
              {this.state.address}
            </Text>
            <Text style={{marginTop: height/50, fontSize: height/40}}>
              <Icon name='phone-iphone' size={20} color={'#bf4d4d'} style={{alignItems:'center'}} />
              {this.state.phone}
            </Text>
        </View>
      </Content>
      <Button
        onPress={() => {this.props.navigator.push({title:'EditUserProfile'})}}
        style={{width:width, alignItems: 'center', justifyContent:'center',backgroundColor:'#00B16A'}}>
        <Text style={{color:'#FFFFFF', fontSize:height/35}}>
          UPDATE PROFILE
        </Text>
      </Button>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  profile: {
    flex: 1,
    height:height,
  },
  profileHead: {
    height:height/3.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2C3E50'
  },
  profileBottom: {
    height:height/6,
    marginLeft: width/18,
    marginRight: width/18,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileDetail: {
    height:height/3,
    marginLeft: width/18,
    marginRight: width/18,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
