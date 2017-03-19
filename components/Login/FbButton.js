import React, { Component } from 'react';
import FBSDK, { GraphRequest, GraphRequestManager, LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import { View } from 'react-native';

export default class FbButton extends Component {

  goToHomeScene = () => this.props.navigator.resetTo({title:'HomeScene'})

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
              // alert(accessToken.toString())

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  console.log(result)
                  this.goToHomeScene()
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
      onLogoutFinished={() => alert("See ya")}/>

      </View>
    )
  }
}
