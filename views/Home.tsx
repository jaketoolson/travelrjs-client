import * as React from 'react';
import SearchPlanets from '../components/search/SearchPlanets';
import {store} from "../common/state/types";
import {stopLoading} from "../common/state/types";

export default class Home extends React.Component {
  componentDidMount() {
    store.dispatch(stopLoading());
  }

  render() {
    return (
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
    );
  }
}