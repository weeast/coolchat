import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import './layout.less'

class List extends Component {
	render() {
		return (
			<div className="layout-user-list">
				
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {user: Immutable.fromJS({
		icon: 'http://placehold.it/240x240',
		mail: '475097021@qq.com',
		name: 'weeast'
	})}
}

export default connect(mapStateToProps)(List)