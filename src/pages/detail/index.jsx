import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicInfo, admireTopic, replyContent } from '../../actions/topicList'
import TopicInfo from '../../components/topicInfo/topicInfo'
import Replies from '../../components/topicInfo/replies'
import user from '../../reducers/user'
import ReplyContent from '../../components/topicInfo/replyContent'
import './detail.less'
import { validateUserCache } from '../../actions/user'

@connect(
  function(state) {
    return { 
      topicInfo: state.topicList.topicInfo,
      replies: state.topicList.replies,
      user: state.user,
      admireState: state.topicList.admireState, // 需不需要再次请求数据的标志位;
    }
  }, 
  function(dispatch) {
    return {
      getTopicDetail(params) {
        dispatch(getTopicInfo(params))
      },
      admireTopicStart(params) {
        dispatch(admireTopic(params))
      }
    }
  }
)
class Detail extends Component {

  // 由于回复组件<ReplyContent>只在Detail组件内，不会与外部组件通信，因此用Detail组件自身的state来控制，不需要Redux管理
  state = {
    showReplyContent: false, // 控制回复组件的展示的标志位
    currentReply: null
  }
  componentDidMount() {
    this.getDetail();
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.admireState !== nextProps.admireState) {
      // 只要点击点赞的图标，admireState就发生变化，然后重新请求后端数据。
      // 具体是哪个评论被点赞了, 是点赞过程中action发出的post请求，由服务器来更新。
      this.getDetail();
    }
  }  
  getDetail() {
    let { user } = this.props;
    let params = {
      id: this.$router.params.topicId,
      mdrender: true,
      accesstoken: user.accesstoken
    }
    this.props.getTopicDetail && 
    this.props.getTopicDetail(params);
  }

  config = {
    navigationBarTitleText: '话题详情'
  }

  componentDidShow () { }

  componentDidHide () { }

  admire(reply) {
    let { user } = this.props;
    let params = {
      replyId: reply.id,
      accesstoken: user.accessToken
    }
    // 判断用户是否登录，登录了才能点赞，没有登录则重定向到登录页
    validateUserCache(user, 
      () => {
        this.props.admireTopicStart && this.props.admireTopicStart(params);
      },
      () => {
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      }
    )
  }
  
  Reply() {
    let { user } = this.props;
    console.log(user);
    // 判断用户是否登录，登录了可以回复话题，没登录则重定向到登录页
    validateUserCache(user,
      () => {
        this.setState({
          showReplyContent: true
        })
      },
      () => {
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      }  
    )
  }
  closeReplyContent() {
    this.setState({
      showReplyContent: false
    })
  }
  replySend(content) {
    // console.log(content);
    let userInfo = this.props.user;
    let { currentReply } = this.state;
    let reply_id = currentReply? currentReply.id: null;
    let preName = currentReply? '@' + currentReply.author.loginname + '  ': '' // 评论人的昵称
    let topicId = this.$router.params.topicId;
    let params = {
      accesstoken: userInfo.accessToken,
      content: preName + content,
      reply_id: reply_id
    }
    replyContent(params, topicId).then(result => {
      if(result) {
        this.getDetail();
        this.closeReplyContent();
      }
    }).catch(err => {
      Taro.showToast({
        title: '回复内容失败: ' + err.message,
        icon: 'none'
      })
    })
  }
  // 给子组件调用 
  replyToReply(reply) {
    let { user } = this.props;
    // 判断用户是否登录，登录了才能回复评论，没有登录则重定向到登录页
    validateUserCache(user,
      () => {
        this.setState({
          currentReply: reply,
          showReplyContent: true
        })
      },
      () => {
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      } 
    )
  }
  render () {
    let { topicInfo, replies, user } = this.props;
    let selfPublished = user.id === topicInfo.author_id;
    let { showReplyContent } = this.state;
    return (
      <View className='detail'>
        {
          showReplyContent?
          <ReplyContent
            onCancelReplyContent={this.closeReplyContent.bind(this)}
            onSendReplyContent={this.replySend.bind(this)}
          />:
          null
        }
        <TopicInfo 
          topicInfo={topicInfo}
          selfPublished={selfPublished}
        /> 
        <Replies 
          replies={replies}
          onAdmire={this.admire.bind(this)}
          onReplyToReply={this.replyToReply.bind(this)}
        />
        <Button className='reply-button' onClick={this.Reply.bind(this)}>回复</Button>
      </View>
    )
  }
}

export default Detail
