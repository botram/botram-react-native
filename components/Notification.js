import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Tab, Tabs, TabHeading } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="chevron-left" size={30} color="#FFFFFF" />)
import Icon from 'react-native-vector-icons/MaterialIcons';

import OrderNotification from './Notification/OrderNotification';
import RequestNotification from './Notification/RequestNotification';

export default class Notification extends Component {
  render() {
    return (

      <Container>
          <Row style={{height: 50,backgroundColor:'#B71C1C',}}>
            <Col size={30}>
              <TouchableOpacity onPress={() => {
                 this.props.navigator.popToTop()
              }}>
                <Text style={{padding:10,}}>{iconmenu}</Text>
              </TouchableOpacity>
            </Col>
            <Col size={70}><Text style={{padding:10,color: '#FFFFFF',fontSize:22, }}>Notifications</Text></Col>
          </Row>
          <Tabs  >
            <Tab heading={<TabHeading style={{ backgroundColor: '#B71C1C'}}><Text style={{color: '#FFFFFF',fontSize:width/22}}>ORDER</Text></TabHeading>}>
              <OrderNotification />
            </Tab>
            <Tab heading={<TabHeading style={{ backgroundColor: '#B71C1C'}}><Text style={{color: '#FFFFFF',fontSize:width/22}}>REQUEST</Text></TabHeading>}>
              <RequestNotification />
            </Tab>
          </Tabs>
      </Container>
    )
  }
}
