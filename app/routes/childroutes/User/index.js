// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import User from './container/User'

export default {
    path:'user',
    component: User,

    getChildRoutes(location, cb) {
		require.ensure([], (require) => {
			cb(null, [
			    require('./childroutes/Hot'),
			    require('./childroutes/Detail'),
			    require('./childroutes/Own'),
			    require('./childroutes/Friend')
			])
		})
    }
}