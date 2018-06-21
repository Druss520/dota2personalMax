/// <reference path="./interface.d.ts"/>

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import {  Router } from 'react-router';
import Entry from './page/entry';
import App from './page/home';
import history from './history';

ReactDOM.render(
  <React.Fragment>
    <Router history={history}>
      <div>
      <Route exact path="/" component={App} />
      <Route exact path="/entry" component={Entry} />
      </div>
    </Router>
  </React.Fragment>,
  document.getElementById('reactRoot')
);