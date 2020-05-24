import http from "axios";

const ApiService = {
  query (resource, params) {
    return http.get(resource, {params: params})
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },
  get (resource, config?:any) {
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
    return ApiService.get('http://oriontravelr.com/api/galaxies');
  },
};

export const AmenitiesService = {
  all () {
    return ApiService.get('http://oriontravelr.com/api/amenities');
  },
};

export const PlanetsService = {
  query (params) {
    return ApiService.query('', params);
  },
  get (id: number) {
    return ApiService.get('', {id: id});
  }
};
