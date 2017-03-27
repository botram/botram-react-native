import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import FBSDK, { GraphRequest, GraphRequestManager, LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Botram extends Component {

  goToHomeScene = () => {
    this.props.navigator.resetTo({title:'HomeScene'});
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
                  alert('Error fetching data: ' + error.toString());
                } else {
                  const self = this;
                  const user = {
                    email: result.email || '',
                    name: result.name,
                    pic: result.picture.data.url,
                    id_fb: result.id
                  }
                  fetch('http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users', {
                    method: 'POST',
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                  }).then(response => response.json())
                    .then(data => {
                      AsyncStorage.setItem("token", data.token)
                      AsyncStorage.setItem("userId", data.userId)
                      self.goToHomeScene()
                  }).catch(err => console.log(err))
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
          ).catch(err => console.log(err))
        }
      }
      }
      onLogoutFinished={() => alert("See ya")}/>

      </View>
    )
  }
}
