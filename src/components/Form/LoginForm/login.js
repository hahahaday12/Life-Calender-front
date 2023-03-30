import { useState } from 'react'
import styled from 'styled-components'
import  { useNavigate }  from 'react-router-dom';
import useInputs from '../../../hooks/useInputs'
import AuthService from '../../../service/auth.service';
import TokenRepository from '../../../repository/TokenRepository';
import { InnerPlaceHolder } from '../../../styles/Common/CommonStyle';
import { fontsize } from '../../../styles/Media/theme';

const LoginInput = () => {
  const navigate = useNavigate(); 
  const [{ email, password }, onChangeForm] = useInputs({
    email: '',
    password: '',
  });

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if(!e.shiftKey){
        HandleLogin();
      }
    }
  }

   const  HandleLogin  = async () => {
    if(email === undefined || email === ""  || email === null){
      alert("아이디 입력해주세요.");
      return false;
    }
    try {
        await AuthService.Login({ id:email, password })
        .then((res) => {
        if (res.status === 201) {
          TokenRepository.setToken(res);
          alert("로그인 되었습니다.")
          if (TokenRepository.getToken()) {
            navigate('/thirdpage');
          }
        }
        })
    } catch (error) {
        alert(error.response.data.errorMessage);
      };
    };

    return(
        <LoginForm>
          <div>
            <input
              placeholder="이메일을 입력하세요"
              autoComplete="on"
              name={'email'}
              onChange={onChangeForm}
              />
          </div>
          <div>
            <input
              type={'password'}
              placeholder="비밀번호를 입력하세요"
              autoComplete="on"
              name={'password'}
              onChange={onChangeForm}
              onKeyDown={handleEnter} 
              />
          </div>
            <InerButton onClick={HandleLogin}>
              로그인
            </InerButton>
        </LoginForm>
    );
};
export default LoginInput;

const LoginForm = styled.div`
    width: 70%;
    left: 18%;
    height: 220px;
    position: relative;
    margin-top: 50px;
  
   & input {
    width: 80%;
    height: 50px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 4px solid #afafaf;
    font-size: ${fontsize[0]};
    display: flex;
    position: relative;
    left: 5%;
    border-radius: 10px;
  }

  & input::placeholder {
    ${InnerPlaceHolder}
    
  }

  & input:focus {
    outline: none;
    border: 1px solid #7784cc;
    box-shadow: 0 0 0 0.1rem rgb(59 65 99 / 25%);
  }

`

const InerButton = styled.button`
  width: 70%;
  height: 50px;
  border-radius: 15px;
  background-color: #7C83FD;
  border: none;
  color: white;
  font-family: "Gaegu", serif;
  position: relative;
  bottom:5px;
  left: 10%;
  text-align: center;
  font-size: ${fontsize[3]};
  cursor: pointer;
  margin: 0 auto;
  :hover{
    background-color: #5f67f8;
  }


  
`