// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import React from 'react'
import {Router} from 'react-router'
import Auth from './container/Auth'

export default {
    path:'auth',
    component: Auth,

    // getIndexRoute(partialNextState, callback) {
    //     require.ensure([], function (require) {
    //         callback(null, {
    //             component: require('./childroutes/Login').default,
    //         })
    //     })
    // },

    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
            require('./childroutes/Login'),
            require('./childroutes/PassWord'),
            require('./childroutes/Register')
        ])
      })
    }
}