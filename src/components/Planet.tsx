import * as React from 'react';
import {store} from "../common/state/types";
import {stopLoading} from "../common/state/types";
import {PlanetsService} from "../common/api.service";
import { Link } from 'react-router-dom'

export default class Planet extends React.Component<any, { planet }> {
  constructor(props) {
    super(props);
    this.state = {planet: null};
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    const planetRes = await PlanetsService.get(id);
    const planet = await planetRes.data;

    this.setState({planet: planet}, () => store.dispatch(stopLoading()));
  }

  render() {
    const planet:any = this.state.planet;
    return planet && (
      <div className="planet-container container mt-5 mb-5">
        <Link to="/" className="d-block text-center mb-2 bt-2"><i className="fas fa-home" /></Link>
        <div className="card">
          <div className="card-img-header">
            <img src={planet.data.relationships.photo.links.src} className="card-img-top" />
            <button className="btn btn-light btn-photos">Photos</button>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-7">
                <small className="text-muted text-xs text-uppercase">{planet.data.relationships.galaxy.meta.name}</small>
                <h1 className="card-title">{planet.data.attributes.name}</h1>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <i className="fas fa-users"/> Population <span className="text-muted">{planet.data.attributes.population}</span></li>
                  <li className="list-inline-item">
                    <i className="fas fa-sun"/> Climate <span className="text-muted">{planet.data.attributes.climate}</span></li>
                </ul>
                <hr/>
                <p className="card-text text-muted">{ planet.data.attributes.description }</p>
                <hr/><h5>Terrains</h5>
                <div className="row">
                  <div className="col-md-6"><p className="text-muted">cityscape</p></div>
                  <div className="col-md-6"><p className="text-muted">mountains</p></div>
                </div>
                <hr/><h5>Amenities</h5>
                <div className="row">
                  {planet.data.relationships.amenities.data.map((amenity) => {
                    return <div className="col-md-6"><p className="text-muted">{amenity.type}</p></div>
                  })}
                </div>
                <hr/><h5><span className="text-muted text-xs"><span>0 reviews</span></span></h5>
              </div>
              <div className="col-md-5">
                <div className="card border">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>${ planet.data.attributes.price_dollars }</strong> per night
                      <span className="text-muted text-xs d-block">
                        <span>{Math.ceil(planet.data.attributes.average_rating)} reviews</span>
                      </span>
                    </p>
                    <div className="form-group mb-0 mt-3">
                      <button className="btn-xl btn btn-block btn-primary">Book</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
