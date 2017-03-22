import React, { Component } from 'react';
import { View, Text, Image, ScrollView,  } from 'react-native';
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Button, Right, Spinner } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialIcons'
import thumb from '../../dummyFiles/thumb.jpg'
import Pic from '../../dummyFiles/image.jpg'
import thumb2 from '../../dummyFiles/thumb2.jpg'
import Pic2 from '../../dummyFiles/image2.jpg'

var {width, height} = require('Dimensions').get('window');

export default class FoodItemCard extends Component {
  constructor(props){
    super(props)
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
                        <Col size={65} style={{marginTop: width/40}}>
                              <Text style={{color:'#b71c1c', fontWeight: 'bold'}}>
                                {data._userId.name}
                              </Text>
                            <Text style={{fontSize: width/35, marginRight: width/80}}>{data._userId.city}</Text>
                          </Col>
                          <Col size={15}>
                            <Text style={{color:'#6C7A89', marginTop: width/20, fontSize: width/27}}>{data._userId.rating.length}/5 <Icon name="star" style={{fontSize: width/25}}/></Text>
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
                             <Button style={{width: width/5, height: height/25, backgroundColor: '#00B16A'}} onPress={() => {
                               this.props.navigator.push({title:'FoodDetails'})
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

  renderLogin(){
    return <Spinner color='red' />
  }
  render(){
    // if(!this.props.data[0]){
    //   console.log("loading");
    // }else{
    //   if(!this.props.data[0]._userId){
    //     console.log("belum siap");
    //   }else{
    //       console.log("ready");
    //   }
    // }

    return(
      this.props.data ? this.renderScene() : this.renderLoading()
    );
    }
}
