import React, { Component, PropTypes } from 'react'
import Bubble from '../Bubble'
import './view.less'

class UserHeader extends Component {
	render() {
		return (
			<span className="md-channel-userheader">
				<img src={this.props.imgSrc || "http://placehold.it/80x80"}/>
			</span>
		)
	}
}

UserHeader.propTypes = {
	imgSrc: PropTypes.string
}

export default UserHeader