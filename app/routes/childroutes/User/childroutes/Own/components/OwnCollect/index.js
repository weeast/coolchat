import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { List } from 'immutable'

import ScrollablePane from 'APP/components/ScrollablePane'

import "./view.less"

class OwnCollect extends Component {
	render() {
		return (
			<div className="md-userown-colle">
				<Link 
					to="/user/list/collection"
					className="colle-title">
					我的收藏
					<i className="iconfont icon-more" />
				</Link>
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

OwnCollect.propTypes = {
	collections: PropTypes.instanceOf(List).isRequired
}

export default OwnCollect