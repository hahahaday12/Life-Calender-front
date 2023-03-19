import Axios from 'axios';
import { API_URL } from '../Common/Common';


const PATH = '/user';

const Login = ({id, password}) => {
  return Axios.post(API_URL + PATH + `/signin`, { id, password });  
};

const signup = async ({id, password, name}) => {
  return Axios.post(API_URL + PATH, { id, password, name });
};

const getCurrentUser = () => {
  return localStorage.getItem("token");
};

const AuthService = {
  Login,
  signup,
  getCurrentUser
};

export default AuthService;