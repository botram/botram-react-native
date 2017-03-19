import React, { Component } from 'react';

import HomeScene from './components/Home';
import FavoritesScene from './components/Favorites';
import LoginScene from './components/LoginScene';
import PreCameraScene from './components/PreCamera';
import UserProfileScene from './components/UserProfile';
import CameraScene from './components/Camera';
import FoodDetails from './components/FoodDetails';
import MenuDrawer from './components/MenuDrawer';
import SearchScene from './components/SearchScene';


import {
  AppRegistry,
  Navigator,
  BackAndroid,
} from 'react-native';

export default class Botram extends Component {

  renderNewScene (route, navigator) {
    if (route.title === 'LoginScene') {
      return(
        <LoginScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === 'HomeScene') {
      return (
        <HomeScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === 'FavoritesScene') {
      return (
        <FavoritesScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === 'PreCameraScene') {
      return (
        <PreCameraScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === 'FoodDetails') {
      return (
        <FoodDetails route={route} navigator={navigator} />
      )
    }
    else if (route.title === 'UserProfileScene') {
      return (
        <UserProfileScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === "SearchScene")
      return (
        <SearchScene route={route} navigator={navigator} />
      )
  }


  render() {
    const appThis = this
    return (
      <Navigator
        initialRoute={{title: 'LoginScene' }}
        renderScene={appThis.renderNewScene}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FadeAndroid}
      />
    )
  }
}

AppRegistry.registerComponent('Botram', () => Botram);
