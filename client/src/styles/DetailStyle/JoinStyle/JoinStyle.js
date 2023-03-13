import { css } from 'styled-components';
import styled from 'styled-components';
import { fontsize } from '../../Media/theme';

export const Back = css`
  font-size: ${fontsize[5]};
  text-decoration: none;
`

export const RegisterButton = styled.div`
  width: 110px;
  height: 40px;
  border-radius: 9px;
  background-color: #7C83FD;
  position: absolute;
  margin-top: 10px;
  right: 150px;
  border: none;
  color: white;
  font-size: ${fontsize[5]};
  cursor: pointer;
  :hover{
    background-color: #5f67f8;
  }
`
