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
import { RNS3 } from 'react-native-aws3';
var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="chevron-left" size={30} color="#FFFFFF" />)

export default class PostingFood extends Component {
  constructor(props){
    super(props)
    this.state={
      'title':'',
      'price':'',
      'quantity':'',
      'tags':'',
      'description':'',
      'pic': '',
      'userId': ''
    }
  }

    upload(cb, cb2) {
      const file = {
        uri: this.props.pathUri,
        name: 'food' + Date.now() + '.jpg',
        type: 'image/jpeg'
      };
      this.setState({pic:'https://s3-ap-southeast-1.amazonaws.com/botram/foods/food' + Date.now() + '.jpg'})
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
        cb(cb2);
        console.log('*** BODY ***', response.body);
      })
        .catch(err => console.error(err));
    }

    postFood(cb2) {
      const self = this
      console.log(self)
      AsyncStorage.getItem('userId').then(data => this.setState({userId: data}))
      fetch('http://botram-api-production.ap-southeast-1.elasticbeanstalk.com/users/food', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          food_title: self.state.title,
          food_pic: self.state.pic,
          food_price: self.state.price,
          food_qty: self.state.quantity,
          food_desc: self.state.description,
          food_tags: self.state.tags,
          _userId: self.state.userId
        })
      }).then(res => res.json).then(data => cb2)
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
            <View style={{height:height/1.25}}>
              <Image style={{ resizeMode: 'cover', width: width, height: height/3 }}source={{uri: this.props.pathUri}}/>
              <View style={{marginTop:10,marginBottom:10,}}>
                <TextInput
                  onChangeText={(text) => this.setState({title:text})}
                  placeholder='Title' style={styles.txtMenu}/>
                <TextInput
                  onChangeText={(text) => this.setState({price:text})}
                  placeholder='Price' maxLength = {10} keyboardType='numeric' style={styles.txtMenu}/>
                <TextInput
                  onChangeText={(text) => this.setState({quantity:text})}
                  placeholder='Quantity' maxLength = {3} keyboardType='numeric' style={styles.txtMenu}/>
                <TextInput
                  onChangeText={(text) => this.setState({tags:text})}
                  placeholder='Tags (separate by space)' style={styles.txtMenu}/>
                <TextInput
                  onChangeText={(text) => this.setState({description:text})}
                  placeholder='Description' multiline numberOfLines = {4} style={styles.txtDescription}/>
                </View>
              </View>
              <View style={{alignItems:'center', }}>
                <Button
                  onPress={()=> {this.upload(this.postFood, () => this.props.navigator.resetTo({title:'HomeScene'}))}}
                  style={{ width:width, alignItems: 'center', justifyContent:'center',backgroundColor:'#00B16A'}}>
                  <Text style={{color:'#FFFFFF', fontSize:height/35}}>
                    SUBMIT
                  </Text>
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
