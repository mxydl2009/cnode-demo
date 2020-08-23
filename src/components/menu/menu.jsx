import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './menu.less'
import menuIcon from '../../assets/imgs/menu-64.png'
import loginIcon from '../../assets/imgs/person-64.png'
import { showDrawer, changeCata, hideDrawer } from '../../actions/menu'
import { validateUserCache } from '../../actions/user'

// @connect()修饰器模式
@connect(
  function(state) {
    return { ...state.menu, user: state.user }
  }, 
  function(dispatch) {
    // dispatch已经被redux-thunk中间件异步改造了，可以发action，也可以传入函数来执行异步操作
    return {
      // 这里采用了ES6的对象方法简写方式showMenu: function() {}
      showMenu() {
        dispatch(showDrawer())
      },
      changeTitle(currentCata) {
        dispatch(changeCata(currentCata))
      },
      hideMenu() {
        dispatch(hideDrawer())
      }
    }
  }
)
class Menu extends Component {

  // 显示菜单
  showDrawer() {
    this.props.showMenu && this.props.showMenu()
  }
  getItems(cataData) {
    return cataData.map(item => item.subject);
  }
  clickCata(index) {
    let { cataData, currentData } = this.props;
    let clickCata = cataData[index];
    // 当前主题与点击选择主题不同时，才去发出请求;
    if(clickCata.title !== currentData.title) {
      this.props.changeTitle && this.props.changeTitle(clickCata);
    }
  }
  closeDrawer() {
    this.props.hideMenu && this.props.hideMenu()
  }
  toUser() {
    let { user } = this.props;
    validateUserCache(user, 
      // 用户缓存存在，跳转到用户详情页
      () => {
        Taro.navigateTo({
          url: '/pages/user/user'
        })
      }, 
      // 用户缓存不存在，跳转到登录页
      () => {
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }
    )
  }
  render() {
    let { showDrawer, cataData } = this.props;
    let items = this.getItems(cataData)
    return (
      <View className='topiclist-menu'>
        <View className='drawer'>
          <AtDrawer 
            show={showDrawer}
            items={items}
            onItemClick={this.clickCata.bind(this)}
            onClose={this.closeDrawer.bind(this)}
          ></AtDrawer>
        </View>
        <Image src={menuIcon} className='image'
          onClick={this.showDrawer.bind(this)}
        />
        <Text>{this.props.currentData? this.props.currentData.subject: ''}</Text>
        <Image src={loginIcon} className='image' onClick={this.toUser.bind(this)} />
        
      </View>
    )
  }
}

export default Menu