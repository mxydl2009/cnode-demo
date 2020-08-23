import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Input, Button } from '@tarojs/components'
import Head from '../../components/head/head'
import { validateToken } from '../../actions/user'
import './login.less'

@connect(
  function(state) {
    return {
      user: state.user
    }
  },
  function(dispatch) {
    return {
      validateUserToken(params) {
       return dispatch(validateToken(params))
      }
    }
  }  
)
class Login extends Component {

  state = {
    token: ''
  }
  config = {
    navigationBarTitleText: '用户登录'
  }
  changeToken(event) {
    if(event && event.target) {
      this.setState({
        token: event.target.value
      })
    }
  }
  loginToken() {
    if(this.state.token) {
      this.props.validateUserToken && 
      this.props.validateUserToken({
        accesstoken: this.state.token
      }).then(data => {
        if(data.success) {
          Taro.redirectTo({
            url: '/pages/user/user'
          })
        } else {
          Taro.showToast({
            title: '登录失败，请稍后重试',
            icon: 'none'
          })
        }
      })

    } else {
      Taro.showToast({
        title: '请输入accessToken',
        icon: 'none'
      })
    }
  }
  render() {
    return (
      <View className='login-body'>
        <Head />
        <View className='login-form'>
          <Input 
            placeholder='请输入accesstoken'
            className='login-access'
            onInput={this.changeToken.bind(this)}
          />
          <Button 
            className='login-btn'
            onClick={this.loginToken.bind(this)}
          >登录</Button>
        </View>
      </View>
      )
  }
}

export default Login