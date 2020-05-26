import * as React from 'react';
import { Link } from 'react-router-dom'
import {store} from "@/context/store";
import {stopLoading} from "@/context/store";
import {PlanetsService} from "@/services/api.service";
import {StarRating} from "@/common/Stars";

const qs = require('qs');

export default class PlanetsContainer extends React.Component<any, { data, loading: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const query = await qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    const searchRes = await PlanetsService.query({
      name: query.name,
      galaxy_id: query.galaxy_id,
      amenities: query.amenities
    });
    const data = await searchRes.data;

    this.setState({data: data, loading: false}, () => store.dispatch(stopLoading()));
  }

  render() {
    const loading = this.state.loading;
    const data = this.state.data;

    if (loading) {
      return <h3 className="center-of-screen text-white text-center">Fueling up the tanks, and reviewing ignition plans...</h3>;
    }

    if (!loading && data.data.length === 0) {
      return <h3 className="center-of-screen text-white text-center">
        Sorry, we were unable to find planets that meet your needs :(
        <Link to="/" className="d-block mt-3"><i className="fas fa-home"/></Link>
      </h3>;
    }

    return !loading && data && (
      <div className="mt-2 container">
        <Link to="/" className="d-block text-center mb-2 mt-2"><i className="fas fa-home" /></Link>
        <div className="items row">
          {data.data.map((item) => {
            return (
              <div className="col-sm-3" key={item.id}>
                <div className="item">
                  <div className="card mb-4">
                    <img src={item.relationships.photo.links.thumb_src} alt={item.attributes.name} className="card-img-top"/>
                    {/*<div className="card-img-overlay">*/}
                    {/*  <span className="btn text-white text-right" onClick={() => this.toggleLike(item.id)}>*/}
                    {/*    <i className="far fa-heart" />*/}
                    {/*  </span>*/}
                    {/*</div>*/}
                    <div className="card-body">
                      <small className="text-muted text-xs text-uppercase">{item.relationships.galaxy.meta.name}</small>
                      <h5 className="card-title">
                        <Link to={`/planets/${item.id}`} className="title">{item.attributes.name}</Link>
                      </h5>
                      <p className="card-text text-muted">${item.attributes.price_dollars} per night</p>
                      <span className="text-muted text-xs">
                        <span>
                          <StarRating rating={(item.attributes.average_rating)} />
                        </span>
                        <span className="ml-1">
                          {item.attributes.total_reviews} Reviews
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
