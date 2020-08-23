import { getTopicList } from './topicList'

// showDrawer是一个Action生成器，返回一个函数用于执行异步操作
export function showDrawer() {
  return function(dispatch) {
    dispatch({
      type: 'showDrawer'
    })
  }
} 
// 顶部导航切换分类的Action 生成器
export function changeCata(currentData) {
  return async function(dispatch) {
    dispatch({
      type: 'changeCata',
      currentData
    })
    dispatch(getTopicList({
      page: 1,
      limitL: 20,
      tab: currentData.title,
      mdrender: true
    }))
  }
}
// 关闭抽屉的Action生成器
export function hideDrawer() {
  return function(dispatch) {
    dispatch({
      type: 'hideDrawer'
    })
  }
}