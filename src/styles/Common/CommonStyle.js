import { css } from 'styled-components'
import { fontsize } from '../Media/theme'

export const AllLayout = css`
  //width:1535px;
  //height:720px;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #8EC5FC;
  background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
` 
export const LeftContainer = css`
  width: 250px;
  height: 720px;
  font-family: "Gaegu", serif;
  background-color: #8D9EFF;
  color: #545454;
`
export const InnerPlaceHolder = css`
  font-size: ${fontsize[1]};
  color: #7F8487;
  font-family: "Gaegu", serif;
  position: relative;
  left: 10px;
`
export const DateStyle = css`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  font-family: "Gaegu", serif;
  color: white;
  :hover{
    background-color: #8D9EFF;
  }
`
