import { Axios } from './@core';
import { API_URL } from '../Common/Common';


const PATH = '/user';

const AuthApi = {
  login: function ({ id, password }) {
    return Axios.post(API_URL + PATH + `/signin`, { id, password });
  },

  signup: function ({ id, password, name }) {
    return Axios.post(API_URL + PATH, { id, password, name });
  }
};
export default AuthApi;