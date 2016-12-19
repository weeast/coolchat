// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import React from 'react'
import {Router} from 'react-router'
import App from './container/App'

const rootRoute = {
    path:'/',
    component: App,

    // getIndexRoute(partialNextState, callback) {
    //     require.ensure([], function (require) {
    //         callback(null, {
    //             component: require('./childroutes/Auth').default,
    //         })
    //     })
    // },

    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
            require('./childroutes/User'),
            require('./childroutes/Auth'),
            require('./childroutes/Channel')
        ])
      })
    }
}

export { rootRoute }
export default function(history) {
    return <Router history={history} routes={rootRoute} />
}