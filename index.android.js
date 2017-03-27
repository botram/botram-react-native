import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store'

import HomeScene from './components/Home';
import FavoritesScene from './components/Favorites';
import LoginScene from './components/LoginScene';
import UserProfileScene from './components/UserProfile'
import CameraScene from './components/Camera'
import FoodDetails from './components/FoodDetails'
import MenuDrawer from './components/MenuDrawer'
import PostingFoodScene from './components/PostingFood'
import SearchScene from './components/SearchScene';
import YourFoodsScene from './components/YourFoods';
import EditUserProfile from './components/EditUserProfile';

import {
  AppRegistry,
  Navigator,
  BackAndroid,
  AsyncStorage,
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
    else if (route.title === 'CameraScene'){
      return(
        <CameraScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === 'FoodDetails') {
      return (
        <FoodDetails route={route} navigator={navigator} foodId={route.foodId}/>
      )
    }
    else if (route.title === 'UserProfileScene') {
      return (
        <UserProfileScene route={route} navigator={navigator} profile={route.profile} />
      )
    }
    else if (route.title === 'PostingFoodScene') {
      return (
        <PostingFoodScene route={route} navigator={navigator} pathUri={route.uri} />
      )
    }
    else if (route.title === "SearchScene") {
      return (
        <SearchScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === "YourFoodsScene") {
      return (
        <YourFoodsScene route={route} navigator={navigator} />
      )
    }
    else if (route.title === "EditUserProfile") {
      return (
        <EditUserProfile route={route} navigator={navigator} />
      )
    }
  }

  render() {
    const appThis = this

    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{title: 'HomeScene' }}
          renderScene={appThis.renderNewScene}
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FadeAndroid}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Botram', () => Botram);
