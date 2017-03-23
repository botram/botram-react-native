import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons'

var {width, height} = require('Dimensions').get('window');

export default class FoodItemCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      foodId : '',
    }
  }

  renderScene(){
    return (
      <Container>
        <ScrollView>
          {this.props.data.map((data, index) => {
            return(
              <Content key={index}>
                  <Card>
                     <CardItem style={{margin: -3}}>
                        <Grid>
                          <Col size={20}><Thumbnail source={{uri:data._userId.pic}} /></Col>
                          <Col size={80} style={{marginTop: width/40}}>
                            <Text style={{color:'#b71c1c', fontWeight: 'bold'}}>
                              {data._userId.name}
                            </Text>
                            <Text style={{fontSize: width/35, marginRight: width/80}}>{data._userId.city}</Text>
                          </Col>
                        </Grid>
                     </CardItem>
                     <CardItem cardBody>
                       <Image style={{ resizeMode: 'cover', width: width, height: height/3 }} source={{uri:data.food_pic}}/>
                     </CardItem>
                     <CardItem>
                       <Grid>
                         <Row style={{marginBottom: height/100}}>
                          <Col size={77}>
                            <Text style={{color: '#282828', marginRight: width/100, fontSize: width/22, fontWeight: 'bold'}}>
                              {data.food_title}
                            </Text>
                          </Col>
                          <Col size={23}><Text style={{color: '#282828'}}>Rp {data.food_price}</Text></Col>
                         </Row>
                         <Row>
                          <Col size={77}><Text style={{fontSize: width/27, color: '#6C7A89'}}>Qty : {data.food_qty} pcs</Text></Col>
                          <Col size={23}>
                             <Button
                               style={{width: width/5, height: height/25, backgroundColor: '#00B16A'}}
                               onPress={() => {
                                 this.setState({
                                   foodId : data._id,
                                 });
                                 setTimeout(() => {
                                    this.props.navigator.push( {title:'FoodDetails',foodId: this.state.foodId})
                                 }, 100)
                               }}>
                               <Text style={{color: '#FFFFFF'}}>Detail</Text>
                             </Button>
                           </Col>
                         </Row>
                       </Grid>
                     </CardItem>
                 </Card>
              </Content>
            )
          })}
        </ScrollView>
      </Container>
    )
  }

  render(){
    return(
      this.renderScene()
    )
  }
}
