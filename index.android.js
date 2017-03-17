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
  }

  render() {
    const appThis = this

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
