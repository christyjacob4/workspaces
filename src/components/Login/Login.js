import React, { useState, useEffect } from "react";
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

import CustomizedSnackbars from "../Snackbar/Snackbar";

import google from "../../images/google.svg";

import Typist from "react-typist";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withFirebase } from "../Firebase";

function Login(props) {
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(false);
  var [success, setSuccess] = useState(false);
  var [message, setMessage] = useState("");
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [emailValue, setemailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  console.log("[INFO] IN LOGIN COMPONENT");

  const successFunc = () => {
    setIsLoading(false);
    setError(false);
    setSuccess(true);
    setMessage("Login Successful");
  };


  const login = () => {
    console.log("[INFO] LOG IN");
    setIsLoading(true);
    setSuccess(false);
    setError(false);

    props.firebase
      .signIn(emailValue, passwordValue)
      .then(authUser => {
        successFunc();
      })
      .catch(err => {
        setIsLoading(false);
        setError(true);
        setSuccess(false);
        setMessage(err.message);
        console.log(err);
      });
  };

  const signUp = () => {
    console.log("[INFO] SIGN UP");
    setIsLoading(true);

    props.firebase
      .signUp(nameValue, emailValue, passwordValue)
      .then(authUser => {
        setIsLoading(false);
        setError(false);
        setSuccess(true);
        setMessage("User Created Successfully");
      })
      .catch(err => {
        setIsLoading(false);
        setError(true);
        setSuccess(false);
        setMessage(err.message);
        console.log(err);
      });
  };

  return (
    <Grid container className={classes.container}>
      {/* Toast Messages */}
      {success && (
        <CustomizedSnackbars
          isOpen={true}
          variant={"success"}
          message={message}
          callback={() => {
            setSuccess(false);
            setError(false);
            props.history.push("/app/dashboard");
          }}
        />
      )}
      {error && (
        <CustomizedSnackbars
          isOpen={true}
          variant={"error"}
          message={message}
          callback={() => {
            setSuccess(false);
            setError(false);
          }}
        />
      )}

      <div className={classes.logotypeContainer}>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5b497083cc8fedc96311a4dd/1531619400438-FJNK7IIP1C3BFFPD5SYK/ke17ZwdGBToddI8pDm48kBPw4N13dNaFqvN1wFuK0BxZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7aKHqy_Pq5SZUkyxONRRLX6S0It3pZkr2piwbyn7VQezxUZSLJSadZMfV9Js6cjlCQ/Workspace+Logo+%28RGB%2C+Mark%2C+Orange%29.png"
          alt="logo"
          className={classes.logotypeImage}
        />
        <Typist
          className={classes.TypistText}
          avgTypingDelay={80}
          startDelay={1000}
          cursor={{ show: false }}
        >
          Workspaces
        </Typist>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Sign in to Start Working
              </Typography>

              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={emailValue}
                onChange={e => setemailValue(e.target.value)}
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
                    onClick={login}
                    disabled={
                      emailValue.length === 0 || passwordValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Log In
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>

              <StyledFirebaseAuth
                uiConfig={props.firebase.getUIConf(successFunc)}
                firebaseAuth={props.firebase.auth}
              />
              {/* <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
            </React.Fragment>
          )}

          {/* Sign up Section */}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>

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
                value={emailValue}
                onChange={e => setemailValue(e.target.value)}
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
                    onClick={signUp}
                    disabled={
                      emailValue.length === 0 ||
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
          )}
        </div>
      </div>
    </Grid>
  );
}

// export {firebase};
export default withRouter(withFirebase(Login));
