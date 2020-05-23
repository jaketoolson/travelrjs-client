import * as React from 'react';

export default class SearchPlanets extends React.Component {
  render() {
    return (
      <div className="main-search-form form">
        <div className="form-row">
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <input id="planet_name" name="planet_name" type="text" className="form-control form-control-xl" placeholder="Search by planet name"/>
            </div>
          </div>
          <div className="col-md-2 col-sm-2">
            <button
              type="button"
              className="btn btn-xl btn-primary btn-block">Search</button>
        </div>
        </div>
      </div>
    );
  }
}