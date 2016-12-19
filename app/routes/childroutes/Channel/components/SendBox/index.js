import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import UInput from 'APP/components/UInput/index'
import Btn from 'APP/components/Btn/index'

import './view.less'

class SendBox extends Component {
	clickHandler() {
		
	}

	render() {
		return (
			<div className="md-channel-sendbox">
				<Btn text="+" className="ui-radio-btn tool-btn"/>
				<UInput placeholder="请输入内容..." className="text-input" name="textInput"/>
				<Btn text="发送" 
					className="ui-radio-btn send-btn"
					clickHandler={this.clickHandler}/>
			</div>
		)
	}
}

SendBox.propTypes = {
	
}

export default SendBox