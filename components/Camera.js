import React, { Component } from 'react';
import {
  View,
  BackAndroid,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

var {width, height} = require('Dimensions').get('window');

export default class Cam extends Component {
  constructor(props){
    super(props)
    this.state = {
      path: null
    }
  }

  takePicture() {
    this.camera.capture()
    .then((data) => {
        this.setState({path: data.path})
        console.log(this.state.path);
        // console.log(data)
      })
    .then(()=>this.props.navigator.push({title: 'PostingFoodScene', uri: this.state.path}))
    .catch(err => console.error(err));
  }

  renderCamera(){
    return(
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
        >
        <Icon name='circle-thin' style={{color:'white', fontSize:85, marginBottom: 25}} onPress={this.takePicture.bind(this)}/>
      </Camera>
    )
  }

  renderImage(){
    return(
      <View>
        <Image source={{ uri: this.state.path}} style={{flex:1, justifyContent: 'flex-end', alignItems:'center', height: height, width: width}}/>
        <TouchableOpacity onPress={() => this.setState({path:null})}><Text>retake</Text></TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{width:'100%', height:'100%'}}>
        {/* {this.state.path ? this.renderImage() : this.renderCamera()} */}
         {this.renderCamera()}
      </View>
    );
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
