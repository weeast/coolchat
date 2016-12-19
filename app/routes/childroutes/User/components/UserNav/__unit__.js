/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import UserNav from './index'

require('STYLE/layout.less');

ReactDom.render(
    <UserNav />,
    document.getElementById('root')
);
