import React from 'react'
import LogoIner from './logoimg'
import styled from 'styled-components'
import LoginInput from '../../../../components/Form/LoginForm/login'

import Join from '../../../../components/Button/Joinbutton/index'
import { AllLayout } from '../../../../styles/Common/CommonStyle'
import { media } from '../../../../styles/Media/media'
import './out.css'

const Onepage = () => {
    return(
        <>
        <Allwrap>
          
          <Centerwrap>
          <div className='shape'>
            <InBox>
            <LogoIner/>
            <LoginInput/>
            <Join/>
            </InBox>
          </div>
          </Centerwrap>
            
        </Allwrap>
        </>
    )
};
export default Onepage;

const Allwrap = styled.div`
  ${AllLayout}

  ${media.mobileS`    
    width: 102vw;
    height: 100vh;
    right: 10px;
  `}

  ${media.tablet`   
    width: 100vw;
    height: 100vh;
    right: 0px;
  `}

  ${media.desktopM`   
    width: 100vw;
    height: 100vh;
  `}

  ${media.desktopL`
    width: 100vw;
    height: 100vh;
  `}
`
const Centerwrap = styled.div`
  width: 550px;
  height: 700px;
  position: absolute;
  left: 20%;

  ${media.mobileS`
    width: 99%;
    left: 1%;
    top: 5%;
  `}

  ${media.mobileM`
    width: 550px;
    top: 15%;
    left: 35%;
    height: 75%;
  `}


  ${media.desktopL`
    top: 15%;
    right: 35%;
    left: 35%;
  `}
`
const InBox = styled.div`
  width: 80%;
  height: 80%;
  position: absolute;
  top: 100px;
  margin: auto;
  //background-color: yellow;

  ${media.mobileS`
    width: 80%;
    left: 10%;
  `}

  ${media.mobileM`
    top: 15%;
    //right: 35%;
    height: 75%;
  `}


  ${media.desktopL`
    left: 10%;
  `}

`