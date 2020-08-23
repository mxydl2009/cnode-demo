import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Loginback from '../../assets/imgs/loginback.jpg'
import Person from '../../assets/imgs/person-30.png'
import './head.less'

class Head extends Component {

  render() {
    let { loginname, avatar_url } = this.props;
    return (
      <View className='login-head'>
        <Image 
          src={Loginback}
          className='login-head-back'
        />
        <Image 
          src={avatar_url? avatar_url: Person}
          className='login-head-user'
        />
        {
         loginname? <Text className='login-head-name'>{loginname}</Text>: null
        }
      </View>
    )
  }
}

export default Head