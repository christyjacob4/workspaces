import React from "react";
import firebase from "firebase";
// import { gapi } from "gapi-script";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(gapi, firebaseConfig, dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

//   if (!!login && !!password) {
    setTimeout(() => {
        localStorage.setItem("id_token", "1");
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        setIsLoading(false);

        // var gapiConfig = {
        //     apiKey: firebaseConfig.apiKey,
        //     clientId: firebaseConfig.clientID,
        //     discoveryDocs: firebaseConfig.discoveryDocs,
        //     scope: firebaseConfig.scopes.join(" ")
        //     };

        //     var script = document.createElement("script");
        //     script.type = "text/javascript";
        //     script.src = "https://apis.google.com/js/api.js";
        //     // Once the Google API Client is loaded, you can run your code
        //     script.onload = function(e) {

        //         window.gapi.load('client:auth2', _ => {
        //         console.log('loaded GAPI')
        //         // gapi.client.calendar.events.list({
        //         //                 calendarId: "primary",
        //         //                 timeMin: new Date().toISOString(),
        //         //                 showDeleted: false,
        //         //                 singleEvents: true,
        //         //                 maxResults: 10,
        //         //                 orderBy: "startTime"
        //         //                 }).then(function(response) {
        //         //                 console.log(response);
        //         //             });
        //         function initGAPI(){
        //             if (!window.gapi || !window.gapi.client){ console.log('no gapi.client') }
        //             window.gapi.client.init(gapiConfig)
        //             .then(_ => {
        //                     console.log('initialised GAPI');
        //                     window.GAPIiniOK = true;
        //                     gapi.client.calendar.events.list({
        //                         calendarId: "primary",
        //                         timeMin: new Date().toISOString(),
        //                         showDeleted: false,
        //                         singleEvents: true,
        //                         maxResults: 10,
        //                         orderBy: "startTime"
        //                         }).then(function(response) {
        //                         console.log(response);
        //                     });

        //                     history.push("/app/dashboard");

        //             }).catch(error => {
        //                 console.log('authenticationError', {error, note: 'error during gapi initialisation'});
        //                 // return reject(error)
        //             });
        //         }
        //         setTimeout(initGAPI, 10);


        //         });
        //     }

        //     document.getElementsByTagName("head")[0].appendChild(script);
        history.push("/app/dashboard");


    }, 2000);
//   } else {
//     dispatch({ type: "LOGIN_FAILURE" });
//     setError(true);
//     setIsLoading(false);
//   }
}

function signOut(dispatch, history) {
  firebase.auth().onAuthStateChanged(
        (user) => console.log("changed")
    );
  firebase.auth().signOut();

  console.log("In signout");
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
