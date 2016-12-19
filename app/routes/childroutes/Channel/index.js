// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Channel from './container/Channel'

export default {
    path:'channel/:id',
    component: Channel
}