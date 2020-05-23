import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Spinner from '../common/Spinner';
import Routes from '../router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Spinner/>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </div>
    );
  }
}