import { combineReducers } from 'redux'
import menu from './menu'
import topicList from './topicList'
import user from './user'

//合并reducer为根reducer
export default combineReducers({
  menu,
  topicList,
  user,
})
