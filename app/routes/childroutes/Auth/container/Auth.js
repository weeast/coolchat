import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './layout.less'

class Auth extends Component {
	render() {
		return (
			<div className="layout-auth">
				<h1 className="tit">CoolChat</h1>
		        {this.props.children}
		    </div>	
		)
	}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(Auth)