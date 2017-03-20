import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Text } from 'react-native';
import { Button, Card, CardItem, Content, Container } from 'native-base';

var {width, height} = require('Dimensions').get('window');


export default class Request extends Component {
  render() {
    // const appthis = this;
    // BackAndroid.addEventListener('hardwareBackPress', function() {
    //   appthis.props.navigator.popToTop()
    //   return true;
    // })
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
                <Col size={75}>
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
                <Col size={25} style={{justifyContent:'center'}}>
                  <Text style={{color:'#00B16A'}}>ACCEPTED</Text>
                </Col>
              </Row>
            </Col>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
            <Col>
              <Row>
                <Text style={{color:'#282828', fontSize: height/35, fontWeight: 'bold'}}>
                  NASI BAKAR
                </Text>
              </Row>
              <Row>
                <Col size={75}>
                  <Row>
                        <Text>
                          Qty : 1
                        </Text>
                  </Row>
                  <Row>
                    <Text>
                      Total : Rp 40.000
                    </Text>
                  </Row>
                </Col>
                <Col size={25} style={{justifyContent:'center'}}>
                  <Text style={{color:'#b71c1c'}}>DECLINED</Text>
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
