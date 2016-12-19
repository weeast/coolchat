import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UInput from 'APP/components/UInput/index';
import Btn from 'APP/components/Btn/index';



class Password extends Component {
	clickHandler() {
        
    }
    
	render() {
		return (
	    	<div className="md-auth md-auth-password">
		        <p className="des-tit">输入密码</p>
		        <UInput placeholder={this.props.placeholder}/>
		        <div className="control-group">
		          <Btn 
	                className="ui-primary-btn" 
	                text="下一步" 
	                clickHandler={this.clickHandler}/>
		        </div>
		        <div className="control-group">
		          新用户？<Link to="">注册</Link>
		        </div>
		    </div>
	    );
	}
}

function mapStateToProps() {
  return {placeholder: '请输入密码'};
}

export { Password }
export default connect(mapStateToProps)(Password);