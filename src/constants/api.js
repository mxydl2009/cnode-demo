const rootPath = 'https://cnodejs.org/api/v1';
const apiObject = {
    getTopics: rootPath + '/topics', // 获取话题列表
    getTopicInfo: rootPath + '/topic/', // 获取话题详情
    checkUserToken: rootPath + '/accesstoken', // 验证用户token
    getUserInfo: rootPath + '/user/', // 获取用户信息，动态接口
    createTopic: rootPath + '/topics', // 创建话题
    replyTopic: rootPath + '/topic/', // 回复话题消息，动态接口
    thumbupReply: rootPath + '/reply/', // 点赞，是动态接口
    collectTopic: rootPath + '/topic_collect/collect',
    updateTopic: rootPath + '/topics/update' // 对已发布的话题进行更新
}
export default apiObject