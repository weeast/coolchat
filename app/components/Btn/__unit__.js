/**
 * 测试
 * @authors tianxi (505183878@qq.com)
 * @date    2016-11-02 21:51:39
 */
 import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import Component from './index'

require('STYLE/layout.less')

let nullBtn = {
	style: {
		fontSize: '30px'
	},
	text: "nullBtn",
	newWin: true,
	href: "12",
}

let defaultBtn = {
	style: {
		fontSize: '30px'
	},
	className:'ui-default-btn',
	text: "defaultBtn",
	newWin: true,
	href: "12",
}

let primaryBtn = {
	style: {
		fontSize: '30px'
	},
	className:'ui-primary-btn',
	text: "primaryBtn",
}


ReactDom.render(
	<div>
		<Component {...nullBtn} />
    	<Component {...defaultBtn} />
    	<Component {...primaryBtn} />
    </div>,
    document.getElementById('root')
);