import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText, Image } from '@tarojs/components'
import myTimeToLocal from '../../utils/date'
import './topicInfo.less'
import trash from '../../assets/imgs/trash-26.png'
import edit from '../../assets/imgs/edit-24.png'

class TopicInfo extends Component {

  editTopic() {
    Taro.redirectTo({
      url: '/pages/publish/publish?edit=1' // edit=1来表示是编辑话题
    })
  }
  render() {
    let { topicInfo, selfPublished } = this.props;
    return (
      <View className='topic-info'>
        <View className='topic-info-header'>
          <View className='topic-info-header-title'>
            {
              topicInfo.top?<Text className='topic-title-top'>置顶</Text>: 
              ( topicInfo.tab === 'share'?<Text className='topic-title-top share'>分享</Text>:
                (<Text className='topic-title-top ask'>问答</Text>)
              )
            }
            <Text>{topicInfo.title}</Text>
          </View>
          <View className='topic-info-header-pie'>
            <Text>{ myTimeToLocal(topicInfo.create_at) }</Text>
            <Text>{ topicInfo.author? topicInfo.author.loginname: '' }</Text>
            <Text>{ topicInfo.visit_count + '次浏览' }</Text>
          </View>
          {
            selfPublished ? 
            <View className='topic-info-header-img'>
              <Image 
                src={edit}
                style='width: 20Px; height: 20Px; min-width: 20Px;'
                className='topic-edit'
                onClick={this.editTopic.bind(this)}
              />
              <Image 
                src={trash}
                style='width: 20Px; height: 20Px; min-width: 20Px;'
                className='topic-delete'
              />
            </View>
            : null
          }
        </View>
        <View className='topic-info-body'>
          <RichText 
            nodes={topicInfo.content}
          />
        </View>
      </View>
    )
  }
}

TopicInfo.defaultProps = {
  topicInfo: {}
}

export default TopicInfo