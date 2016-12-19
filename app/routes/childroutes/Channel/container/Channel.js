import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import SendBox from '../components/SendBox'
import ChatContainer from '../components/ChatContainer'
import Immutable from 'immutable'
import './layout.less'

class Channel extends Component {
	render() {
		return (
			<div className="layout-channel">
				<Header ChannelId={this.props.params.id}/>
				<ChatContainer className="chat-container" talkData={this.props.talkData}/>
				<SendBox/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
	  	talkData: Immutable.fromJS([
			{
				text:"123",
				imgSrc: "",
				"id": "123"
			},
			{
				text:"123",
				imgSrc: "",
				"id": "456"
			},
			{
				text:"123",
				imgSrc: "",
				"id": "123"
			}
		])
  	}
}

export default connect(mapStateToProps)(Channel)