import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { fetchTimeline } from '../action/food_action'
import { connect } from 'react-redux';

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Drawer,
  Button,
} from 'native-base';
import SideBar from './MenuDrawer';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  BackAndroid,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
var {width, height} = require('Dimensions').get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import FoodItemCard from './Home/FoodItemCard'
var {width, height} = require('Dimensions').get('window');
const iconmenu = (<Icon name="menu" size={30} color="#FFFFFF" />)
const iconhome = (<Icon name="home" size={30} color="#b71c1c" />)
const iconcamera = (<Icon name="photo-camera" size={30} color="#6C7A89" />)
const iconfav = (<Icon name="favorite" size={30} color="#6C7A89" />)
const iconSearch = (<Icon name="search" size={30}color="#6C7A89" />)

class Home extends Component {
  constructor () {
    super()
    this.state = {
      klik  : 1,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("token").then(token => {
      if(!token) {
        this.props.navigator.resetTo({title:'LoginScene'});
      } else {
        this.props.fetchTimeline(token)
        }
    })
    .catch(err => console.log(err))
  }

  componentWillReceiveProps(nextProps) {
    const token = AsyncStorage.getItem("token").then(token => {
      if(!token) {
        nextProps.navigator.resetTo({title:'LoginScene'});
      }
    });
  }

  closeDrawer = () => {
    this._drawer._root.close()
  }
  openDrawer = () => {
    this._drawer._root.open()
  }
  handleExitBack(){
    this.setState({
      klik : 2,
    });
    const appthis = this;
    setTimeout(function() { appthis.setState({klik: 1});}.bind(appthis), 2000);
  }
    render() {
      const appthis = this;
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (appthis.state.klik===2) {
          BackAndroid.exitApp()
          return false
        }
        else if (appthis.state.klik===1) {
          appthis.props.navigator.popToTop()
          appthis.handleExitBack()
          return true;
        }
      })
        return (
            <Drawer
              ref={(ref) => { this._drawer = ref; }}
              content={<SideBar navigator={this._navigator} nav={this.props.navigator} />}
              onClose={() => this.closeDrawer()}
              style={{width:100}}
            >

              <Row style={{height: 50,backgroundColor:'#B71C1C',}}>
               <Col size={35}>
                 <TouchableOpacity  onPress={() => {this.openDrawer()}}>
                   <Text style={{padding:10,}}>{iconmenu}</Text>
                 </TouchableOpacity>
               </Col>
               <Col size={65}><Text style={{padding:10,color: '#FFFFFF',fontSize:22, }}>Botram</Text></Col>
              </Row>
              <Container>
                <View style={styles.container}>
                  <FoodItemCard navigator={this.props.navigator} data={this.props.foodList}/>
                </View>

                <Footer >
                  <FooterTab style={{backgroundColor:'#ECECEC',}}>
                    <Button onPress={() => {
                      this.props.navigator.push({title:'FavoritesScene'})
                    }}>
                      {iconfav}
                    </Button>
                    <Button >
                      {iconhome}
                    </Button>
                    <Button onPress={() => {
                      this.props.navigator.push({title:'SearchScene'})
                    }}>
                    {iconSearch}
                    </Button>
                    <Button onPress={() => {
                      this.props.navigator.push({title:'CameraScene'})
                    }}>
                      {iconcamera}
                    </Button>
                  </FooterTab>
                </Footer>
              </Container>
          </Drawer>
        );
    }
}

const mapsStateToProps = (state) =>{
  return {
    foodList: state.foods
  }
}

const mapsDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchTimeline}, dispatch)
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Home)

var styles = StyleSheet.create({
  container: {
    height:height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  judul: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
