import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, } from 'react-native';
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Button, Right } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons'
import thumb from '../../dummyFiles/thumb.jpg'
import Pic from '../../dummyFiles/image.jpg'

var {width, height} = require('Dimensions').get('window');

export default class FoodItemDetails extends Component {
  render(){
    return(
      <Container>
        <ScrollView>
          <Content>
              <Card>
                 <CardItem style={{margin: -3}}>
                    <Grid>
                      <Col size={20}><Thumbnail source={thumb} /></Col>
                    <Col size={65} style={{marginTop: width/40}}>
                          <Text style={{color:'#b71c1c', fontWeight: 'bold'}}>
                            BU TINI
                          </Text>
                        <Text style={{fontSize: width/35, marginRight: width/80}}>Yogyakarta</Text>
                      </Col>
                      <Col size={15}>
                        <Text style={{color:'#6C7A89', marginTop: width/20, fontSize: width/27}}>4/5 <Icon name="star" style={{fontSize: width/25}}/></Text>
                      </Col>
                    </Grid>
                 </CardItem>
                 <CardItem cardBody>
                   <Image style={{ resizeMode: 'cover', width: width, height: height/3 }} source={Pic}/>
                 </CardItem>
                 <CardItem>
                   <Grid>
                     <Row style={styles.rowoption}>
                      <Text style={{color: '#282828', marginRight: width/100, fontSize: width/22, fontWeight: 'bold'}}>Nasi Gudeg Lengkap</Text>
                     </Row>
                     <Row style={styles.rowoption}>
                      <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Stok : 5 Porsi</Text></Col>
                      <Col size={23}><Text style={{color: '#282828'}}>Rp 28.000</Text></Col>
                     </Row>
                     <Row>
                       <Text style={{color: '#282828', marginRight: width/100, fontSize: width/25, fontWeight: 'bold'}}>Deskripsi</Text>
                     </Row>
                     <Row style={styles.rowoption}>
                       <Text style={{color: '#282828', marginRight: width/100, fontSize: width/25, }}>Nasi, Gudeg, Krecek, Tahu Opor, 1 Butir Telur dan 1 potong Ayam Opor</Text>
                     </Row>
                     <Row style={styles.rowoption}>
                       <Text style={styles.tagtext}>#Nasi</Text>
                       <Text style={styles.tagtext}>#Yogya</Text>
                       <Text style={styles.tagtext}>#Enak</Text>
                       <Text style={styles.tagtext}>#Tradisional</Text>
                     </Row>
                     <Row >
                       <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Button
                          style={{
                            width: width/1.12,
                            height: height/22,
                            backgroundColor: '#00B16A',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                          }}>
                          <Text style={{color: '#FFFFFF'}}>Request</Text>
                        </Button>
                       </View>
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

var styles = StyleSheet.create({
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
