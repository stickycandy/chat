/**
 * Created by Jerry on 16/8/15.
 */

import React from "react";
import ReactDom from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import SocketService from "./SocketService"
//引入所有的 reducer
import * as reducers from "./reducers";
//引入所有的组件
import * as Components from "./components";
import "./index.css";

//讲 reducer, react-router 与 redux 绑定
const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const store = createStore(reducer, compose(
    applyMiddleware( thunk ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

//引入 socket
SocketService(store);

//热替换选项
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
    })
}

//路由生成规则, 与 redux 结合.
const history = syncHistoryWithStore(browserHistory, store);

//路由框架
class App extends React.Component{

    render() {

        return <div className="absolute-center shadow">
            { this.props.children }
        </div>
    }
}

ReactDom.render(<Provider store = { store }>
    <Router history = {history}>
        <Route path="/" component={App}>
            <IndexRedirect to="sign-in" />
            <Route path="chat" component={ Components.Chat } />
            <Route path="sign-in" component={ Components.SignIn } />
            <Route path="sign-up" component={ Components.SignUp } />
        </Route>
    </Router>
</Provider>, document.querySelector("#main"));