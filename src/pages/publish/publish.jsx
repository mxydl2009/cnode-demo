import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Input, Textarea, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { publishTopic, updateTopic } from '../../actions/topicList'
import './publish.less'

@connect(
  function(state) {
    return {
      ...state.menu,
      ...state.user,
      topicInfo: state.topicList.topicInfo
    }
  }
)
class Publish extends Component {

  state = {
    selectedCata: '话题分类',
    title: '',
    content: '',
    isEdit: false
  }
  componentDidMount() {
    let { edit } = this.$router.params;
    let { topicInfo } = this.props;
    let isEdit = edit === '1';
    this.setState({
      // 编辑状态下，给state赋值;
      isEdit: isEdit,
      topicInfo: topicInfo,
      title: isEdit? topicInfo.title: '',
      content: isEdit? topicInfo.content: '',
      selectedCata: isEdit? topicInfo.tab: '话题分类'
    })
  }
  // 选择分类
  changeCata(event) {
    let { cataData } = this.props;
    this.setState({
      selectedCata: cataData[event.detail.value].subject
    })
  }
  // 填入标题
  titleChange(event) {
    this.setState({
      title: event.target.value,
    })
  }
  // 填入正文
  contentChange(event) {
    this.setState({
      content: event.target.value
    })
  }
  // 提交话题
  submitTopic() {
    let { accesstoken } = this.props;
    let { title, content, selectedCata, isEdit, topicInfo } = this.state;
    if(selectedCata && title && content) {
      let params = {
        tab: 'dev',
        title,
        content,
        accesstoken,
        id: topicInfo.id
      }
      // 编辑状态的话题提交
      if(isEdit) {
        updateTopic(params).then(data => {
          if(data.success) {
            Taro.navigateBack();
          } else {
            Taro.redirectTo({
              url: '/pages/user/user'
            });
          }
        })
      } else {
        // 非编辑状态的话题提交
        publishTopic(params).then(data => {
          if(data.success) {
            Taro.redirectTo({
              url: '/pages/user/user'
            });
          } else {
            Taro.redirectTo({
              url: '/pages/user/user'
            });
          }
        })
      }
    } else {
      Taro.showToast({
        title: '分类或标题、正文都不能为空',
        icon: 'none'
      })
    }
  }
  render() {
    let { cataData } = this.props;
    let { selectedCata, topicInfo, isEdit, title, content } = this.state;
    // console.log(topicInfo)
    return (
      <View className='publish-topic'>
        <Picker 
          mode='selector' range={cataData} 
          rangeKey='subject'
          onChange={this.changeCata.bind(this)}
        >
          <View className='publish-topic-cata'>{ selectedCata }</View>
        </Picker>
        <Input 
          placeholder='请输入标题'
          onInput={this.titleChange.bind(this)}
          className='publish-topic-title'
          value={title}
        />
        <Textarea 
          placeholder='请输入正文'
          className='publish-topic-content'
          onInput={this.contentChange.bind(this)}
          value={content}
        />
        <Button className='publish-topic-submit' onClick={this.submitTopic.bind(this)}>提交</Button>
      </View>
    )
  }
}

export default Publish