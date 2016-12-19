import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Map } from 'immutable'

import './view.less'

class OwnInfo extends Component {
	render() {
		return (
			<Link 
				className={`md-userown-info ${this.props.className||""}`}
				to={this.props.link} >
				<div className="info-col icon-warp" >
					<img src={this.props.user.get("icon")} />
				</div>
				<div className="info-col detail-warp" >
					<p className="name">{this.props.user.get("name")}</p>
					<p className="mail">{this.props.user.get("mail")}</p>
				</div>
				<div className="info-col more">
					<i className="iconfont icon-more"></i>
				</div>
			</Link>
		)
	}
}

OwnInfo.propTypes = {
	className: PropTypes.string,
	user: PropTypes.instanceOf(Map).isRequired,
	link: PropTypes.string
}

export default OwnInfo