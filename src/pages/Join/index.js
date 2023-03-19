import styled from 'styled-components';
import Title from './components/layout/header/title';
import Joininput from '../../components/Form/JoinForm/input';
import ImgLayout from './components/layout/leftBar';
import { LeftContainer, AllLayout, InnerPlaceHolder } from '../../styles/Common/CommonStyle';
import { media } from '../../styles/Media/media';

const TwoPage = () => {
    return(
        <>
        <JoinLatout>
            <LeftBox>
                <ImgLayout/>
            </LeftBox>    

            <Joincontainer>
              <Title/>
                <Joinbox> 
                  <Joininput/>
                </Joinbox>
            </Joincontainer>
        </JoinLatout>
        </>
    )
};
export default TwoPage;

const JoinLatout = styled.div`
  ${AllLayout}

  ${media.mobileS`    
    width: 100vw;
    height: 100vh;
  `}

  ${media.tablet`   
    width: 100vw;
    height: 100vh;
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
const LeftBox = styled.div`
  ${LeftContainer}

  ${media.mobileS`
    width:1px;
    height: 100%;
  `}

  ${media.tablet`
    width: 250px;
    height: 100%;  
  `}

  ${media.desktopM`
    width: 250px;
    height: 100%;
  `}

  ${media.desktopL`
    width: 250px;
    height: 100%;
  `}
`

const Joincontainer = styled.div`
  width: 495px;
  height: 655px;
  position: absolute;
  display: flex;
  background-color: #8D9EFF;
  bottom: 40px;
  left: 630px; 

  ${media.mobileS`
    width: 424px;
    top: 50px;
    left: 1px;
  `}

  ${media.tablet`
    width: 495px;
    left: 500px;
  `}

  ${media.desktopM`
    top:100px;
    left: 600px;
  `}

  ${media.desktopL`
    top:100px;
    left: 750px;
  `}
`

const Joinbox = styled.div`
    width: 400px;
    height: 410px;
    display: flex;
    z-index: 30;
    left: 65px;
    top: 150px;
    position:absolute;

    & input::placeholder {
      ${InnerPlaceHolder}
    }
    
    ${media.mobileS`
      left: 30px;
    `}

    ${media.tablet`
      left: 65px;
    `}
`