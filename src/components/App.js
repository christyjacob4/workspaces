import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";
import { withAuthentication } from './Session';
// pages
import Error from "./Error";
import Login from "./Login";

const App = ()=> {
  console.log("[INFO] IN APP COMPONENT");
  return (
   <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
        <Route path="/app" component={Layout} />
        <Route path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default withAuthentication(App);

  // #######################################################################

//   function PrivateRoute({ component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           true ? (
//             React.createElement(component, props)
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           )
//         }
//       />
//     );
//   }

//   function PublicRoute({ component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           true ? (
//             <Redirect
//               to={{
//                 pathname: "/",
//               }}
//             />
//           ) : (
//             React.createElement(component, props)
//           )
//         }
//       />
//     );
//   }
// }
