// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Hot from "./container/Hot"

export default {
    path:'hot',
    components: Hot
}