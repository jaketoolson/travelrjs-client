import * as React from 'react';
import { Route } from 'react-router-dom'
import routes from './routes';

export default class Routes extends React.Component {
  render() {
    return (
      routes.map((route, index) => (
        <Route {...route} key={index}/>
      ))
    );
  }
}

// TODO: Make this work
export const getRouteByName = (name, params) => {
  return null;
};

