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
  AsyncStorage,
} from 'react-native'
var {width, height} = require('Dimensions').get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import foods from './../dummyFiles/pecel.jpg'
var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="chevron-left" size={30} color="#FFFFFF" />)

export default class PostingFood extends Component {
  constructor(props){
    super(props)
    this.state={
      myKey:'',
    }
  }

    upload() {
      const file = {
        uri: this.props.pathUri,
        name: 'botram' + new Date() + '.jpg',
        type: 'image/jpeg'
      };
      const options = {
        keyPrefix: 'foods/',
        bucket: 'botram',
        region: 'ap-southeast-1',
        accessKey: 'AKIAJYWMHRSF565RIIYQ',
        secretKey: '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',
        successActionStatus: 201
      };
      RNS3.put(file, options).then(response => {
        if (response.status !== 201) {
          throw new Error('Failed to upload image to S3', response);
        }
        console.log('*** BODY ***', response.body);
      });

        .catch(err => console.error(err));
    }
  // componentDidMount() {
    // AsyncStorage.getItem("myKey").then((value) => {
    //   this.setState({"myKey": value});
    // }).done();
  // }
  //
  // saveData(value) {
  //   AsyncStorage.setItem("myKey", value);
  //   this.setState({"myKey": value});
  //   console.log(AsyncStorage);
  //   console.log(this.state.myKey);
  // }

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
                <TextInput
                  onChangeText={(text) => this.saveData(text)}
                  placeholder='Title' style={styles.txtMenu}/>
                <TextInput placeholder='Price' maxLength = {3} keyboardType='numeric' style={styles.txtMenu}/>
                <TextInput placeholder='Quantity' maxLength = {3} keyboardType='numeric' style={styles.txtMenu}/>
                <TextInput placeholder='Tags (separate by space)' style={styles.txtMenu}/>
                <TextInput placeholder='Description' multiline numberOfLines = {4} style={styles.txtDescription}/>
              </View>
              <View style={{alignItems:'center'}}>
                <Button onPress={this.upload()} style={{borderRadius:5, alignItems:'center',justifyContent:'center',width: width/4, height: height/20, backgroundColor: '#00B16A'}}>
                  <Text style={{color:'#FFFFFF'}}>Submit</Text>
                </Button>
              </View>
            </View>
            </ScrollView>
        </View>
      );
      // console.log('');
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
