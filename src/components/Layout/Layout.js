import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";
import Notes from "../Notes";
import NotesGrid from "../NotesGrid";
import News from '../News';
import Chat from '../Chat';
// contextyaNews
import { useLayoutState } from "../../context/LayoutContext";

import { withAuthorization } from '../Session';

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/notes" component={NotesGrid} />
              <Route path="/app/news" component={News} />
              <Route path="/app/chat" component={Chat} />
              <Route path="/app/editor" component={Notes} />

            </Switch>
          </div>
        </>
    </div>
  );
}

console.log("[IN LAYOUT]")
const condition = authUser => !!authUser;
export default withAuthorization(condition)(withRouter(Layout));
