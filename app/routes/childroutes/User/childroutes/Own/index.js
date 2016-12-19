// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Own from "./container/Own"

export default {
    path:'own', 
    components: Own
}