import Taro from '@tarojs/taro'
// import api from '../constants/api'

export function getJSON(url, data) {
  Taro.showLoading();
  return Taro.request({
    url: url,
    data: data,
    method: 'GET'
  }).then(result => {
    Taro.hideLoading();
    return result;
  })
}

export function postJSON(url, data) {
  return Taro.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/json'
    }
  })
}

// 测试API
// export async function getTopicList() {
//   const result = await getJSON(api.getTopics)
//     .catch(err => {console.log('error occured.', err)});
//   return result;
// }