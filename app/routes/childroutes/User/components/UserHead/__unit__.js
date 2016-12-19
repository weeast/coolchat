/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'
import Immutable from 'immutable'

import UserHead from './index'

require('STYLE/layout.less');

let user = Immutable.fromJS({loged: false})

ReactDom.render(
    <UserHead user={ user }/>,
    document.getElementById('root')
);
