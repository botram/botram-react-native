import React, { Component } from 'react';
import FBSDK, { GraphRequest, GraphRequestManager, LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import { View, AsyncStorage } from 'react-native';

export default class Botram extends Component {

  goToHomeScene = () => {
    // console.log('masuk reset to');
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
                  const self = this;
                  const user = {
                    email: result.email || '',
                    name: result.name,
                    pic: result.picture.data.url,
                    id_fb: result.id
                  }
                  console.log(JSON.stringify(user));
                  fetch('http://botram-api-production.ap-southeast-1.elasticbeanstalk.com/api/users', {
                    method: 'POST',
                    headers: {
                      // 'Accept': 'application/json',
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(user)
                  }).then((response) => {

                    console.log(response);
                    return response.json()
                  }).then(data => {
                    console.log(data)
                    AsyncStorage.setItem("token", data.token)
                    AsyncStorage.setItem("userId", data.userId)
                    // console.log(data);
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
