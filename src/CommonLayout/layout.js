import React from 'react'
import "../font/font.css"
import Sidebar from './sideBar';
import styled from 'styled-components';
import Usertitle from '../pages/user/user';
import LogoutBox from '../components/logout/logout';
import { media } from '../styles/Media/media';
import { fontsize } from '../styles/Media/theme';
import { MediaImg } from '../styles/DetailStyle/CalendarStyle/diary';


const Layout = ({ children }) => {
  return(
      <> 
      <AllBackGround>
        <LeftContainer>
          <img alt='logoimg' src= './img/Life Calander_logo.png'/>
          
          <Ip>Life <br/> Calendar</Ip>
          <Sidebar/>
        </LeftContainer>
        <HeaderBox>
          <Usertitle/>
          <LogoutBox/>
        </HeaderBox>
          <div>
            <div className="content"> {children} </div>
          </div>
      </AllBackGround>
      </>
    )
};
export default Layout;

const AllBackGround = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

    ${media.mobileS`
      width: 125vw;    
      height: 160vh;
    `}

    ${media.tablet`
      width: 125vw;   
      height: 930px;
    `}
    
    ${media.desktopM`    
      width: 100vw;   
      height: 100vh;
    `}
`

const LeftContainer = styled.div`
  width: 250px;
  height: 100%;
  color: #545454; 
  background-color: #8D9EFF;
  position: relative;
    
    & img {
      width: 80px;
      height: 80px;
      display: flex;
      position: relative;
      margin: 0 auto;
      margin-top: 100px;
      margin-bottom: 40px;
    }

    ${media.mobileS`    
      width: 515px;
      height: 80px;

        & img { 
          position: absolute;
          bottom: -30px;
          left: 40px;
          width: 60px;
          height: 60px;
        }
    `}
    
    ${media.tablet`   
      width: 250px;
      height: 100%;
        & img {
          ${MediaImg}
        }
    `}

    ${media.desktopM`   
      width: 250px;
      height: 100%;

        & img {
          ${MediaImg}
        }
    `}

    ${media.desktopL`
      width: 250px;
      height: 100%;

      & img {
        ${MediaImg}
      }
    `}
`

const HeaderBox = styled.div`
  width: 430px;
  display: flex;
  height: 40px;
  position: absolute;
  left: 40%;
  top:40px;

    ${media.mobileS`    
      top: 100px;
      left: 2%;
    `}

    ${media.tablet`   
      top: 5%;
      left: 40%;   
    `}
`
const Ip = styled.p`
  color: white;
  font-size: ${fontsize[3]};
  text-align: center;
  position: relative;
  
  
    
    ${media.mobileS`   
      width: 70px;
      margin-left: 150px;
      margin-top: 15px;
    `}

    ${media.tablet`
      margin-left: 80px;   
      text-align: center;
      position: relative;
    `}
`

