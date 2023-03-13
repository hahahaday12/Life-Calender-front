import { css }from 'styled-components';
import { fontsize } from '../../../Media/theme';

export const InputWrapStyle = css`
  height: 22px;
  display: flex;
  & input {
    width: 220px;
    border: none;
    font-family: "Gaegu", serif;
    border-bottom: 1px solid #474747;
    margin-right: 15px;
    padding-left: 10px;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #AFAFAF;
    }
  }
  & .faPlus {
    color: white;
    border-radius: 20px;
    width: 18px;
    height: 18px;
    padding: 3px;
  }
`
export const BoxSize = css`
  height: 600px;
  padding: 35px;
  background-color: white;
  position: relative;
`

export const InnerTextStyle = css`
  width: 200px;
  height: 22px;              
  font-size: ${fontsize[2]};
  font-weight: 800;
  display: flex;
  text-align: center;
  align-items: center;
  margin-left: 10px;
  justify-content: space-between;
`
export const IconStyle = css`
    .iconBox {
      width: 60px;
      height: 30px;
      display: flex;
      align-items: center;
      color: white;
      gap: 15px;

      .XIcon {
        width: 17px;
        height: 17px;
        
      }
    }
`
