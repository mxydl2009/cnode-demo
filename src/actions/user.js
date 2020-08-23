import Taro from '@tarojs/taro'
import api from '../constants/api'
import { getJSON, postJSON } from '../utils/request'

// 验证用户输入的accessToken
export function validateToken(params) {
  return async function(dispatch) {
    let result = await postJSON(api.checkUserToken, params);
    if(result && result.data && result.data.success) {
      dispatch({
        type: 'loginSuccess',
        payLoad: {
          accesstoken: params.accesstoken,
          loginname: result.data.loginname,
          avatar_url: result.data.avatar_url,
          id: result.data.id 
        }
      })
      return result.data;
    } else {
      dispatch({
        type: 'loginFail',
        payLoad: null
      })
      return false;
    }
  }
}

// 查询用户详情，参数为loginname;
export async function getUserInfo(params) {
  let result = await getJSON(api.getUserInfo + params.loginname);
  console.log(result);
  if(result && result.data && result.data.success) {
    return result.data;
  } else {
    Taro.showToast({
      title: '获取用户信息失败',
      icon: 'none'
    })
    return false;
  }
}

// 验证用户信息是否在缓存中，在缓存中，表明用户登录，执行对应操作；不在缓存，用户未登录，跳转到登录页；
export function validateUserCache(params, existFunc, noExistFunc) {
  // 验证accesstoken如果存在，就认定用户信息在缓存中已有;
  if(params && params.accesstoken) {
    existFunc();
  } else {
    noExistFunc();
  }
}