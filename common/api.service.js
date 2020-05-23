import http from '@/router/axios'
import { getRouteByName } from '@/router';

const ApiService = {
  init () {},
  query (resource, params) {
    return http.get(resource, {params: params})
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },
  get (resource) {
    return http.get(resource)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },
};

export default ApiService;

// FIXME: Break these out.
export const GalaxiesService = {
  all () {
    return ApiService.get(getRouteByName('api.galaxies'));
  },
};

export const AmenitiesService = {
  all () {
    return ApiService.get(getRouteByName('api.amenities'));
  },
};

export const PlanetsService = {
  query (params) {
    return ApiService.query(getRouteByName('api.planets'), params);
  },
  get (id) {
    return ApiService.get(getRouteByName('api.planets.show', {id: id}));
  }
};