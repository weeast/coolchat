import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './view.less'

class Header extends Component {
	render() {
		return (
			<div className="md-channel-header">
				<Link> 
					<i className="iconfont icon-backicon"></i>
				</Link>
				<h1>{this.props.ChannelId}频道</h1>
			</div>
		)
	}
}

Header.propTypes = {
	
}

export default Header