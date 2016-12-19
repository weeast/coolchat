import React, { Component, PropTypes } from 'react'

import UInput from 'APP/components/UInput'

import './view.less'

class DetailName extends Component {
	constructor(props) {
		super(props)

		this.state = {set: 0, name: this.props.name}

		this.editHandler = this.editHandler.bind(this)
	}
	editHandler(e) {
		if(this.state.set===1){
			this.props.editName("")
			this.setState({set: 2, name: ""})
		} else {
			this.setState({set: 1})
		}
	}
	render() {
		return (
			<div className={`md-userdetail-name ${this.state.set===1?"setting":""}`}>
				<span 
					className="detail-name">
					{this.state.set>1?this.state.name:this.props.name}
				</span>
				<UInput 
					className="set-name" 
					placeholder={this.state.name} 
					focusEvent={e => etInputValue(e.target, this.state.name)} />
				<a 
					className={`iconfont ${this.state.set!==1?"icon-edit":"icon-affirm"}`} 
					onClick={this.editHandler}
					href="javascript:;"></a>
			</div>
		)
	}
}

function setInputValue (elem, value){
	elem.value = value
}

DetailName.propTypes = {
	name: PropTypes.string.isRequired,
	editName: PropTypes.func.isRequired
}

export default DetailName