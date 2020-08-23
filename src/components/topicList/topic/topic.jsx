import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './topic.less'
import myTimeToLocal from '../../../utils/date'

class Topic extends Component {

  // 跳转到详情页;navigateTo跳转是webview的切换，不能跳转5层以上，否则微信端会认为该应用太复杂;
  gotoDetail(item) {
    Taro.navigateTo({
      url: '/pages/detail/index' + '?topicId=' + item.id
    })
  }
  render() {
    let { item } = this.props;
    return (
      <View className='topiclist-topic' onClick={this.gotoDetail.bind(this, item)}>
        <View className='head-img'>
          <Image src={item.author?item.author.avatar_url: ''} className='avatar-img' />
        </View>
        <View className='right'>
          <View className='topic-title'>
            {
              item.top?<Text className='topic-title-top'>置顶</Text>: 
              ( item.tab === 'share'?<Text className='topic-title-top share'>分享</Text>:
                (<Text className='topic-title-top ask'>问答</Text>)
              )
            }
            <Text>{item.title}</Text>
          </View>
          <View className='topic-info'>
            <Text>{item.author?item.author.loginname: ''}</Text>
            <Text>{item.reply_count + '/' + item.visit_count}</Text>
            <Text>{'创建时间: ' + (item.create_at?myTimeToLocal(item.create_at): '')}</Text>
          </View>
        </View>
      </View>
    )
  }
}

Topic.defaultProps = {
  item: {}
}

export default Topic