// 用于缓存数据的方法
import Taro from '@tarojs/taro'

// 设置缓存
export function setCache(key, value) {
  let params;
  if(typeof value === 'object') {
    params = JSON.stringify(value)
  }
  Taro.setStorageSync(key, params);
}
// 读取缓存
export function getCache(key) {
   let result = Taro.getStorageSync(key);
   if(result) {
     result = JSON.parse(result);
   } else {
     return null;
   }
   return result;
}

