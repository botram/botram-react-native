import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Tab, Tabs } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="chevron-left" size={30} color="#FFFFFF" />)
import Icon from 'react-native-vector-icons/MaterialIcons';



export default class Notification extends Component {
  render() {
    // const appthis = this;
    // BackAndroid.addEventListener('hardwareBackPress', function() {
    //   appthis.props.navigator.popToTop()
    //   return true;
    // })
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
            <Tabs >
                <Tab heading="Order">
                  <Text>Text 1</Text>
                </Tab>
                <Tab heading="Request">
                  <Text>Text 2</Text>
                </Tab>
            </Tabs>
            </Container>
    )
  }
}
