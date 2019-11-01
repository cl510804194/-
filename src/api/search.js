import axios from 'axios';
// 搜索某一股票
export async function search(id) {
  return axios({
    url: `/deafault/search/${id}`,
    method: 'get',
  });
}
// 监控某一股票
export async function jkAdd(id) {
  return axios({
    url: `/jk`,
    method: 'post',
    data: { gid: id },
  });
}
// 获取监控接口
export async function jkGet(id) {
  return axios({
    url: `/jk`,
    method: 'get',
  });
}
