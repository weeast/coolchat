import React, { Component, PropTypes } from 'react'

import "./view.less"

class UserList extends Component {
	render() {
		return (
			<div className="md-user-list">
				<div className="list-title">{this.props.title}</div>
				<ScrollablePane
					className="colle-item-repeater"
					style={{height: "160px"}}
					rollBack={true} 
					sliderSize={this.props.collections.size*180} 
					paneSize={750} >
					{
						this.props.collections.map( (colle, index) => 
							<Link 
								key={index}
								to={`/channel/${colle.get("id")}`}
								className="colle-item">
								<img
									className="icon"
									src={colle.get("icon")} 
									alt={colle.get('name')} />
								<span className="colle-num">
									{`${colle.get("num")}人`}
								</span>
							</Link>
						)
					}
				</ScrollablePane>
			</div>
		)	
	}
}

export default UserList