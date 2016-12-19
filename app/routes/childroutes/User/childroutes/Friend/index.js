// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Friend from "./container/Friend"

export default {
    path:'friend', 
    components: Friend
}