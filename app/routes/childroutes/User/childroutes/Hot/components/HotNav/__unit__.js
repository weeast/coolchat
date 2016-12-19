/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import HotNav from './index'

require('STYLE/layout.less');

let navs = Immutable.fromJS([
						{type: "类型一", typeId: 1, active: true},
						{type: "类型收到二", typeId: 2},
						{type: "类型三", typeId: 3},
						{type: "类型四", typeId: 4},
						{type: "类型四", typeId: 5},
						{type: "类型四", typeId: 6},
						{type: "类型四", typeId: 7},
						{type: "类型四", typeId: 8},
						{type: "类型四", typeId: 9}])

ReactDom.render(
    <HotNav navs={ navs }/>,
    document.getElementById('root')
);
