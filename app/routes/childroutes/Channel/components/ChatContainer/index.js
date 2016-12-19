import React, { Component, PropTypes } from 'react'
import TalkView from '../TalkView'
import { List } from 'immutable'
import './view.less'

class ChatContainer extends Component {
	render() {
		return (
			<div className={this.props.className + " md-channel-chat"} >
				<TalkView talkData={this.props.talkData}/>
			</div>
		)
	}
}

ChatContainer.propTypes = {
	className: PropTypes.string,
	talkData: PropTypes.instanceOf(List).isRequired
}

export default ChatContainer