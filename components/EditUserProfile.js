import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, Button, ooter } from 'native-base';
import { StyleSheet, Text, View, Image, TextInput, AsyncStorage, TouchableOpacity, } from 'react-native';

var {width, height} = require('Dimensions').get('window');
const iconBack = (<Icon name="navigate-before" size={30} color="#FFFFFF" style={{padding:10}}/>)

export default class EditUserProfile extends Component {
  constructor(){
    super()
    this.state = {
      name : '',
      profilepicture: 'ava.jpg',
      address: '',
      city: '',
      phone: ''
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userId').then(userId => {
      AsyncStorage.getItem('token').then(token => {
        const link = `http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/${userId}`
        fetch(link, {
          method: 'GET',
          headers: {
            token: token
          }
        })
        .then(res => res.json())
        .then(user => {
          this.setState({
            name: user.name,
            profilepicture: user.pic,
          })
        })
      })
    })
  }
  updateProfile(){
    AsyncStorage.getItem('userId').then(userId => {
      AsyncStorage.getItem('token').then(token => {
        const link = `http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/${userId}`
        fetch(link, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify({
            city: this.state.city,
            address: this.state.address,
            phone: this.state.phone
          })
        })
        .then(res => res.json())
      })
    })
  }

  render() {
    return (
      <Container>
        <View>
          <Row style={{height: 50,backgroundColor:'#B71C1C',}}>
           <Col size={30}>
             <TouchableOpacity  onPress={() => {this.props.navigator.popN(1)}}>
               <Text style={{padding:10,}}>{iconBack}</Text>
             </TouchableOpacity>

           </Col>
           <Col size={70}><Text style={{padding:10,color: '#FFFFFF',fontSize:22, }}>Edit Profile</Text></Col>
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

          <View style={styles.containereditfield}>
            <View style={{marginTop:10,marginBottom:10,width:width/1.2}}>
              <TextInput
                onChangeText={text => this.setState({city:text})}
                placeholder='City' style={styles.txtMenu}/>
              <TextInput
                onChangeText={text => this.setState({address:text})}
                placeholder='Address' style={styles.txtMenu}/>
              <TextInput
                onChangeText={number => {
                  this.setState({phone:number})
                }}
                placeholder='Phone Number' maxLength = {13} keyboardType='numeric' style={styles.txtMenu}/>
            </View>
          </View>

      </Content>
      <Button
        onPress={()=>{
          this.updateProfile()
          this.props.navigator.push({title:'UserProfileScene'})
        }}
        style={{width:width, alignItems: 'center', justifyContent:'center',backgroundColor:'#00B16A'}}>
        <Text style={{color:'#FFFFFF', fontSize:height/35}}>
          UPDATE
        </Text>
      </Button>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
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
  containereditfield: {
    alignItems: 'center',
  },
});
