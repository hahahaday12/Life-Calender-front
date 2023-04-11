import React from 'react';
import {Navigate} from 'react-router-dom';
import AuthService from './service/auth.service';
import { ShowAlert  } from './pages/alert';
import axios from 'axios';

function PrivateRoute({component:Component, status:Status}){
    let result;
    let check = false;
    const access = AuthService.getCurrentUser();

    if(access){
        check = true; 
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    };

    if(check){ //토큰값이 있을때
        result = Component; // 해당 컴포넌트에
    }else{
        !Status ?  result = <Navigate to='/'{...ShowAlert("접근할수 없는 페이지 입니다.")}/> : result = Status
        // 조건이 참이면 결과 1 , 거짓이면 결과 2 수행 
    }
    return result;
};
export default PrivateRoute;



