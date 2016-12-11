/**
 * Created by Jerry on 16/12/9.
 */

import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import Index from "./components/index";

ReactDom.render(<Router history = {browserHistory}>
    <Route path="/react">
        <IndexRedirect to="sign-in" />
        <Route path="sign-:type" component={ Index } />
    </Route>
</Router>, document.querySelector("#main"));