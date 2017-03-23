import React, { Component } from 'react';
import {


  Footer,
  FooterTab,
  Drawer,
  Button,
  Container, Content, Card, CardItem, Left, Body, Thumbnail, Right
} from 'native-base';
import thumb from './../dummyFiles/thumb.jpg'
import Pic from './../dummyFiles/image.jpg'
import SideBar from './MenuDrawer';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  Alert,
  Text,
  View,
  Image,
  ToastAndroid,
  ScrollView,
  BackAndroid,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
var {width, height} = require('Dimensions').get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="chevron-left" size={30} color="#FFFFFF" />)

export default class FoodDetails extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      food_pic: '',
      food_title: '',
      food_tags: [],
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      const consol = `http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/food/${this.props.foodId}`;
      fetch(consol, {
        method: 'GET',
        headers: {
          token: token
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState ({
          name: data._userId.name,
          city: data._userId.city,
          address: data._userId.address,
          pic: data._userId.pic,
          rating: data._userId.rating,
          food_pic: data.food_pic,
          food_title: data.food_title,
          food_price: data.food_price,
          food_qty: data.food_qty,
          food_desc: data.food_desc,
          food_tags: data.food_tags,
        })
      }).catch(err => console.log(err))
    })
  }

  render() {
    return (
      <Container>
        <Row style={{height: 50,backgroundColor:'#B71C1C',}}>
         <Col size={30}>
           <TouchableOpacity  onPress={() => {
             this.props.navigator.popToTop()
           }}>
             <Text style={{padding:10,}}>{iconmenu}</Text>
           </TouchableOpacity>
         </Col>
         <Col size={70}><Text style={{padding:10,color: '#FFFFFF',fontSize:22, }}>Food Details</Text></Col>
        </Row>
        <View style={styles.container}>
          <Container>
            <ScrollView>
              <Content>
                 <CardItem style={{margin: -3}}>
                    <Grid>
                      <Col size={20}><Thumbnail source={{uri:this.state.pic}} /></Col>
                      <Col size={65} style={{marginTop: width/40}}>
                        <Text style={{color:'#b71c1c', fontWeight: 'bold'}}>
                          {this.state.name}
                        </Text>
                        <Text style={{fontSize: width/35, marginRight: width/80}}>{this.state.city}</Text>
                      </Col>
                      <Col size={15}>
                        <Text style={{color:'#6C7A89', marginTop: width/20, fontSize: width/27}}>{this.state.rating}/5 <Icon name="star" style={{fontSize: width/25}}/></Text>
                      </Col>
                    </Grid>
                 </CardItem>
                 <CardItem cardBody>
                   <Image style={{ resizeMode: 'cover', width: width, height: height/3 }} source={{uri:this.state.food_pic}}/>
                 </CardItem>
                 <CardItem>
                   <Grid>
                     <Row style={styles.rowoption}>
                      <Text style={{color: '#282828', marginRight: width/100, fontSize: width/22, fontWeight: 'bold'}}>{this.state.food_title}</Text>
                     </Row>
                     <Row style={styles.rowoption}>
                      <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Stok : {this.state.food_qty} Porsi</Text></Col>
                      <Col size={23}><Text style={{color: '#282828'}}>Rp {this.state.food_price}</Text></Col>
                     </Row>
                     <Row>
                       <Text style={{color: '#282828', marginRight: width/100, fontSize: width/25, fontWeight: 'bold'}}>Alamat</Text>
                     </Row>
                     <Row style={styles.rowoption}>
                       <Text style={{color: '#282828', marginRight: width/100, fontSize: width/25, }}>{this.state.address}</Text>
                     </Row>
                     <Row>
                       <Text style={{color: '#282828', marginRight: width/100, fontSize: width/25, fontWeight: 'bold'}}>Deskripsi</Text>
                     </Row>
                     <Row style={styles.rowoption}>
                       <Text style={{color: '#282828', marginRight: width/100, fontSize: width/25, }}>{this.state.food_desc}</Text>
                     </Row>
                     <Row style={styles.rowoption}>
                       {this.state.food_tags.map((data,index) => {
                         return <Text key={index} style={styles.tagtext}>#{data}</Text>
                       })}
                     </Row>
                   </Grid>
                 </CardItem>
              </Content>
            </ScrollView>
            <Button
              onPress={() => Alert.alert(
                'Confirmation',
                'Are you sure to request this item?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
              )}
              style={{ width:width, alignItems: 'center', justifyContent:'center',backgroundColor:'#00B16A'}}>
              <Text style={{color:'#FFFFFF', fontSize:height/35}}>
                REQUEST
              </Text>
            </Button>
          </Container>
        </View>
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
  rowoption: {
    marginBottom: height/85,
  },
  tagtext: {
    backgroundColor: '#E0E0E0',
    color: '#000000',
    padding: 7,
    marginRight: 5,
    borderRadius: 5,
  },
});
