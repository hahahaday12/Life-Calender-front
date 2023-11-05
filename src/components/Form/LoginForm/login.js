import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useInputs from '../../../hooks/useInputs';
import AuthService from '../../../service/auth.service';
import TokenRepository from '../../../repository/TokenRepository';
import { InnerPlaceHolder } from '../../../styles/Common/CommonStyle';
import { fontsize } from '../../../styles/Media/theme';
import { ShowAlert } from '../../../pages/alert';

const LoginInput = () => {
  const navigate = useNavigate();

  const [{ email, password }, onChangeForm] = useInputs({
    email: 'test12@gmail.com',
    password: 'Test123456789!',
  });

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        HandleLogin();
      }
    }
  };

  const HandleLogin = async () => {
    if (email === undefined || email === '' || email === null) {
      ShowAlert('이메일을 입력해주세요.', 'warning', '확인');
      return false;
    }

    if (password === undefined || password === '' || password === null) {
      ShowAlert('비밀번호를 입력해주세요.', 'warning', '확인');
      return false;
    }

    try {
      await AuthService.Login({ id: email, password }).then((res) => {
        if (res.status === 201) {
          TokenRepository.setToken(res);
          if (TokenRepository.getToken()) {
            ShowAlert('로그인되었습니다.', 'success', '확인').then(
              (isConfirmed) => {
                if (isConfirmed) {
                  navigate('/diary');
                }
              }
            );
          }
        }
      });
    } catch (error) {
      ShowAlert('로그인 실패했습니다.', 'warning', '확인').then(
        (isConfirmed) => {
          if (isConfirmed) {
            return false;
          }
        }
      );
    }
  };

  return (
    <LoginForm>
      <Inputbox>
        <input
          placeholder="test12@gmail.com"
          autoComplete="on"
          name={'email'}
          onChange={onChangeForm}
        />
      </Inputbox>
      <Inputbox>
        <input
          type={'password'}
          placeholder="Test123456789!"
          autoComplete="on"
          name={'password'}
          onChange={onChangeForm}
          onKeyDown={handleEnter}
        />
      </Inputbox>
      <InerButton onClick={HandleLogin}>로그인</InerButton>
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
    height: 45px;
    border: none;
    font-size: ${fontsize[0]};
    position: absolute;
    left: 25px;

    :-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #ffff inset;
    }
  }

  & input::placeholder {
    ${InnerPlaceHolder}
  }

  & input:focus {
    outline: none;
  }
`;
const Inputbox = styled.div`
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
  background-color: white;
`;

const InerButton = styled.button`
  width: 70%;
  height: 50px;
  border-radius: 15px;
  background-color: #7c83fd;
  border: none;
  color: white;
  font-family: 'Gaegu', serif;
  position: relative;
  bottom: 5px;
  left: 10%;
  text-align: center;
  font-size: ${fontsize[3]};
  cursor: pointer;
  margin: 0 auto;
  :hover {
    background-color: #5f67f8;
  }
`;
