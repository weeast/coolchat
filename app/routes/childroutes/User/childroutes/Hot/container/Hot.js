import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import HotNav from '../components/HotNav'
import ChannelList from '../components/ChannelList'

import './layout.less'

class Hot extends Component {
	render() {
		return (
			<div className="layout-user-hot">
				<HotNav navs={this.props.navs}/>
				<ChannelList channels={this.props.channels}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
			navs: Immutable.fromJS([
				{type: "类型一", typeId: 1, active: true},
				{type: "类型收到二", typeId: 2},
				{type: "类型三", typeId: 3},
				{type: "类型四", typeId: 4},
				{type: "类型四", typeId: 5},
				{type: "类型四", typeId: 6},
				{type: "类型四", typeId: 7}
			]),
			channels: Immutable.fromJS([
				{id:1, icon: "http://placehold.it/300x300", name: "房间一", number: "12"},
				{id:2, icon: "http://placehold.it/300x300", name: "房间二", number: "12"},
				{id:3, icon: "http://placehold.it/300x300", name: "房间三", number: "12"},
				{id:4, icon: "http://placehold.it/300x300", name: "房间四", number: "12"},
				{id:5, icon: "http://placehold.it/300x300", name: "房间五", number: "12"},
				{id:6, icon: "http://placehold.it/300x300", name: "房间六", number: "12"},
				{id:7, icon: "http://placehold.it/300x300", name: "房间七", number: "12"},
			])
		};
}

export default connect(mapStateToProps)(Hot)