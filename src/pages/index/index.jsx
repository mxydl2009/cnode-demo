import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Menu from '../../components/menu/menu'
import TopicList from '../../components/topicList/topicList'
import './index.less'

class Index extends Component {

  componentDidMount() {}

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }  
  componentWillUnmount () { }
  config = {
    navigationBarTitleText: '首页'
  }

  componentDidShow () { }

  componentDidHide () { }



  render () {
    return (
      <View className='index'>
        <Menu></Menu>
        <TopicList></TopicList>
      </View>
    )
  }
}

export default Index
