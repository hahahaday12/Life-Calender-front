import styled from "styled-components";
import { Link } from 'react-router-dom';

function Error404() {
    return (
      <ErrorContainer>
        <ErrorHeader>
          <Img alt="errorlogo" src="./img/Life Calander_logo.png"/>
          <p>Life Calendar</p>
        </ErrorHeader>
        <NotFound>
        <p>해당 페이지를 찾지 못했습니다.</p>
        <p>주소가 잘못되었거나 더이상 제공되지 않는 페이지 입니다.</p>
        <Link style={{ textDecoration: 'none', color: '#7A90E2' }} to="/">
            <GoMain>메인페이지로 이동🏠🏃‍♀️</GoMain> 
        </Link>
        </NotFound>
        <ImgBox>
          <img alt="errorlogo" src="./img/cat.gif"/>
        </ImgBox>
      </ErrorContainer>
    );
  }
  export default Error404;

  const ErrorContainer = styled.div`
    width: 1500px;
    height: 800px;
    display: flex;
    position: relative;
    margin: 0 auto;
    margin-top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
  `
  const ErrorHeader = styled.div`
    width: 500px;
    height: 100px;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;

    & p {
      font-size: 50px;
      margin-left: 140px;
      margin-top: 15px;
    }
  `
  const Img = styled.img`
    width: 20%;
    height: 90px;
    display: flex;
    position: absolute;
    margin: 0 auto;
`

  const NotFound = styled.div`
    width: 700px;
    padding-bottom: 100px;
    position: absolute;
    top: 30%;

    & p {
      font-size: 50px;
    }

    & :nth-child(2) {
      width: inherit;
      margin-top: 40px;
      font-size: 35px;
    }
  `

  const GoMain = styled.div`
    width: 500px;
    margin-top: 40px;
    font-size: 40px;
  `

  const ImgBox = styled.div`
    padding-bottom: 30px;
    position: absolute;
    right: 0;
    margin-right: 150px;
    top: 100px;

    & img{
      width: 600px;
    }
  `