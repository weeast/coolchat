// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import List from "./container/List"

export default {
    path:'list/:category', 
    components: List
}