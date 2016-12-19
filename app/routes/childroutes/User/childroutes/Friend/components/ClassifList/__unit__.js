/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import ClassifList from './index'

require('STYLE/layout.less');

let items = Immutable.fromJS([
	{id:1, icon: "http://placehold.it/80x80", name: "weeast"},
	{id:2, icon: "http://placehold.it/80x80", name: "weeast"},
	{id:3, icon: "http://placehold.it/80x80", name: "weeast"},
	{id:4, icon: "http://placehold.it/80x80", name: "weeast"},
	{id:5, icon: "http://placehold.it/80x80", name: "weeast"},
	{id:6, icon: "http://placehold.it/80x80", name: "weeast"},
	{id:7, icon: "http://placehold.it/80x80", name: "weeast"}
])

ReactDom.render(
    <ClassifList title="A" items={items}/>,
    document.getElementById('root')
);
