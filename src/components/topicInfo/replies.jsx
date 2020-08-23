import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './replies.less'
import myTimeToLocal from '../../utils/date'
import thumbsupFull from '../../assets/imgs/thumbs-up-full-24.png'
import thumbsupEmpty from '../../assets/imgs/thumbs-up-empty-24.png'

const isWeapp = process.env.TARO_ENV === 'weapp' // 判断是否是小程序环境

class Replies extends Component {

  admire(reply) {
    // 调用父组件传递的方法来实现点赞功能;
    this.props.onAdmire && this.props.onAdmire(reply);
  }
  replyToReply(reply) {
    this.props.onReplyToReply && this.props.onReplyToReply(reply);
  }

  render() {
    let { replies } = this.props;
    return (
      <View className='topic-info-replies'>
        {
        replies.map((item, index) => {
         return (
           <View className='topic-info-reply' key={item.id}>
             <View className='topic-info-reply-image'>
               <Image className='topic-info-reply-image-avatar' src={item.author? item.author.avatar_url: ''} />
             </View>
             <View className='topic-info-reply-right'>
              <View className='topic-info-reply-right-body'>
                <View className='topic-info-reply-right-pie'>
                  <Text className='topic-info-reply-right-pie-loginname'>{item.author? item.author.loginname: ''}</Text>
                  <Text className='topic-info-reply-right-pie-floor'>{(index + 1) + '楼'}</Text>
                  <Text className='topic-info-reply-right-pie-time'>{myTimeToLocal(item.create_at)}</Text>
                </View>
                <View className='topic-info-reply-right-content'>
                  {
                    isWeapp? <RichText nodes={item.content} />
                    : <View dangerouslySetInnerHTML={{__html: item.content}}></View>
                  }
                </View>
              </View>
              <View className='topic-info-reply-right-thumbup'>
                <View className='topic-info-reply-right-image'>
                  <Image className='topic-info-reply-right-image-icon' 
                    src={item.is_uped? thumbsupFull: thumbsupEmpty} 
                    onClick={this.admire.bind(this, item)}
                  />
                </View>
                <Text className='topic-info-reply-right-thumbup-number'>{item.ups.length}</Text>
                <View className='topic-info-reply-right-image'>
                  <Image 
                    className='topic-info-reply-right-image-icon' 
                    src={require('../../assets/imgs/share-48.png')} 
                    onClick={this.replyToReply.bind(this, item)}
                  />
                </View>
              </View>
             </View>
           </View>
         )
        })
        }
      </View>
    )
  }
}

Replies.defaultProps = {
  replies: []
}

export default Replies