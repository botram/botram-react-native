import React, { Component } from 'react';
import {
  View,
  BackAndroid,
} from 'react-native';

var {width, height} = require('Dimensions').get('window');

export default class Camera extends Component {
  render() {
    const appthis = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      appthis.props.navigator.popToTop()
      return true;
    })
    return (
      <View>

      </View>
    );
  }
}
