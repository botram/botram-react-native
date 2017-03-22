import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Footer
} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


import Icon from 'react-native-vector-icons/MaterialIcons';

import FoodItemCard from './Home/FoodItemCard'

var {width, height} = require('Dimensions').get('window');

const iconhome = (<Icon name="home" size={30} color="#b71c1c" />)
const iconcamera = (<Icon name="photo-camera" size={30} color="#6C7A89" />)
const iconfav = (<Icon name="favorite" size={30} color="#6C7A89" />)
const iconBack = (<Icon name="navigate-before" size={30} color="#FFFFFF" style={{padding:10}}/>)

export default class UserProfile extends Component {
  constructor(){
    super()
    this.state = {
      user : '',
      name : '',
      profilepicture : '../images/ava.png',
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userId').then(data => {
      this.setState({
        user:data
      })
      fetch(`http://botram-api-production.ap-southeast-1.elasticbeanstalk.com/users/${data}`)
      .then(res => res.json())
      .then(user => {
        console.log(user);
        this.setState ({
        name: user.name,
        profilepicture: user.pic,
       })
     })
    });
  }
  render() {
    return (
      <Container>
        <View>
          <Row style={{height: 50,backgroundColor:'#B71C1C',}}>
           <Col size={23}>
             <TouchableOpacity  onPress={() => {this.props.navigator.popToTop()}}>
               <Text style={{padding:10,}}>{iconBack}</Text>
             </TouchableOpacity>

           </Col>
           <Col size={77}><Text style={{padding:10,color: '#FFFFFF',fontSize:22, }}>Edit User Profile</Text></Col>
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
            <Text style={{color:'#6C7A89', marginTop: width/45, fontSize: width/25}}>4/5 <Icon name="star" style={{fontSize: width/25}}/></Text>
          </View>
          {/* <View style={styles.profileDetail}>
            <Text style={{marginTop: height/50, fontSize: height/40}}>
              <Icon name='location-on' size={20} color={'#bf4d4d'} />
              Jalan raya kemang deket rumah gana
            </Text>
            <Text style={{marginTop: height/50, fontSize: height/40}}>
              <Icon name='phone-iphone' size={20} color={'#bf4d4d'} style={{alignItems:'center'}} />
              08123456789
            </Text>
        </View> */}
        <View style={styles.container}>
            {/* <Image style={{ resizeMode: 'cover', width: width, height: height/3 }}source={{uri: this.props.pathUri}}/> */}
            <View style={{marginTop:10,marginBottom:10,}}>
              <TextInput
                onChangeText={(text) => this.setState({title:text})}
                placeholder='Title' style={styles.txtMenu}/>
              <TextInput
                onChangeText={(text) => this.setState({price:text})}
                placeholder='Price' maxLength = {10} keyboardType='numeric' style={styles.txtMenu}/>
              {/* <TextInput
                onChangeText={(text) => this.setState({quantity:text})}
                placeholder='Quantity' maxLength = {3} keyboardType='numeric' style={styles.txtMenu}/>
              <TextInput
                onChangeText={(text) => this.setState({tags:text})}
                placeholder='Tags (separate by space)' style={styles.txtMenu}/>
              <TextInput
                onChangeText={(text) => this.setState({description:text})}
                placeholder='Description' multiline numberOfLines = {4} style={styles.txtDescription}/> */}
            </View>
            {/* <View style={{alignItems:'center'}}>
              <Button onPress={
                  ()=> {
                    this.upload(this.postFood, () => this.props.navigator.resetTo({title:'HomeScene'}))
                  }
                } style={{borderRadius:5, alignItems:'center',justifyContent:'center',width: width/4, height: height/20, backgroundColor: '#00B16A'}}>
                <Text style={{color:'#FFFFFF'}}>Submit</Text>
              </Button>
            </View> */}
          </View>

      </Content>
      <Button style={{width:width, alignItems: 'center', justifyContent:'center',backgroundColor:'#00B16A'}}>
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
  buttonUpdate: {
    // height:height/4,
    // margin: width/40,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
});
