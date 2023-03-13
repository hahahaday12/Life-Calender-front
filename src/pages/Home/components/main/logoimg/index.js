import styled from 'styled-components';
import { media } from '../../../../../styles/Media/media';
import { fontsize } from '../../../../../styles/Media/theme';

const LogoIner = () => {
    return(
        <>
            <Img alt='logoimg' src='./img/Life Calander_logo.png'/>
            <P>Life Clendar</P>
        </>
    )
}
export default LogoIner;

const Img = styled.img`
    width: 180px;
    height: 180px;
    display: block;
    margin: 0 auto;
`

const P = styled.p`
    font-size: ${fontsize[4]};
    font-weight: 600;
    color: white;
    text-align: center;
    padding-top: 10px;
`


