import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UInput from 'APP/components/UInput/index';
import Btn from 'APP/components/Btn/index';

let nextBtn = {
  className:'ui-primary-btn',
  text: "下一步",
  href: "/password",
}

class Register extends Component {
	clickHandler() {

	}
	render() {
		return (
	      	<div className="md-auth md-auth-Register">
		        <p className="des-tit">注册</p>
		        <div className="control-group">
		        	<UInput placeholder="用户名"/>
		        </div>
		        <div className="control-group">
		        	<UInput placeholder="邮箱"/>
		        </div>
		        <div className="control-group">
		        	<UInput placeholder="密码"/>
		        </div>
		        <div className="control-group">
		        	<UInput placeholder="再次输入密码"/>
		        </div>
		        <div className="control-group">
		          <Btn 
	                className="ui-primary-btn" 
	                text="注册" 
	                clickHandler={this.clickHandler}/>
		        </div>
		        <div className="control-group">
		          已有账号？<Link to="">登录</Link>
		        </div>
		    </div>
	    );
	}
}

function mapStateToProps() {
  return {};
}

export { Register }
export default connect(mapStateToProps)(Register);