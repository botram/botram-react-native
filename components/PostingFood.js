import React, { Component } from 'react';
import { fetchTimeline } from '../action/food_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button, Spinner
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

import config from '../config'

class PostingFood extends Component {
  constructor(props){
    super(props)
    this.state={
      'foodId':'',
      'title':'',
      'price':'',
      'quantity':'',
      'tags':'',
      'description':'',
      'pic': 'https://s3-ap-southeast-1.amazonaws.com/botram/foods/default-thumbnail.jpg',
      'userId': '',
      'submitLoading': false,
    }
  }
  //
  // componentDidMount(){
  //   AsyncStorage.getItem("token").then(token => {
  //     if(!token) {
  //       this.props.navigator.resetTo({title:'LoginScene'});
  //     } else {
  //       }
  //   })
  //   .catch(err => console.log(err))
  // }

  postFood(cbUpload, cbRedirect) {
    const self = this
    self.setState({
      submitLoading: true,
    });
    AsyncStorage.getItem('userId').then(userId => {
      AsyncStorage.getItem('token').then(token => {
        // this.props.postFood(token, userId, self, cbUpload, cbRedirect)
      fetch('http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/food', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({
          food_title: self.state.title,
          food_pic: self.state.pic,
          food_price: self.state.price,
          food_qty: self.state.quantity,
          food_desc: self.state.description,
          food_tags: self.state.tags,
          _userId: userId
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data._id);
          self.setState({userId: data._id})
          console.log(self.state.userId);
          setTimeout(() => cbUpload(self, data._id), 2000)
          cbRedirect()
        })
      })
    })
  }

    upload(self, foodId) {
      // const self = this;
      console.log(self.props);
      console.log('MASUK UPLOAD DEPAN');
      console.log(foodId);
      const file = {
        uri: self.props.pathUri,
        name: 'food' + Date.now() + '.jpg',
        type: 'image/jpeg'
      };
      self.setState({pic:'https://s3-ap-southeast-1.amazonaws.com/botram-bucket/foods/food' + Date.now() + '.jpg'})
      console.log(foodId);
      console.log('MASUK UPLOAD BELAKANG');
      console.log(self.state.pic);
      const options = {
        keyPrefix: config.KEYPREFIX,
        bucket: config.BUCKET,
        region: config.REGION,
        accessKey: config.ACCESSKEY,
        secretKey: config.SECRETKEY,
        successActionStatus: 201
      };
      RNS3.put(file, options).then(response => {
        if (response.status !== 201) {
          throw new Error('Failed to upload image to S3', response);
        }
        // console.log('*** BODY ***', response.body);
        // console.log(response);
          AsyncStorage.getItem('token').then(token => {
            fetch(`http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/food/edit`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
              },
              body: JSON.stringify({
                _foodId: foodId,
                food_pic: self.state.pic
              })
            }).then(res => { res.json(); self.props.fetchTimeline(token) })
        })
      })
        .catch(err => console.log(err));
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
          <View style={{height:height/1.25}}>
          <ScrollView>
            <View style={styles.container}>
              {/* <Image style={{ resizeMode: 'cover', width: width, height: height/3 }}source={foods}/> */}
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
            </ScrollView>
          </View>
            <Button onPress={
                ()=> {
                  // this.upload(this.postFood, () => this.props.navigator.resetTo({title:'HomeScene'}))
                  this.postFood(this.upload, () => this.props.navigator.resetTo({title:'HomeScene'}))
                }
              } style={{ width:width, alignItems: 'center', justifyContent:'center',backgroundColor:'#00B16A'}}>
              {!this.state.submitLoading ? <Text style={{color:'#FFFFFF',fontSize:height/35}}>SUBMIT</Text> : <Spinner color='white' />}

            </Button>
        </View>
      );
    }
}

// const mapsStateToProps = () => {
//   return {
//     postFood: .
//   }
// }

const mapsDispatchToProps = dispatch => {
  return bindActionCreators({fetchTimeline}, dispatch)
}

export default connect(null, mapsDispatchToProps)(PostingFood)

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
