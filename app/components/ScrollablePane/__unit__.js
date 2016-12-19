/**
 * 测试
 * @authors weeast (weeast.cd@gmail.com)
 * @date    2016-11-01 16:51:39
 */
import React from 'react'
import ReactDom from 'react-dom'

import Component from './index'

require('STYLE/layout.less');

let span = function(text){
	return (
		<span 
			style={{
				display:"inline-block",
				width:"300px",
				height:"40px"}}
			> 
			{text} 
		</span>)
}

let p = function(text){
	return (
		<p
			style={{height:"50px",width:"200px"}}
			> 
			{text} 
		</p>)
}

ReactDom.render(
	<div>
		<Component style={{height:"200px"}} sliderSize={1200} paneSize={750}>
			{span("一")}
			{span("二")}
			{span("三")}
			{span("四")}
		</Component>

		<Component  style={{height:"200px"}} rollBack={true} sliderSize={1200} paneSize={750}>
			{span("一")}
			{span("二")}
			{span("三")}
			{span("四")}
		</Component>

		<Component  style={{height:"200px"}} sliderSize={600} paneSize={750}>
			{span("一")}
			{span("二")}
		</Component>

		<Component aglin="vertical" style={{width:"200px"}} sliderSize={400} paneSize={200}>
			{p("一")}
			{p("二")}
			{p("三")}
			{p("四")}
		</Component>

		<Component aglin="vertical" rollBack={true} style={{width:"200px"}} sliderSize={400} paneSize={200}>
			{p("一")}
			{p("二")}
			{p("三")}
			{p("四")}
		</Component>

		<Component aglin="vertical" style={{height:"200px"}} sliderSize={100} paneSize={200}>
			{p("一")}
			{p("二")}
		</Component>
	</div>,
    document.getElementById('root')
);
