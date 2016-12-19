/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import OwnMenu from './index'

require('STYLE/layout.less');

ReactDom.render(
	<div>
    	<OwnMenu link="" icon="icon-time" text="最近浏览"/>
    	<OwnMenu link="" style={{marginTop: "20px"}} text="最近浏览"/>
	</div>,
    document.getElementById('root')
);
