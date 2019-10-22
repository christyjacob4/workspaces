import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import Typist from 'react-typist';

import { gapi } from 'gapi-script';

const firebaseConfig = {
    apiKey: "AIzaSyAycsHzVVLE9SJxQX8JnrMIYMRpzyD0CG4",
    authDomain: "web-tech-project-c67f5.firebaseapp.com",
    databaseURL: "https://web-tech-project-c67f5.firebaseio.com",
    projectId: "web-tech-project-c67f5",
    storageBucket: "web-tech-project-c67f5.appspot.com",
    messagingSenderId: "172927547768",
    appId: "1:172927547768:web:f6a42e49b8e4442d32f08d",

    clientId: "123772629281-4dn3c4lia8ee5n2u97eqfpepug34k1o4.apps.googleusercontent.com",

    scopes: [
             "email",
             "profile",
             "https://www.googleapis.com/auth/calendar",
             "https://mail.google.com/	"
    ]
  };

  firebase.initializeApp(firebaseConfig);





function Login(props) {

    firebase.auth().onAuthStateChanged(function(user) {
    console.log(user)
    // Make sure there is a valid user object
    if (user) {
            var gapiConfig = {
                apiKey: firebaseConfig.apiKey,
                clientId: firebaseConfig.clientID,
                discoveryDocs: firebaseConfig.discoveryDocs,
                scope: firebaseConfig.scopes.join(" ")
            };

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://apis.google.com/js/api.js";
            // Once the Google API Client is loaded, you can run your code
            script.onload = function(e) {

                gapi.load('client:auth2', _ => {
                console.log('loaded GAPI')
                // gapi.client.calendar.events.list({
                //                 calendarId: "primary",
                //                 timeMin: new Date().toISOString(),
                //                 showDeleted: false,
                //                 singleEvents: true,
                //                 maxResults: 10,
                //                 orderBy: "startTime"
                //                 }).then(function(response) {
                //                 console.log(response);
                //             });

                function initGAPI(){
                    if (!gapi || !gapi.client){ return ('no gapi.client') }
                    gapi.client.init(gapiConfig)
                    .then(_ => {
                            console.log('initialised GAPI');
                            window.GAPIiniOK = true;
                            // gapi.client.calendar.events.list({
                            //     calendarId: "primary",
                            //     timeMin: new Date().toISOString(),
                            //     showDeleted: false,
                            //     singleEvents: true,
                            //     maxResults: 10,
                            //     orderBy: "startTime"
                            //     }).then(function(response) {
                            //     console.log(response);
                            // });
                            console.log(gapi.client.calendar);
                            gapi.auth2.getAuthInstance().isSignedIn.listen(_ => {console.log("Here")});



                    }).catch(error => {
                        console.log('authenticationError', {error, note: 'error during gapi initialisation'});
                        // return reject(error)
                        // setTimeout(initGAPI, 10);
                    });
                }
                setTimeout(initGAPI, 10);


                });
            }

            document.getElementsByTagName("head")[0].appendChild(script);
    }

        // Add to the document
        // document.getElementsByTagName("head")[0].appendChild(script);



});

  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

    var uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      {provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      },
      scopes: firebaseConfig.scopes}
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => loginUser(
                        gapi,
                        firebaseConfig,
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
    }
  };



  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src="https://images.squarespace-cdn.com/content/v1/5b497083cc8fedc96311a4dd/1531619400438-FJNK7IIP1C3BFFPD5SYK/ke17ZwdGBToddI8pDm48kBPw4N13dNaFqvN1wFuK0BxZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7aKHqy_Pq5SZUkyxONRRLX6S0It3pZkr2piwbyn7VQezxUZSLJSadZMfV9Js6cjlCQ/Workspace+Logo+%28RGB%2C+Mark%2C+Orange%29.png" alt="logo" className={classes.logotypeImage} />
        {/* <Typography className={classes.logotypeText}>Workspaces</Typography> */}
        {/* <Typist.Delay ms={2000} /> */}
        <Typist className={classes.TypistText} avgTypingDelay={80}
          startDelay={1000} cursor={{show:false}}>
        Workspaces
      </Typist>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          {/* <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs> */}
          {/* {activeTabId === 0 && ( */}
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Sign in to Start Working
              </Typography>

              {/* <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
              {/* <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              {/* <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              /> */}
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={40}/>
                ) : (

                   <StyledFirebaseAuth some="hi" uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                )}
                </div>
            </React.Fragment>
          {/* )} */}
          {/* {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="email"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )} */}
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
          © 2014-2019 Flatlogic, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
  );
}

// export {firebase};
export default withRouter(Login);
