import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image
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

 _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

 render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center',}} onLayout={this._onLayoutDidChange}>
        <Carousel
          delay={5000}
          style={this.state.size}
          autoplay
          bullets={true}
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
        <Image
          source={require('../images/logo.png')}
          style={{
            position:'absolute',
            width: width/width*200,
            height: width/width*51.5,
            bottom: width + 50,
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
