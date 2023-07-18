import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_OATH_CLIENT_ID


function LoginWithGoogle(props) {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
     const initClient = () => {
           gapi.client.init({
           clientId: clientId,
           scope: ''
         });
      };
      gapi.load('client:auth2', initClient);
  });

  const onSuccess = async (res) => {
    const data = res
    const userData = { email: data.profileObj.email }

    // register free requests
    const isRegistred = await props.tryForFree(data.profileObj.email)
    if(!isRegistred)
      return alert("Register free requests server error, please try later")

    // store user registred data in local storage
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsLogin(true)
    props.setModalOpen(false)
  };

  const onFailure = (err) => {
        console.log('failed:', err);
  };

  return (
    <>
    {
      !isLogin
      ?
      (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
        
      )
      :
      null
    }
    </>
  )
}

export default LoginWithGoogle;
