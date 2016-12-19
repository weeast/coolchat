import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Map } from 'immutable'

import './view.less'

class SearchInput extends Component {
	constructor(props) {
		super(props)

		// 初始化state
		this.state = {searching: false, typing: false}

		// 绑定this
		this.clickHandler = this.clickHandler.bind(this)
		this.typeHandler = this.typeHandler.bind(this)
		this.cancelHandler = this.cancelHandler.bind(this)
	}
	// 点击搜索按钮
	clickHandler(e) {
		if(!this.state.searching && this.props.begin){
			this.setState({searching: true, typing: false})
			this.searchInput.focus()
			this.props.begin()
		} else if(this.state.searching && this.props.search){
			let text = this.searchInput.value
			let search = true
			this.props.search({text, search})
		}
	}
	// 输入文本
	typeHandler(e) {
		let text = e.target.value
		let typing = true
		if(!!text) 
			this.setState({ typing })
		if(this.props.search)
			this.props.search({text, typing})
	}
	// 取消搜索
	cancelHandler(e) {
		// 保证丢失触发在点击搜索之后
		setTimeout(() => {
			this.searchInput.value = ""
			this.setState({searching: false, typing: false})
			if(this.props.cancel)
				this.props.cancel()
		})
	}
	render() {
		return (
			<div className="md-userhead-search">
				<a 
					className="iconfont icon-search" 
					href="javascript:;" 
					onClick={ this.clickHandler }>
				</a>
				<input 
					className={`search-input ${this.state.searching?"searching":""}`}
					type="text"
					onChange={ this.typeHandler }
					onBlur={ this.cancelHandler }
					placeholder="搜索频道、用户"
					ref={(input) => this.searchInput = input} />
				<a 
					className={`cancel-btn ${this.state.typing?"typing":""}`}
					href="javascript:;" 
					onClick={ this.cancelHandler }>
					x
				</a>
			</div>
		)
	}
}

SearchInput.propTypes = {
	begin: React.PropTypes.func.isRequired,
	search: React.PropTypes.func,
	cancel: React.PropTypes.func
}

export default SearchInput