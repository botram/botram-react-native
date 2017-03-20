import React, { Component } from 'react';
import {View, Text, Image} from 'react-native'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'

export default class PreCam extends Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
      // <Icon2 name='circle-thin'
      //   style={{color:'black', fontSize:85, marginBottom: 25}}
      //   onPress={() => {
      //   this.props.navigator.push({index:3})
      // }}/>
      <View style={{width: '100%', height: '100%'}}>
        {/* <Text>{this.props.pathUri}</Text> */}
        <Image source={{uri: this.props.pathUri}} style={{width: 50, height: 50}}/>
      </View>
    )
  }
}
