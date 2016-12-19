import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import UserHead from '../components/UserHead'
import UserNav from '../components/UserNav'

import './layout.less'

class User extends Component {
	render() {
		return (
			<div className="layout-user">
				<UserHead search={searchHandler} user={this.props.user} />
				<div className="user-wrap">
					{this.props.children}
				</div>
				<UserNav />
			</div>
		)
	}
}

/**
 * 搜索回调
 * @param  {object} options
 *            string     text	 文本
 *            boolean    search  全局搜索
 *            boolean    typing  本地搜索
 */
function searchHandler (options) {
	console.log(options)
}


function mapStateToProps(state) {
  return {user:Immutable.fromJS({loged: false})};
}

export default connect(mapStateToProps)(User)