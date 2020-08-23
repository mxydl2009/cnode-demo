import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Head from '../../components/head/head'
import Panel from '../../components/user/panel'
import { getUserInfo } from '../../actions/user'
import './user.less'

@connect(
  function(state) {
    return {
      ...state.user
    }
  }
)
class User extends Component {

  config = {
    navigationBarTitleText: '用户详情'
  }
  state = {
    recent_topics: [],
    recent_replies: []
  }
  componentDidMount() {
    getUserInfo({
      loginname: this.props.loginname
    }).then(data => {
      if(data.success) {
        this.setState({
          recent_topics: data.data.recent_topics,
          recent_replies: data.data.recent_replies
        })
      }
    })
  }
  publishTopic() {
    Taro.redirectTo({
      url: '/pages/publish/publish'
    })
  }
  render() {
    let { loginname, avatar_url } = this.props;
    let { recent_topics, recent_replies } = this.state;
    return (
      <View className='login-head'>
        <Head
          loginname={loginname}
          avatar_url={avatar_url}
        />
        <Panel 
          className=''
          listData={recent_topics}
          title='最近发布的话题'
        />
        <Panel 
          className=''
          listData={recent_replies}
          title='最近收到的回复'
        />
        <Button className='publish-btn' onClick={this.publishTopic.bind(this)}>发布话题</Button>
      </View>
    )
  }
}

export default User