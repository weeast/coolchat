import React, { Component, PropTypes } from 'react'
import './view.less'

class UInput extends Component {
	render() {
		let  props = this.props;

		return (
			<input 
				className={props.className + " ui-input"} 
				name={props.name}
				style={props.style} 
				type={ props.type } 
				value={ props.value } 
				placeholder={ props.placeholder}
				onFocus = {props.focusEvent}
				onBlur = {props.blurEvent}/>
		)
	}
}

UInput.propTypes = {
	className:PropTypes.string,
	name:PropTypes.string,
	style: PropTypes.object,
	type: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	focusEvent: PropTypes.func,
	blurEvent: PropTypes.func

}

UInput.defaultProps = {
	type: 'text'
}

export default UInput