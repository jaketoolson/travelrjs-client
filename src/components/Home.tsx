import * as React from 'react';
import {store} from "../context/store";
import {stopLoading} from "../context/store";
import {PlanetsService} from "../services/api.service";
import { Link } from 'react-router-dom'
import SearchPlanets from "./SearchPlanets";
const qs = require('qs');

export default class Home extends React.Component<any, { data, loading: boolean }> {
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
