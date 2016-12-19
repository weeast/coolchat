/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import OwnCollect from './index'

require('STYLE/layout.less');

let collections = Immutable.fromJS([
	{id:1, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
	{id:2, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
	{id:3, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
	{id:4, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
	{id:5, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
	{id:6, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
	{id:7, icon: "http://placehold.it/80x80", name: "weeast", num: 123}
])

ReactDom.render(
    <OwnCollect  collections={collections}/>,
    document.getElementById('root')
);
