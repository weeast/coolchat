import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './view.less'

class UserNav extends Component {
	render() {
		return (
			<div className="md-user-nav">
				<Link 
					to="/user/hot" 
					className="nav-link" 
					activeClassName="active" >
					<i className="iconfont icon-star"></i>
					推荐
				</Link>
				<Link 
					to="/user/friend" 
					className="nav-link" 
					activeClassName="active" >
					<i className="iconfont icon-user"></i>
					好友
				</Link>
				<Link 
					to="/user/own" 
					className="nav-link" 
					activeClassName="active" >
					<i className="iconfont icon-heart"></i>
					我的
				</Link>
			</div>
		)
	}
}

export default UserNav