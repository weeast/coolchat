import React, { Component, PropTypes } from 'react'

import UInput from 'APP/components/UInput'

import './view.less'

class DetailMail extends Component {
	constructor(props) {
		super(props)

		this.state = {set: 0, mail: this.props.mail}

		this.editHandler = this.editHandler.bind(this)
	}
	editHandler(e) {
		if(this.state.set===1){
			this.props.editMail("")
			this.setState({set: 2, mail: ""})
		} else {
			this.setState({set: 1})
		}
	}
	render() {
		return (
			<div className={`md-userdetail-mail ${this.state.set===1?"setting":""}`}>
				<span className="mail-title">邮箱:</span>
				<span 
					className="detail-mail">
					{this.state.set>1?this.state.mail:this.props.mail}
				</span>
				<UInput 
					className="set-mail" 
					placeholder={this.state.mail} 
					focusEvent={e => setInputValue(e.target, this.state.mail)} />
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

DetailMail.propTypes = {
	mail: PropTypes.string.isRequired,
	editMail: PropTypes.func.isRequired
}

export default DetailMail