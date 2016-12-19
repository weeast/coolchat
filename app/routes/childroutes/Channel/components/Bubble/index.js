import React, { Component, PropTypes } from 'react'
import './view.less'

class Bubble extends Component {
	render() {
		return (
			<span className={"md-channel-bubble " + this.props.className}>
				{this.props.text}
			</span>
		)
	}
}

Bubble.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string
}

export default Bubble