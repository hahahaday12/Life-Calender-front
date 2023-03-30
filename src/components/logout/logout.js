import styled from 'styled-components';
import TokenRepository from '../../repository/TokenRepository';
import { fontsize } from '../../styles/Media/theme';

const LogoutBox = () => {
  
  const logOut = () => {
  TokenRepository.removeToken();
  };
  
  return(
    <>
    <Logout>
      <p><a href='/'onClick={logOut} alink="black">Logout</a></p>
    </Logout>
    </>
  )
};
export default LogoutBox

const Logout = styled.div`
  width: 100px;
  height: 40px;
  font-size: ${fontsize[2]};
  color: darkgray;
  background-color: white;
  border-radius: 25px;
  display: flex;
  position: relative;
  z-index: 50;
  left: 50px;
  
    :hover{
        background-color: #f8e7ff;
    }

    & p {
        width: 70px;
        height: 35px;
        margin-left: 19px;
        top: 10px;
        position: relative;
        color: black;
        font-weight: 600;
      }

    & a {
        text-decoration: none;    
    }
    
    & a:active{
        color: black;
    }
`