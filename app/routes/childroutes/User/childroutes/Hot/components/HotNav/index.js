import React, { Component, PropTypes } from 'react'
import { List } from "immutable"

import ScrollablePane from "APP/components/ScrollablePane"

import "./view.less"

class HotNav  extends Component {
	constructor(props) {
		super(props)

		this.state = {
			actives: props.navs.map(nav => nav.get("active")?true:false)
		}
	}
	clickHandler(index, e) {
		this.setState({actives: this.props.navs.map((nav, i) => i==index?true:false)})
		
		if(this.props.selectType)
			this.props.selectType(this.props.navs.getIn([index, 'typeId']))
	}
	render() {
		return (
			<div className="md-userhot-nav">
				<ScrollablePane
					className={'channel-nav-repeater'}
					style={{width: "750px", height:"70px"}}
					rollBack={true} 
					sliderSize={this.props.navs.size*140} 
					paneSize={750}>
					{
						this.props.navs.map( (nav, index) => 
							<span 
								key={index}
								className={`channel-nav-item ${this.state.actives.get(index)?"active":""}`}
								onClick={this.clickHandler.bind(this, index)}>
								{nav.get("type")}
							</span>
						)
					}
				</ScrollablePane>
			</div>
		)
	}
}

HotNav.propTypes = {
	selectType: PropTypes.func,
	navs: PropTypes.instanceOf(List).isRequired
}

export default HotNav