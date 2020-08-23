
const TOPIC_STATE = {
  page: 1,  // 请求的页数，即请求第几页的数据
  limit: 20, // 每一页的主题数量
  list: [], // 话题列表
  topicInfo: {

  },
  replies: [],
  admireState: false, //点赞状态
}

export default function topicList(prestate=TOPIC_STATE, action) {
  switch(action.type) {
    case 'getTopicList':
      return {...prestate, list: action.list, page: 1}
    case 'appendTopicList':
      return {
        ...prestate,
        list: prestate.list.concat(action.list),
        page: action.page
      }
    case 'getTopicInfo':
      return  {
        ...prestate, 
        replies: action.infoData.replies,
        topicInfo: {...action.infoData, replies: null}
      }
    case 'admireSuccess':
      return {...prestate, admireState: !prestate.admireState }
    default:
      return {...prestate}
  }
}