import React, { Component } from 'react';
import HomeScene from './components/Home'
import {
  AppRegistry,
  Navigator,
  BackAndroid,
} from 'react-native';

export default class Botram extends Component {
  renderNewScene (route, navigator) {
    if (route.index === 0) {
      return (
        <HomeScene route={route} navigator={navigator} />
      )
    }
    else if (route.index === 1) {
      return (
        <HomeScene route={route} navigator={navigator} />
      )
    }
  }

  render() {
    const appThis = this
    BackAndroid.addEventListener('hardwareBackPress', function() {
      console.log('handle back press');
      return true;
    })
    return (

      <Navigator
        initialRoute={{index: 0 }}
        renderScene={appThis.renderNewScene}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FadeAndroid}
      />
    )
  }
}

AppRegistry.registerComponent('Botram', () => Botram);
