import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PwCheck, emailCheck } from '../../../Common/Common.js';
import AuthService from '../../../service/auth.service.js';
import { RegisterButton } from '../../../styles/DetailStyle/JoinStyle/JoinStyle.js';
import { fontsize } from '../../../styles/Media/theme.js';
import { ErrorHandle } from '../../../apis/@core.js';
import { ShowAlert } from '../../../pages/alert.js';

const Joininput = () => {
  const navigate = useNavigate();

  // 이름, 비밀번호, 이메일, 비밀번호 확인
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 유효성 검사 상태 및 메시지
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  const navigateToHome = () => navigate('/');

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      onSignUpSubmit();
    }
  };

  useEffect(() => {
    if (confirmPassword) {
      validatePasswordConfirm(password, confirmPassword);
    }
  }, [password, confirmPassword]);

  const validatePasswordConfirm = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 틀립니다. 다시 입력해주세요.');
      setIsPasswordConfirm(false);
    }
  };

  const onSignUpSubmit = () => {
    if (!email) {
      ShowAlert('이메일을 입력해주세요.', 'warning');
      return false;
    }

    if (!(isEmail && isPassword && isPasswordConfirm)) {
      ShowAlert('값이 잘못 되었습니다. 다시 입력해주세요', 'warning');
      return false;
    }

    try {
      AuthService.signup({ id: email, password, name })
        .then((res) => {
          if (res.status === 201) {
            ShowAlert('가입되었습니다.', 'success', '확인');
            navigateToHome();
          }
        })
        .catch((error) => {
          const err = ErrorHandle(error);
          ShowAlert(err);
        });
    } catch (err) {
      ShowAlert('system 오류입니다. 문의주세요.', 'error');
    }
  };

  const onChangeName = useCallback((e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    if (nameValue.length < 2 || nameValue.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식입니다 :)');
      setIsName(true);
    }
  }, []);

  const onChangeEmail = useCallback((e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (emailCheck(emailValue)) {
      setEmailMessage('올바른 이메일 형식이에요 : )');
      setIsEmail(true);
    } else {
      setEmailMessage('이메일 형식이 틀렸습니다');
      setIsEmail(false);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (!PwCheck(passwordValue)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )');
      setIsPassword(true);
    }
  }, []);

  //passwordConfirm 의 값이 변경될 때 호출
  const onRepassword = useCallback(
    (e) => {
      const passwordConfirmValue = e.target.value;
      setConfirmPassword(passwordConfirmValue);
      validatePasswordConfirm(password, passwordConfirmValue);
    },
    [password]
  );

  return (
    <JoinFrom>
      <Formbox>
        <input
          placeholder="이메일을 입력하세요"
          autoComplete="off"
          type="text"
          name="email"
          onChange={onChangeEmail}
        />
        {email.length > 0 && (
          <span className={`message ${isEmail ? 'success' : 'error'}`}>
            {emailMessage}
          </span>
        )}
      </Formbox>

      <Formbox>
        <input
          type="name"
          placeholder="이름을 입력하세요"
          autoComplete="off"
          name="name"
          onChange={onChangeName}
        />
        {name.length > 0 && (
          <span className={`message ${isName ? 'success' : 'error'}`}>
            {nameMessage}
          </span>
        )}
      </Formbox>
      <Formbox>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="off"
          name="password"
          onChange={onChangePassword}
        />
        {password.length > 0 && (
          <span className={`message ${isPassword ? 'success' : 'error'}`}>
            {passwordMessage}
          </span>
        )}
      </Formbox>
      <Formbox>
        <input
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          autoComplete="off"
          name="passwordConfirm"
          onChange={onRepassword}
          onKeyDown={handleEnter}
        />
        {confirmPassword.length > 0 && (
          <span
            className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
          >
            {passwordConfirmMessage}
          </span>
        )}
      </Formbox>
      <section>
        <RegisterButton
          type="submit"
          disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
        >
          <ButtonText onClick={onSignUpSubmit}>등록</ButtonText>
        </RegisterButton>
      </section>
      <Linkbox>
        <Link to="/">
          <ButtonInnerText>돌아가기</ButtonInnerText>
        </Link>
      </Linkbox>
    </JoinFrom>
  );
};
export default Joininput;

const JoinFrom = styled.form`
  width: 550px;
  height: 350px;
  margin: 40px;
`;
const Formbox = styled.div`
  position: relative;
  margin-bottom: 50px;
  text-align: center;
  width: 310px;
  height: 48px;
  right: 18px;
  border-radius: 10px;
  border-bottom: 4px solid #afafaf;
  background-color: #fff;

  & input {
    width: 250px;
    height: 40px;
    border: none;
    outline: none;
  }

  & input::placeholder {
    font-size: ${fontsize[2]};
    color: #ccc;
  }

  & input:focus {
    box-shadow: 0 0 0.1px 0.1px rgb(59 65 99 / 25%);
  }

  & .message {
    width: 350px;
    height: 40px;
    font-weight: 500;
    font-size: ${fontsize[3]};
    line-height: 24px;
    letter-spacing: -1px;
    position: absolute;
    top: 50px;
    left: -20px;
    z-index: 100;
    color: white;
    & .success {
      color: #8f8c8b;
    }
    & .error {
      color: #ff2727;
    }
  }
`;
const Linkbox = styled.div`
  left: 250px;
  width: 120px;
  height: 40px;
  text-decoration: none;
  display: flex;
  position: absolute;
  margin-top: 10px;

  a {
    text-decoration: none;
  }
`;
const ButtonText = styled.div`
  font-size: ${fontsize[2]};
  color: white;
  position: absolute;
  padding: 10px 40px;
`;
const ButtonInnerText = styled(ButtonText)`
  width: 140px;
`;
