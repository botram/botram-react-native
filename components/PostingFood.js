import React, { Component } from 'react';
import {
  Button,
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
var {width, height} = require('Dimensions').get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import foods from './../dummyFiles/pecel.jpg'
var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="chevron-left" size={30} color="#FFFFFF" />)

export default class PostingFood extends Component {
  constructor(props){
    super(props)

  }
  
    render() {
      return (
        <View>
          <Row style={{height: 50,backgroundColor:'#B71C1C',}}>
           <Col size={25}>
             <TouchableOpacity  onPress={() => {
               this.props.navigator.popToTop()
             }}>
               <Text style={{padding:10,}}>{iconmenu}</Text>
             </TouchableOpacity>
           </Col>
           <Col size={75}><Text style={{padding:10,color: '#FFFFFF',fontSize:22, }}>Post Your Foods</Text></Col>
          </Row>
          <ScrollView>
          <View style={styles.container}>
              <Image style={{ resizeMode: 'cover', width: width, height: height/3 }}source={{uri: this.props.pathUri}}/>
              <View style={{marginTop:10,marginBottom:10,}}>
                <TextInput placeholder='Title' style={styles.txtMenu}/>
                <TextInput placeholder='Price' maxLength = {3} keyboardType='numeric' style={styles.txtMenu}/>
                <TextInput placeholder='Quantity' maxLength = {3} keyboardType='numeric' style={styles.txtMenu}/>
                <TextInput placeholder='Tags (separate by space)' style={styles.txtMenu}/>
                <TextInput placeholder='Description' multiline numberOfLines = {4} style={styles.txtDescription}/>
              </View>
              <View style={{alignItems:'center'}}>
                <Button style={{borderRadius:5, alignItems:'center',justifyContent:'center',width: width/4, height: height/20, backgroundColor: '#00B16A'}}>
                  <Text style={{color:'#FFFFFF'}}>Submit</Text>
                </Button>
              </View>
            </View>
            </ScrollView>
        </View>
      );
    }
}

var styles = StyleSheet.create({
  container: {
    height:height,
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
  txtMenu: {
    height: 40,
    width: width/1.5,
  },
  txtDescription: {
    height: 80,
    width: width/1.5,
  }
});
