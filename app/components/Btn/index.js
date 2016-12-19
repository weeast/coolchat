import React, { Component, PropTypes } from 'react'
import './view.less'

class Btn extends Component {
	render(){

		let  props = this.props;

		return props.href ?
			<a 
				className={props.className + " ui-btn"} 
				style={props.style} 
				href ={props.href} 
				target={props.newWin && '_blank'}>{props.text}{this.props.children}</a>
			:<a 
				className={props.className + " ui-btn"} 
				style={props.style} 
				onClick={this.props.clickHandler}>{props.text}{this.props.children}</a>
			
	}
}

Btn.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	text: PropTypes.string.isRequired,
	href: PropTypes.string,
	newWin: PropTypes.bool,
	clickHandler: PropTypes.func
}

export default Btn