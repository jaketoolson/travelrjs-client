'use strict';

import Home from '../views/Home';

export default [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: {
      analytics: {
        pageviewTemplate(route) {
          return {
            title: 'Travelr Home',
            path: route.path,
            location: '/'
          }
        }
      }
    }
  },
  {
    path: '/api',
    // children : [
    //   {
    //     path: 'planets',
    //     name: 'api.planets'
    //   },
    //   {
    //     path: 'planets/:id',
    //     name: 'api.planets.show'
    //   },
    //   {
    //     path: 'galaxies',
    //     name: 'api.galaxies'
    //   },
    //   {
    //     path: 'amenities',
    //     name: 'api.amenities'
    //   },
    // ],
  },
  // {
  //   path: '/planets',
  //   name: 'planets',
  //   component: Planets,
  //   meta: {
  //     analytics: {
  //       pageviewTemplate(route) {
  //         return {
  //           title: 'Travelr Planets Search',
  //           path: route.path,
  //           location: '/planets'
  //         }
  //       }
  //     }
  //   }
  // },
  // {
  //   path: '/planets/:id',
  //   name: 'planets.show',
  //   component: Planet,
  //   meta: {
  //     analytics: {
  //       pageviewTemplate(route) {
  //         return {
  //           title: `Travelr Planet ID ${route.params.id}`,
  //           path: route.fullPath,
  //           location: route.fullPath
  //         }
  //       }
  //     }
  //   }
  // },
  {
    path: '*',
    redirect: { name: 'home' }
  }
];
