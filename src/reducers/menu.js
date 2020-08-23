// 定义一个Menu组件使用的数据对象，用于在Reducer中操作数据
const MENU_STATE = {
  cataData: [
      { title: 'all', subject: '全部' },
      { title: 'good', subject: '精华' },
      { title: 'share', subject: '分享' },
      { title: 'ask', subject: '问答' },
      { title: 'job', subject: '招聘' },
      { title: 'dev', subject: '客户端测试' }
    ],
    currentData: {
        title: 'all',
        subject: '全部'
    },
    showDrawer: false
}

export default function menu(prestate=MENU_STATE, action) {
  switch(action.type) {
    // 显示菜单
    case 'showDrawer':
      return { ...prestate, showDrawer: true }
    // 隐藏菜单
    case 'hideDrawer':
      return { ...prestate, showDrawer: false }
    // 点击菜单项，切换首页标题
    case 'changeCata':
      return { ...prestate, currentData: action.currentData }
    default:
      return {...prestate};
    
  }
}