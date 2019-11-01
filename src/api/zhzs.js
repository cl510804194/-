import axios from 'axios';

export async function zhzs(id) {
  return axios({
    url: `/deafault/zhzs/${id}`,
    method: 'get',
  });
}
