import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import OwnInfo from '../components/OwnInfo'
import OwnCollect from '../components/OwnCollect'
import OwnMenu from '../components/OwnMenu'

import './layout.less'

class Own extends Component {
	render() {
		return (
			<div className="layout-user-own">
				<OwnInfo 
					className="user-own-info user-own-row"  
					user={this.props.user} 
					link="/user/detail" />
				<OwnCollect 
					className="user-own-colle user-own-row"  
					collections={this.props.collections} />
				<OwnMenu
					className="user-own-recent user-own-row"
					link="/user/list/recent"
					icon="icon-time"
					text="最近浏览" />
				<OwnMenu
					className="user-own-channel user-own-row"
					link="/user/list/owner"
					icon="icon-user2"
					text="我的频道" />	
			</div>
		)
		
	}
}

function mapStateToProps(state) {
	return {
		user: Immutable.fromJS({
			icon: "http://placehold.it/130x130",
			name: "Weeast",
			mail: "475097021@qq.com"
		}),
		collections: Immutable.fromJS([
			{id:1, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
			{id:2, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
			{id:3, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
			{id:4, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
			{id:5, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
			{id:6, icon: "http://placehold.it/80x80", name: "weeast", num: 123},
			{id:7, icon: "http://placehold.it/80x80", name: "weeast", num: 123}
		])
	}
}

export default connect(mapStateToProps)(Own)