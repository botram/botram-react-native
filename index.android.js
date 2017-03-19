import React, { Component } from 'react';

import HomeScene from './components/Home';
import FavoritesScene from './components/Favorites';
import LoginScene from './components/LoginScene';
import PreCameraScene from './components/PreCamera';
import UserProfileScene from './components/UserProfile'
import CameraScene from './components/Camera'
import FoodDetails from './components/FoodDetails'


import {
  AppRegistry,
  Navigator,
  BackAndroid,
} from 'react-native';

export default class Botram extends Component {

  renderNewScene (route, navigator) {
    if (route.index === 0) {
      return(
        <LoginScene route={route} navigator={navigator} />
      )
    }
    else if (route.index === 1) {
      return (
        <HomeScene route={route} navigator={navigator} />
      )
    }
    else if (route.index === 2) {
      return (
        <FavoritesScene route={route} navigator={navigator} />
      )
    }
    else if (route.index === 3) {
      return (
        <PreCameraScene route={route} navigator={navigator} />
      )
    }  
    else if (route.index === 4) {
      return (
        <UserProfileScene route={route} navigator={navigator} />
      )
    }
    else if (route.index === 5) {
      return (
        <FoodDetails route={route} navigator={navigator} />
      )
    }
  }


  render() {
    const appThis = this
    return (
      <Navigator
        initialRoute={{index: 1 }}
        renderScene={appThis.renderNewScene}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FadeAndroid}
      />
    )
  }
}

AppRegistry.registerComponent('Botram', () => Botram);
