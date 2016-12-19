// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Register from './container/Register'

export default {
    path:'Register',
    component: Register
}