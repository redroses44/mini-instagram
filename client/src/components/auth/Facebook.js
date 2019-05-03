import FacebookLogin from 'react-facebook-login'
import { facebookKey } from './keys'

import React, { Component } from 'react'

class Facebook extends Component {

  responseFacebook = response => {
    const username = response.email.split("@")[0]
    const user = {
      username,
      name: response.name,
      email: response.email,
      facebookId: response.id
    }
  }
  render() {
    return (
      <div>
        <FacebookLogin
          appId={facebookKey}
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook} />
      </div>
    )
  }
}

export default Facebook
