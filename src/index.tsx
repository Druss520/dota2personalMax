/// <reference path="./interface.d.ts"/>

import './index.css';

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { hashHistory, Router } from 'react-router';
import Red from './red';



class App extends React.Component<IAppProps,IAppState>{



public render(): JSX.Element {
    return(
      <div className={'hehe'}>
        <div className={'header'}>
          header
          <Link to={'/red'}>
          red
          </Link>
          <Link to={'./about'}>
          about
          </Link>
        </div>
        <div className={'body'}>
          body
        </div>
      </div>
    )
  }
}

// class Red extends React.Component<IAppProps,IAppState>{

//   public render(): JSX.Element {
//       return(
//         <div className={'hehe'}>
//           <div className={'red'}>
//             red
//           </div>
//         </div>
//       )
//     }
// }

const About = () => (
  <div>
    <h3>About</h3>
  </div>
)

ReactDOM.render(
  <HashRouter history={hashHistory} >
    <div>
    <Route exact path="/" component={App} />
    <Route exact path="/red" component={Red} />
    <Route exact path="/about" component={About} />
    </div>
  </HashRouter>,
  document.getElementById('reactRoot')
);