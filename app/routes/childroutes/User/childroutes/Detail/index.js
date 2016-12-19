// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Detail from "./container/Detail"

export default {
    path:'detail',
    components: Detail
}