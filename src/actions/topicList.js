import Taro from '@tarojs/taro'
import { getJSON, postJSON } from '../utils/request'
import api from '../constants/api'

// 获取话题列表的Action生成器，参数为对象，包含page, tab(主题分类), limit, mdrender(boolean) 
export function getTopicList(params) { // 请求首页数据
  return async function(dispatch) {
    let result = await getJSON(api.getTopics, params)
    if(result && result.data) {
      if(result.data.success) {
        dispatch({
          type: 'getTopicList',
          list: result.data.data
        })
      }
    }
  }
}
// 请求下一页的数据
export function getNextList(params) {
  return async function(dispatch) {
    let result = await getJSON(api.getTopics, params)
    if(result && result.data) {
      if(result.data.success) {
        // 对请求下一页的数据是否存在做判断，因为数据来源并未明确提供总页数（实际上也无法提供）
        if(result.data.data.length > 0) {
          dispatch({
            type: 'appendTopicList',
            list: result.data.data,
            page: params.page
          })
        }
      }
    }
  }
}
// 请求话题详情
export function getTopicInfo(params) {
  return async function(dispatch) {
    let result = await getJSON(api.getTopicInfo + params.id, params)
    if(result && result.data && result.data.success) {
      dispatch({
        type: 'getTopicInfo',
        infoData: result.data.data
      })
    } else {
      Taro.showToast({
        title: '请求话题详情失败，请稍后重试',
        icon: 'none'
      })
    }
  }
}
// 对某条评论赞赏, CNode社区关闭了post /api/v1/reply/:topicId/ups的接口了;
export function admireTopic(params) {
  return async function(dispatch) {
    let result = await postJSON(api.thumbupReply + params.replyId + '/ups', params);
    if(result) {
      // console.log('对评论赞赏');
      console.log(result);
      dispatch({
        type: 'admireSuccess'
      })
    } else {
      console.log('点赞失败');
      Taro.showToast({
        title: '点赞失败',
        icon: 'none'
      })
    }
  }
}

// 对某个话题进行回复
export async function replyContent(params, topicId) {
  let result = await postJSON(api.replyTopic + topicId + '/replies', params);
  if(result && result.data) {
    console.log(result);
    return result.data;
  } else {
    Taro.showToast({
      title: '回复失败',
      icon: 'none'
    });
  }    
  return false;
}
// 对某个话题收藏
export async function collectTopic(params) {
  let result = await postJSON(api.collectTopic, params);
  if(result && result.data && result.data.success) {
    console.log(result);
    return result.data;
  } else {
    Taro.showToast({
      title: '回复失败',
      icon: 'none'
    });
  }    
  return false;
}
// 发布话题
export async function publishTopic(params) {
  let result = await postJSON(api.createTopic, params);
  if(result && result.data && result.data.success) {
    return result.data;
  } else {
    Taro.showToast({
      title: '发布话题失败',
      icon: 'none'
    });
  }    
  return false;
}
// 更新话题
export async function updateTopic(params) {
  let result = await postJSON(api.updateTopic, params);
  if(result && result.data && result.data.success) {
    return result.data;
  } else {
    Taro.showToast({
      title: '更新话题失败',
      icon: 'none'
    });
  }    
  return false;
}