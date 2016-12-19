// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Password from './container/Password'

export default {
    path:'password',
    component: Password
}