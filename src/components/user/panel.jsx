import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import myTimeToLocal from '../../utils/date'
import './panel.less'

class Panel extends Component {
  
  toDetail(item) {
    Taro.navigateTo({
      url: '/pages/detail/index?topicId=' + item.id
    })
  }
  render() {
    let { listData, title } = this.props;
    return (
      <View className='topic-panel'>
        <View className='topic-panel-title'>{title}</View>
        {
          // 这里是不完善的，新注册用户根本没有发帖和回复，listData是空数组，这里会出错。
          listData.map(item => {
            return (
              <View 
                className='topic-panel-list' 
                key={item.id}
                onClick={this.toDetail.bind(this, item)}
              >
                <Image 
                  className='topic-panel-list-avatar'
                  src={item.author.avatar_url}
                />
                <Text className='topic-panel-list-title'>{item.title}</Text>
                <Text className='topic-panel-list-time'>{myTimeToLocal(item.last_reply_at)}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
Panel.defaultProps = {
  title: '',
  listData: []
}

export default Panel