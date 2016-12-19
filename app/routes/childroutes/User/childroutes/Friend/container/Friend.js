import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import ClassifList from '../components/ClassifList'

import './layout.less'

class Friend extends Component {
	render() {
		return (
			<div className="layout-user-friend">
				{
					this.props.classifiedFriends.map( classifed => 
						<ClassifList 
							className="classifed-friends"
							title={classifed.get("title")}
							items={classifed.get("friends")} />
					)
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	let icon = 'http://placehold.it/80x80'
	return {classifiedFriends: Immutable.fromJS([
				{title: 'A', friends:[{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'}]},
				{title: 'B', friends:[{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'}]},
				{title: 'C', friends:[{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'}]},
				{title: 'D', friends:[{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'}]},
				{title: 'E', friends:[{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'},{icon:icon,name:'weeast'}]}
			])}
}

export default connect(mapStateToProps)(Friend)