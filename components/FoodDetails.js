import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, CardItem, Thumbnail } from 'native-base';
import { StyleSheet, Text, View, Image, ScrollView, AsyncStorage, TouchableOpacity, } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";

var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="chevron-left" size={30} color="#FFFFFF" />)

export default class FoodDetails extends Component {
  constructor () {
    super()
    this.state = {
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
                      <Col size={80} style={{marginTop: width/40}}>
                        <Text style={{color:'#b71c1c', fontWeight: 'bold'}}>
                          {this.state.name}
                        </Text>
                        <Text style={{fontSize: width/35, marginRight: width/80}}>{this.state.city}</Text>
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
