import Planet from "./components/Planet";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Spinner from "./common/Spinner";
import { Provider } from 'react-redux'
import {store} from "./context/store";
import Planets from "./components/Planets";
import Home from "./components/Home";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Spinner/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/planets" component={Planets} />
          <Route exact path="/planets/:id" component={Planet} />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
