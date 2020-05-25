import Planet from "./components/Planet";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Spinner from "./common/Spinner";
import { Provider } from 'react-redux'
import {store} from "./common/state/types";
import SearchPlanets from "./components/SearchPlanets";
import Planets from "./components/Planets";

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Spinner/>
      <Router>
        <Switch>
          <Route exact path="/">
            <section className="home-search">
              <div className="inner">
                <div className="container">
                  <h1 className="mb-5 slideInLeft text-white animated">
                    <span className="text-primary mr-2">
                      <i className="fas fa-rocket"/>
                    </span>
                    Vacation anywhere in the universe.
                  </h1>
                  <SearchPlanets />
                </div>
              </div>
            </section>
          </Route>
          <Route exact path="/planets" component={Planets} />
          <Route exact path="/planets/:id" component={Planet} />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
