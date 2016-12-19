import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import "./view.less"

class OwnMenu extends Component {
	render() {
		return (
			<Link
				to={this.props.link}
				className={`md-userown-menu ${this.props.className||""}`}
				style={this.props.style}>
				<i className={`iconfont symbol ${this.props.icon}`} />
				<span>{this.props.text}</span>
				<i className="iconfont icon-more" />
			</Link>
		)
	}
}

OwnMenu.propTypes = {
	className: PropTypes.string, 
	link: PropTypes.string,
	style: PropTypes.object,
	icon: PropTypes.string,
	text: PropTypes.string.isRequired
}

export default OwnMenu