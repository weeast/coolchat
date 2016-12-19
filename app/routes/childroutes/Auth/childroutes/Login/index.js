// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Login from "./container/Login"

export default {
    path:'login', 
    components: Login
}