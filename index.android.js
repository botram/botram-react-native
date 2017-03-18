import React, { Component } from 'react';
import HomeScene from './components/Home'
import FavoritesScene from './components/Favorites'
import CameraScene from './components/Camera'
import {
  AppRegistry,
  Navigator,
  BackAndroid,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import FBSDK, { GraphRequest, GraphRequestManager, LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Botram extends Component {

  // handlelogin(){
  //   // fbAuth() {
  //     LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
  //       if (result.isCancelled) {
  //         console.log('Login was cancelled');
  //       }
  //       else {
  //         console.log('Login was success ' + result.grantedPermissions.toString());
  //       }
  //     },function(error){
  //       console.log('An error occured: ' + error);
  //     })
  //   // }
  // }


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
    return (
      <View>
        <LoginButton
    onLoginFinished={
      (error, result) => {
        if (error) {
          alert("login has error: " + result.error);
        } else if (result.isCancelled) {
          alert("login is cancelled.");
        } else {

          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken
              alert(accessToken.toString())

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  console.log(result)
                  alert('Success fetching data: ' + result.toString());
                }
              }

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name,birthday,picture'
                    }
                  }
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start()

            }
          )

        }
      }
    }
    onLogoutFinished={() => alert("logout.")}/>

      </View>
      // <Navigator
      //   initialRoute={{index: 0 }}
      //   renderScene={appThis.renderNewScene}
      //   configureScene={(route, routeStack) =>
      //     Navigator.SceneConfigs.FadeAndroid}
      // />
    )
  }
}

AppRegistry.registerComponent('Botram', () => Botram);
