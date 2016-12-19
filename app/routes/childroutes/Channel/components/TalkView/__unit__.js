/**
 * 测试
 * @authors tianxi (505183878@qq.com)
 * @date    2016-11-20 21:51:39
 */
 import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import Component from './index'

require('STYLE/layout.less')

let talkData = Immutable.fromJS([
	{
		text:"123",
		imgSrc: "",
		"id": "123"
	},
	{
		text:"123",
		imgSrc: "",
		"id": "456"
	},
	{
		text:"123",
		imgSrc: "",
		"id": "123"
	}
])

ReactDom.render(
	<div>
    	<Component talkData = {talkData}/>
    </div>,
    document.getElementById('root')
);