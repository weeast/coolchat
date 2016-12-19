/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'

import DetailIcon from './index'

require('STYLE/layout.less');

ReactDom.render(
    <DetailIcon icon="http://placehold.it/240x240" uploadFile={()=>{}}/>,
    document.getElementById('root')
);
