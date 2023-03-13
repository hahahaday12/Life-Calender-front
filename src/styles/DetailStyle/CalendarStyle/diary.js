import { css } from 'styled-components';
import { fontsize } from '../../Media/theme';

export const MediaImg = css`
  width: 80px;
  height: 80px;
  display: flex;
  position: relative;
  bottom: 20px;
  margin-left: 40px;
`
export const SideStyle = css`
  width: 250px;
  height: 180px;
  margin-top: 60px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  bottom: 5px;
  left: 1px;

  & .iconWrap {
    height: 40px;
    margin-bottom: 20px;
    border-radius: 10px;
    color: black;
    margin-left: 30px;
  }
`

export const MediaSide = css`
  width: 200px;
  height: 40px;
  position: absolute;
  left: 250px;
  bottom: 15px;
  display: -webkit-inline-box;

  & .iconWrap {
    display: flex;
    width: 50px;
    height: 40px;
    margin-bottom: 20px;
    color: black;
    margin-left: 10px;
  }
`
export const StyleItem = css`
    height: 50px;
    
    & .iconBox {
    border-radius: 9px;
    width: 185px;
    height: 40px;
    display: flex;
    font-size: ${fontsize[2]};
    align-items: center;

      & span {
        font-size: ${fontsize[1]};
        margin-left: 40px;
      }

      & p {
        margin-left: 10px;
      }
    }

    .active {
      color: white;
    }
`

export const MediaItem = css`
    height: 50px;
    display: flex;

  & .iconBox {
      border-radius: 9px;
      width: 39px;
      height: 40px;
      font-size: ${fontsize[2]};
      align-items: center;
      overflow: hidden;

    & span {
        font-size: ${fontsize[2]};
        margin-left: 15px;
      }

      & p {
        margin-left: 10px;
      }
  }
`