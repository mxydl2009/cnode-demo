import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Textarea } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './replyContent.less'

class ReplyContent extends Component {

  state = {
    value: ''
  }
  sendReply() {
    if(this.state.value) {
      this.props.onSendReplyContent && this.props.onSendReplyContent(this.state.value);
    } else {
      Taro.showToast({
        title: '请输入回复内容',
        icon: 'none'
      })
    }
  }
  cancelReply() {
    this.props.onCancelReplyContent && this.props.onCancelReplyContent();
  }
  changeContent(event) {
    let text;
    if(event && event.target) {
      text = event.target.value;
      this.setState({
        value: text
      })
    }
  }
  render() {
    return (
      <View className='reply-content'>
        <Textarea 
          placeholder='请输入回复内容' 
          className='reply-content-text'
          onInput={this.changeContent.bind(this)}  
        ></Textarea>
        <View className='reply-btn-group'>
          <Button 
            className='reply-btn-ok'
            onClick={this.sendReply.bind(this)}
          >回复</Button>
          <Button 
            className='reply-btn-cancel'
            onClick={this.cancelReply.bind(this)}
          >取消</Button>
        </View>
      </View>
    )
  }
}

export default ReplyContent