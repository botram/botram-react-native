import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Alert, AsyncStorage, } from 'react-native';
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Button, Right } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons'

var {width, height} = require('Dimensions').get('window');

export default class FoodItemCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showhide  : 'Hide',
      activePicture : 1,
      status : 'Available',
      myfood : [],
    }
  }

  componentWillMount() {
    AsyncStorage.getItem("userId").then(userId => {
      AsyncStorage.getItem("token").then(token => {
        if(!token) {
          this.props.navigator.resetTo({title:'LoginScene'});
        } else {
          fetch(`http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/food/byuser/${userId}`, {
            method: 'GET',
            headers: {
              token: token
            }
          })
          .then(res => {
            return res.json()
          })
          .then(data => {
            console.log(data);
            this.setState ({myfood: data })

          }).catch(err => console.log(err))
        }
      })
    })
  }

  // handleStatus(){
  //   if (this.state.showhide==='Hide') {
  //     this.setState({
  //       showhide : 'Show',
  //       activePicture : 0.3,
  //       status : 'Not Available',
  //     })
  //   }
  //   else {
  //     this.setState({
  //       showhide : 'Hide',
  //       activePicture :1,
  //       status : 'Available',
  //     })
  //   }
  //
  // }

  render(){
    return(
      <Container>
        <ScrollView>
          {this.state.myfood.map((data,index) => {
            return (<Content key={index}>

            <Card>
              <CardItem cardBody>
                <Image style={{ opacity:this.state.activePicture, backgroundColor: '#000000', resizeMode: 'cover', width: width, height: height/3 }} source={{uri:data.food_pic}}/>
              </CardItem>
              <CardItem>
                <Grid>
                  <Row style={{marginBottom: height/100}}>
                  <Col size={77}><Text style={{color: '#282828', marginRight: width/100, fontSize: width/22, fontWeight: 'bold'}}>{data.food_title}</Text></Col>
                  <Col size={23}><Text style={{color: '#282828'}}>Rp {data.food_price}</Text></Col>
                  </Row>
                  <Row>
                  <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Stock : {data.food_qty} Pcs</Text></Col>
                  <Col size={23}>
                    <Button
                      onPress={() => Alert.alert(
                        'Confirmation',
                        'Are you sure to delete this item?',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'OK', onPress: () =>{
                              const food = JSON.stringify({_foodId: data._id})

                              AsyncStorage.getItem('token').then(token => {
                                fetch('http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/food',{
                                  method: 'DELETE',
                                  headers: {
                                    token: token
                                  },
                                  body: food
                                }).then(res => {
                                    return res.json()
                                })
                                .then(data => {
                                  console.log(data);
                                })
                                .catch(err => console.log(err))
                              })
                            }
                          },
                        ]
                      )}
                      style={{justifyContent:'center',width: width/5, height: height/25, backgroundColor: '#D50000'}}>
                      <Text style={{color: '#FFFFFF'}}>Delete</Text>
                    </Button>
                   </Col>
                  </Row>
                  <Row style={{marginTop:5}}>
                  <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Status : {data.status === 1 ? 'Available' : 'Not Available'}</Text></Col>
                  <Col size={23}>
                    <Button
                      onPress={() =>
                        {
                          Alert.alert(
                            'Confirmation',
                            'Do you want to re-sell this item?',
                            [
                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                              {text: 'OK', onPress: () => this.handleStatus()},
                            ]
                          )
                        }
                      }
                      style={{justifyContent:'center',width: width/5, height: height/25, backgroundColor: '#00B16A'}}>
                      <Text style={{color: '#FFFFFF'}}>{this.state.showhide}</Text>
                    </Button>
                   </Col>
                  </Row>
                </Grid>
              </CardItem>
            </Card>
          </Content>)

          })}

        </ScrollView>
      </Container>
        );
    }
}
