import React, { Component } from 'react';
import FBSDK, { GraphRequest, GraphRequestManager, LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import { View, AsyncStorage } from 'react-native';

export default class Botram extends Component {

  // componentWillMount(){
  //   this.props.navigator.push({index:1})
  // }

  goToHomeScene = () => this.props.navigator.resetTo({title:'HomeScene'})

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
              // alert(accessToken.toString())

              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  fetch('http://botram-api-production.ap-southeast-1.elasticbeanstalk.com/users', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: result.email || '',
                      name: result.name,
                      pic: result.picture.data.url,
                      id_fb: result.id
                    })
                  }).then((response) => {
                    return response.json()


                  }).then(data => {
                    AsyncStorage.setItem("token", data)

                    AsyncStorage.getItem("token").then(value => console.log(value));
                  })
                  .catch(err => console.log(err))

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
