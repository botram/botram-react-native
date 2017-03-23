import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  AsyncStorage
} from 'react-native';
import {
  H1,
} from 'native-base';
import FbButton from './Login/FbButton'
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');

export default class CarouselExample extends Component {

 constructor(props) {
    super(props);

   this.state = {
      size: { width, height },
    };
  }

  componentDidMount() {
    const token = AsyncStorage.getItem("token").then(token => {
      if(token) {
        this.props.navigator.resetTo({title:'HomeScene'});
      }
    })
  }

  componentWillReceiveProps() {
    const token = AsyncStorage.getItem("token").then(token => {
      if(token) {
        this.props.navigator.resetTo({title:'HomeScene'});
      }
    })
  }

 _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

 render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center',}} onLayout={this._onLayoutDidChange}>
        <Carousel
          delay={4000}
          style={this.state.size}
          autoplay
          bullets={false}
        >
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../images/1.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../images/2.jpg')}
          />
          <Image
            style={{flex: 1, width:'100%', height:'100%'}}
            source={require('../images/3.jpg')}
          />
      </Carousel>

      <View style={{width: width, height: height, backgroundColor: 'rgba(0, 0, 0, .5)', position: 'absolute'}} />
      <Image
        source={require('../images/logo.png')}
        style={{
          position:'absolute',
          width: 200,
          height: 51.5,
          bottom: width,
          flexDirection: 'row'
        }}
      />
      <View style={{
        position: 'absolute',
        width: width,
        bottom: width/3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
          }}>
        <FbButton navigator={this.props.navigator}/>
      </View>
    </View>
  );
  }
}
