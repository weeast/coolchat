import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import Btn from 'APP/components/Btn'
import DetailIcon from '../components/DetailIcon'
import DetailMail from '../components/DetailMail'
import DetailName from '../components/DetailName'

import './layout.less'

class Detail extends Component {
	constructor(props) {
		super(props)

		this.setIcon = this.setIcon.bind(this)
		this.setName = this.setName.bind(this)
		this.setPwr = this.setPwr.bind(this)
		this.setMail = this.setMail.bind(this)
	}
	setIcon(icon) {

	}
	setName(name) {

	}
	setMail(mail) {

	}
	setPwr(e) {

	}
	render() {
		return (
			<div className="layout-user-detail">
				<div className="detail-title">
					<a 
						className="detail-goback iconfont icon-backicon"
						onClick={e => this.context.router.goBack()}/>
					<h2>个人设置</h2>
				</div>
				<div className="detail-wrap">
					<DetailIcon 
						icon={this.props.user.get("icon")}
						uploadFile={this.setIcon}/>
					<DetailName 
						name={this.props.user.get("name")}
						editName={this.setName}/>
					<div className="detail-password-wrap">
						<Btn 
							className="detail-password"
							text="修改密码"
							clickHandler={this.setPwr}/>
					</div>					
					<DetailMail 
						mail={this.props.user.get("mail")}
						editMail={this.setMail}/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {user: Immutable.fromJS({
		icon: 'http://placehold.it/240x240',
		mail: '475097021@qq.com',
		name: 'weeast'
	})}
}

export default connect(mapStateToProps)(Detail)