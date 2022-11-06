import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUuid = () => {
  //从本地存储中获取uuid_token，看本地存储是否有
  let uuid_token = localStorage.getItem('uuid_token')
  //如果没有
  if(!uuid_token) {
    //生成一个随机字符串
    uuid_token = uuidv4()
    //本地存储中存储一次
    localStorage.setItem('uuid_token', uuid_token)
  }
  return uuid_token
}