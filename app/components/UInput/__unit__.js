/**
 * 测试
 * @authors tianxi (505183878@qq.com)
 * @date    2016-11-05 11:40:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import Component from './index'

import 'STYLE/layout.less'

let mock = {
	placeholder: "请输入内容...",
	focusEvent: function(){
		console.log("focusEvent");
	},
	blurEvent: function(e){
		let value = e.target.value;
		console.log("BlurEvent:"+ value);
	}
}

ReactDom.render(
	<div>
    	<Component {...mock}/>
    </div>,
    document.getElementById('root')
);
