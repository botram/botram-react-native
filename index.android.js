import React, { Component } from 'react';
import HomeScene from './components/Home'
import FavoritesScene from './components/Favorites'
import CameraScene from './components/Camera'
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
        <FavoritesScene route={route} navigator={navigator} />
      )
    }
    else if (route.index === 2) {
      return (
        <CameraScene route={route} navigator={navigator} />
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
