import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Text } from 'react-native';
import { Button, Card, CardItem, Content, Container } from 'native-base';

var {width, height} = require('Dimensions').get('window');


export default class Order extends Component {
  constructor(){
    super()
    this.state={
      
    }

  }
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
            <Col>
              <Row>
                <Text style={{color:'#282828', fontSize: height/35, fontWeight: 'bold'}}>
                  NASI GUDEG LENGKAP
                </Text>
              </Row>
              <Row>
                <Col size={80}>
                  <Row>
                    <Text>
                      Buyer : Bu Juju
                    </Text>
                  </Row>
                  <Row>
                        <Text>
                          Qty : 2
                        </Text>
                  </Row>
                  <Row>
                    <Text>
                      Total : Rp 50.000
                    </Text>
                  </Row>
                </Col>
                <Col size={20} style={{justifyContent:'center'}}>
                  <Row>
                    <Button style={{backgroundColor: '#00B16A', height:height/20, width:width/6, justifyContent:'center', marginBottom: height/80}}>
                      <Icon name='check' style={{color: '#FFFFFF', fontSize: height/25}}/>
                    </Button>
                  </Row>
                  <Row>
                    <Button style={{backgroundColor: '#b71c1c', height:height/20, width:width/6, justifyContent:'center'}}>
                      <Icon name='close' style={{color: '#FFFFFF', fontSize: height/25}}/>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Col>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
