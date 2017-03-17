import React, { Component } from 'react';
import {
  View,
  BackAndroid,
  StyleSheet,
  Dimensions
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

var {width, height} = require('Dimensions').get('window');

export default class Cam extends Component {
  render() {
    const appthis = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      appthis.props.navigator.popToTop()
      return true;
    })
    return (
      <View style={{width:'100%', height:'100%'}}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Icon name='circle-thin' style={{color:'white', fontSize:85, marginBottom: 25}} onPress={this.takePicture.bind(this)}/>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .then(()=>this.props.navigator.push({index: 0}))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});
