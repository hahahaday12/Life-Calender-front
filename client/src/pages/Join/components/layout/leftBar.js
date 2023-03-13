import styled from 'styled-components';
import { media } from '../../../../styles/Media/media';
import { fontsize } from '../../../../styles/Media/theme';

const ImgLayout = () => {
  return(
    <>
      <Imgbox>
        <img alt='logoimg' src= './img/Life Calander_logo.png'/>
        <ImgTextBox>
        <p>Life Calendar</p>
        </ImgTextBox>
      </Imgbox>
    </>
  )
};
export default ImgLayout;

const Imgbox = styled.div`
  width: 140px;
  height: 180px;
  position: relative;
  top: 100px;
  left: 60px;

  & img {
      width: 80px;
      height: 80px;
      display: block;
      margin: 0 auto;
      margin-bottom: 40px;
    }

  ${media.mobileS`    
    width: 140px;
    left:10px;
    top:75px;
    z-index:10;
  `}

  ${media.tablet`   
      width: 140px;
      left:50px;
      top:100px;
  `}

  ${media.desktopM`    
  width: 140px;
  left:50px;
  top:100px;
  `}

  ${media.desktopL`
  width: 140px;
  left: 60px;
  top:100px; 
  `}
`

const ImgTextBox = styled.div`
    width: 130px;
    height: 50px;
    position: relative;
    left: 30px;

   & p {
    width: 60px;
    height: 20px;
    text-align: center;
    color: white;
    font-size: ${fontsize[3]};
  } 

  ${media.mobileS`    
    display: none;
  `}
`






