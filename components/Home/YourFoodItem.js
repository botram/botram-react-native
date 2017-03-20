import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Alert, } from 'react-native';
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Button, Right } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons'
import food1 from '../../dummyFiles/food1.jpg'
import food2 from '../../dummyFiles/food2.jpg'
import food3 from '../../dummyFiles/food3.jpg'
import food4 from '../../dummyFiles/food4.jpg'

var {width, height} = require('Dimensions').get('window');

export default class FoodItemCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showhide  : 'Hide',
      activePicture : 1,
      status : 'Available',
    }
  }
  handleStatus(){
    if (this.state.showhide==='Hide') {
      this.setState({
        showhide : 'Show',
        activePicture : 0.3,
        status : 'Not Available',
      })
    }
    else {
      this.setState({
        showhide : 'Hide',
        activePicture :1,
        status : 'Available',
      })
    }

  }
  render(){
    return(
      <Container>
        <ScrollView>
          <Content>
            <Card>
              <CardItem cardBody>
                <Image style={{ opacity:this.state.activePicture, backgroundColor: '#000000', resizeMode: 'cover', width: width, height: height/3 }} source={food1}/>
              </CardItem>
              <CardItem>
                <Grid>
                  <Row style={{marginBottom: height/100}}>
                  <Col size={77}><Text style={{color: '#282828', marginRight: width/100, fontSize: width/22, fontWeight: 'bold'}}>Cilok</Text></Col>
                  <Col size={23}><Text style={{color: '#282828'}}>Rp 15.000</Text></Col>
                  </Row>
                  <Row>
                  <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Stok : 7 Porsi</Text></Col>
                  <Col size={23}>
                    <Button
                      onPress={() => Alert.alert(
                        'Confirmation',
                        'Are you sure to delete this item?',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                      )}
                      style={{justifyContent:'center',width: width/5, height: height/25, backgroundColor: '#D50000'}}>
                      <Text style={{color: '#FFFFFF'}}>Delete</Text>
                    </Button>
                   </Col>
                  </Row>
                  <Row style={{marginTop:5}}>
                  <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Status : {this.state.status}</Text></Col>
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
          </Content>
          <Content>
            <Card>
              <CardItem cardBody>
                <Image style={{ resizeMode: 'cover', width: width, height: height/3 }} source={food4}/>
              </CardItem>
              <CardItem>
                <Grid>
                  <Row style={{marginBottom: height/100}}>
                  <Col size={77}><Text style={{color: '#282828', marginRight: width/100, fontSize: width/22, fontWeight: 'bold'}}>Martabak Telor</Text></Col>
                  <Col size={23}><Text style={{color: '#282828'}}>Rp 30.000</Text></Col>
                  </Row>
                  <Row>
                  <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Stok : 12 Porsi</Text></Col>
                  <Col size={23}>
                    <Button style={{justifyContent:'center',width: width/5, height: height/25, backgroundColor: '#00B16A'}}>
                      <Text style={{color: '#FFFFFF'}}>Edit</Text>
                    </Button>
                   </Col>
                  </Row>
                </Grid>
              </CardItem>
            </Card>
          </Content>
          <Content>
            <Card>
              <CardItem cardBody>
                <Image style={{ resizeMode: 'cover', width: width, height: height/3 }} source={food3}/>
              </CardItem>
              <CardItem>
                <Grid>
                  <Row style={{marginBottom: height/100}}>
                  <Col size={77}><Text style={{color: '#282828', marginRight: width/100, fontSize: width/22, fontWeight: 'bold'}}>Martabak Manis</Text></Col>
                  <Col size={23}><Text style={{color: '#282828'}}>Rp 22.000</Text></Col>
                  </Row>
                  <Row>
                  <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Stok : 10 Porsi</Text></Col>
                  <Col size={23}>
                    <Button style={{justifyContent:'center',width: width/5, height: height/25, backgroundColor: '#00B16A'}}>
                      <Text style={{color: '#FFFFFF'}}>Edit</Text>
                    </Button>
                   </Col>
                  </Row>
                </Grid>
              </CardItem>
            </Card>
          </Content>
        </ScrollView>
      </Container>
        );
    }
}
