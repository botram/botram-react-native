import React, { Component } from 'react';
import FBSDK, { GraphRequest, GraphRequestManager, LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import { View, AsyncStorage } from 'react-native';

export default class Botram extends Component {

  goToHomeScene = () => {
    console.log('masuk reset to');
    this.props.navigator.resetTo({title:'HomeScene'});
  }

  postUserData = () => {
    }

  render(){
    return(
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
              this.goToHomeScene()
              let accessToken = data.accessToken

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  console.log(result.picture.data.url);
                  const self = this;
                  fetch('http://botram-api-production.ap-southeast-1.elasticbeanstalk.com/users', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: result.email || '',
                      name: result.name,
                      pic: result.picture.data.url || 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
                      id_fb: result.id
                    })
                  }).then((response) => {
                    return response.json()
                  }).then(data => {
                    AsyncStorage.setItem("token", data)

                    AsyncStorage.getItem("token").then(value => console.log(value));
                    self.goToHomeScene()
                  })
                  .catch(err => console.log(err))
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

              new GraphRequestManager().addRequest(infoRequest).start()
            }
          )
        }
      }
      }
      onLogoutFinished={() => alert("See ya")}/>

      </View>
    )
  }
}
