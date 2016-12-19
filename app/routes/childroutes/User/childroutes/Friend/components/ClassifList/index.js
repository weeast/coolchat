import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'

import "./view.less"

class ClassifList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			active: true
		}

		this.clickHandler = this.clickHandler.bind(this)
	}
	clickHandler(e) {
		this.setState({active: this.state.active?false:true})
	}
	render() {
		return (
			<div className={`md-userlist-classified ${this.props.className}`}>
				<div 
					className="title"
					onClick={this.clickHandler} >
					{this.props.title}
					<i 
						className="iconfont icon-more"
						style={{transform: `rotate(${this.state.active?90:0}deg)`}} />
				</div>
				<ul 
					className="list-item-repeater"
					style={{height:`${this.state.active?
										this.props.items.size*100:0}px`}}>
					{
						this.props.items.map( (item, index) => 
							<li
								key={index}
								className="list-item">
								<img 
									className="icon" 
									src={item.get("icon")}
									alt={item.get("name")} />
								<span className="name">{item.get("name")}</span>
							</li>
						)
					}		
				</ul>
			</div>
		)	
	}
}

ClassifList.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string.isRequired,
	items: PropTypes.instanceOf(List).isRequired
}

export default ClassifList