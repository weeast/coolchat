import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Map } from 'immutable'

import SearchInput from '../SearchInput'

import unlogIcon from './images/unlogin.png'

require('./view.less')

class UserHead extends Component {
	constructor(props) {
		super(props)

		this.state = {searching: false}

		this.beginSearchHandler = this.beginSearchHandler.bind(this)
		this.cancelSearchHandler = this.cancelSearchHandler.bind(this)
	}
	// 开始搜索
	beginSearchHandler(options) {
		this.setState({searching: true})
	}
	// 结束搜索
	cancelSearchHandler(){
		this.setState({searching: false})
	}
	render() {
		let user = this.props.user
		let headIconNode = user.get('loged') ? 
			<img src={ user.get('icon') } alt={ user.get('name') } />  
			: <img src={ unlogIcon } alt="点击登录" /> 
		return (
			<div className="md-user-head">
				<Link 
					className="icon-cont" 
					to={ user.get('loged') ? '/user/detail' : '/user/login' } > 
					{ headIconNode }
				</Link>
				<h1 className={this.state.searching?"searching":""}>CoolChat</h1>
				<SearchInput 
					begin={ this.beginSearchHandler }
					search={ this.props.search }
					cancel={ this.cancelSearchHandler } />
			</div>
		)
	}
}

UserHead.propTypes = {
	user: PropTypes.instanceOf(Map).isRequired,
	search: PropTypes.func
}

export default UserHead