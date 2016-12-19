/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import OwnInfo from './index'

require('STYLE/layout.less');

let user = Immutable.fromJS({
	icon: "http://placehold.it/130x130",
	name: "Weeast",
	mail: "475097021@qq.com"
})

ReactDom.render(
    <OwnInfo  user={ user } link="javascript:;"/>,
    document.getElementById('root')
);
