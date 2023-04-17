import styled from 'styled-components';
import { fontsize } from '../../../../../styles/Media/theme';

const LogoIner = () => {
    return(
        <>
            <Img alt='logoimg' src='./img/Life Calander_logo.png'/>
            <P>Life Calendar</P>
        </>
    )
}
export default LogoIner;

const Img = styled.img`
    width: 40%;
    height: 180px;
    display: flex;
    position: relative;
    margin: 0 auto;
`

const P = styled.p`
    font-size: ${fontsize[4]};
    font-weight: 600;
    color: white;
    text-align: center;
    padding-top: 10px;
`


