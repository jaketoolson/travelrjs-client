import * as React from 'react';
import {AmenitiesService, GalaxiesService} from "../../common/api.service";

interface BaseApiEntity {
  type: string,
  id: string,
  attributes: {
    name: string,
  }
}

interface SearchPlanetsState {
  ready: boolean,
  planet_name: string|null,
  galaxies: {data?: Array<BaseApiEntity>},
  amenities: {data?: Array<BaseApiEntity>},
  selected_galaxy_id: number|null,
  selected_amenities_id: Array<number>|null,
}

export default class SearchPlanets extends React.Component<{}, SearchPlanetsState> {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      planet_name: null,
      amenities: {},
      galaxies:  {},
      selected_galaxy_id: null,
      selected_amenities_id: null,
    };
  }

  async componentDidMount() {
    const galaxiesResponse = await GalaxiesService.all();
    const galaxies = await galaxiesResponse.data;

    const amenitiesResponse = await AmenitiesService.all();
    const amenities = await amenitiesResponse.data;

    this.setState({
      ready: true,
      galaxies: galaxies,
      amenities: amenities
    });
  }

  handleGalaxyChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({selected_galaxy_id: parseInt(e.target.value)});
  }

  handleAmenityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({selected_amenities_id: [...e.target.options].filter(o => o.selected).map(o => parseInt(o.value))});
  }

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({planet_name: e.target.value});
  }

  handleSearch = (): void => {
    if (!this.state.planet_name) {
      return;
    }

    alert(this.state.planet_name);
  }

  render() {
    return this.state.ready && (
      <div className="main-search-form form">
        <div className="form-row">
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <input id="planet_name" onChange={this.handleSearchChange} name="planet_name" type="text" className="form-control form-control-xl" placeholder="Search by planet name"/>
            </div>
          </div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group" >
                <select className={'form-control'} id={'galaxy'} placeholder={'Select galaxy'} onChange={this.handleGalaxyChange}>
                  {this.state.galaxies.data.map((galaxy: BaseApiEntity) => <option key={galaxy.id} value={galaxy.id}>{galaxy.attributes.name}</option>)}
                </select>
              </div>
            </div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <select multiple={true} className={'form-control'} id={'amenities'} placeholder={'Select amenities'} onChange={this.handleAmenityChange}>
                  {this.state.amenities.data.map((amenity: BaseApiEntity) => <option key={amenity.id} value={amenity.id}>{amenity.attributes.name}</option>)}
                </select>
              </div>
            </div>
          <div className="col-md-2 col-sm-2">
            <button
              onClick={this.handleSearch}
              type="button"
              className="btn btn-xl btn-primary btn-block">Search</button>
        </div>
        </div>
      </div>
    );
  }
}
