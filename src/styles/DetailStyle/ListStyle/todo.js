import styled from 'styled-components';
import { media } from '../../Media/media';
import { fontsize } from '../../Media/theme';

export const TodoListAllWrap = styled.div`
  width: 380px;
  height: auto;
  display: flex;
  position: absolute;
  gap: 20px;
  right: 117px;

    ${media.mobileS`  
      right: 60px;
    `}

    ${media.tablet`   
      right: 75px;
    `}

    ${media.desktopM`    
      right: 117px;
    `}
`
export const TodoWrap = styled.div`
  display: flex;
  width: 250px;
  height: 400px;
  flex-Direction: column;
  align-items: center;
  background-color:#7A90E2;
  border-radius: 20px;
  position: relative;
  font-family: "Gaegu", serif;

  & .ScorllBox{
    overflow: auto;
    margin-top: 20px;
  }

  .ScorllBox::-webkit-scrollbar {
    width: 3px;  /* 스크롤바의 너비 */
  }

  .ScorllBox::-webkit-scrollbar-thumb {
    height: 5px; /* 스크롤바의 길이 */
    background: white; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  .ScorllBox::-webkit-scrollbar-track {
    background:#2F0F5D;  /*스크롤바 뒷 배경 색상*/
  }
 
    ${media.mobileS`    
      height: 300px;
      right:25px;
    `}
    
    ${media.tablet`   
      height: 400px;
      width: 203px;
      right: -20px;
    `}    
`
export const TodoListBox = styled.div`
  padding: 4px;
  width: 200px;
  height: 300px;
  position: relative;

  ${media.mobileS`
      height: 230px;
  `}

  ${media.tablet`    
    width: 200px;
    height: 295px;
  `}
`

export const H2 = styled.p`
  font-size: ${fontsize[4]};
  font-weight: 600;
  color: white;
`
export const TodooContainer = styled.div`
  user-Select: none;
  padding: 16;
  margin: 0 0 8px 0;
  min-Height: 50px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`