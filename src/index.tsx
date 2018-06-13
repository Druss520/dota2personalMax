/// <reference path="./interface.d.ts"/>

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import {  Router } from 'react-router';
import Red from './page/red';
import App from './page/home';




ReactDOM.render(
  <React.Fragment>
    <HashRouter>
      <div>
      <Route exact path="/" component={App} />
      <Route exact path="/red" component={Red} />
      </div>
    </HashRouter>
  </React.Fragment>,
  document.getElementById('reactRoot')
);