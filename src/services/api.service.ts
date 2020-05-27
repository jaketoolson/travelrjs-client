import http from "axios";
const qs = require('qs');

const ApiService = {
  get (resource:string , config?:any) {
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
    return ApiService.get(`${process.env.GALAXY_ENDPOINT}/galaxies`);
  },
};

export const AmenitiesService = {
  all () {
    return ApiService.get(`${process.env.GALAXY_ENDPOINT}/amenities`);
  },
};

export const PlanetsService = {
  query (params: {[key: string]: string}) {
    const q = qs.stringify({filter: params}, {encode: false });
    return ApiService.get(`${process.env.GALAXY_ENDPOINT}/planets?${q}`);
  },
  get (id: number) {
    return ApiService.get(`${process.env.GALAXY_ENDPOINT}/planets/${id}`);
  },
  toggleLike (id: number) {
    return ApiService.get(`${process.env.GALAXY_ENDPOINT}/planets/${id}/likes`);
  },
  reviews (id: number) {
    return ApiService.get(`${process.env.GALAXY_ENDPOINT}/planets/${id}/reviews`);
  },
};
