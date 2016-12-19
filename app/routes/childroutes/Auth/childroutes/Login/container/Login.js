import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UInput from 'APP/components/UInput/index';
import Btn from 'APP/components/Btn/index';
import "./layout.less"

class Login extends Component {
    clickHandler() {
        
    }

    render() {
        return (
          <div className="md-auth md-auth-login">
            <p className="des-tit">用户名、邮箱或者手机号</p>
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
  return {placeholder:'用户名、邮箱或者手机号'};
}

export { Login }
export default connect(mapStateToProps)(Login);