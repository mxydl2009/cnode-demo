import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicList, getNextList } from '../../actions/topicList'
import Topic from './topic/topic'

@connect(
  function(state) {
    return {...state.topicList, currentData: state.menu.currentData}
  }, 
  function(dispatch) {
    return {
      getTopics(params) {
        dispatch(getTopicList(params))
      },
      getNextTopics(params) {
        dispatch(getNextList(params))
      }
    }
  }
)
class TopicList extends Component {

  componentDidMount() {
    let { page, limit, currentData } = this.props;
    this.props.getTopics && 
      this.props.getTopics({
        page: page,
        tab: currentData.title,
        limit: limit,
        mdrender: true
      })
  }
  // 滚动到底后触发分页请求;
  onScrollToBottom() {
    let { page, limit, currentData } = this.props;
    this.props.getNextTopics && 
      this.props.getNextTopics({
        page: page + 1,
        tab: currentData.title,
        limit: limit,
        mdrender: true
      })
  }
  render() {
    let scrollStyle = {
      height: '650Px'
    }
    let { list } = this.props; 
    return (
      <ScrollView
        style={scrollStyle}
        scrollY={true}
        onScrollToLower={this.onScrollToBottom.bind(this)}
      >
        {
          list.map(item => <Topic item={item} key={item.id} />)
        }
      </ScrollView>
    )
  }
}

export default TopicList