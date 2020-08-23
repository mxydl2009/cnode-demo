import { setCache, getCache } from '../utils/cache'

const user_cache = 'user_cache';
const user_cached = getCache(user_cache);// 读取缓存数据
// 用户相关的state和Reducer
const USER_STATE = {
  ...user_cached
}

export default function user(prestate=USER_STATE, action) {
  switch(action.type) {
    case 'loginSuccess':
      let user_success_state = {
        ...prestate, 
        ...action.payLoad
      }
      setCache(user_cache, user_success_state);
      return user_success_state
    case 'loginFail':
      let user_fail_state = {
        ...prestate, 
        ...action.payLoad
      }
      setCache(user_cache, user_fail_state)
      return user_fail_state
    default:
      return { ...prestate }
  }
}