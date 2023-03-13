import styled from 'styled-components';
import { fontsize } from '../../../../../styles/Media/theme';

const Title = () => {
    return(
        <>
        <Titlebox>
            <Inertext>Join</Inertext>
        </Titlebox>
        </>
    )
};
export default Title;

const  Titlebox = styled.div`
    width: 170px;
    height: 100px;
    background-color: #8D9EFF;
    display: flex;
    position: absolute;
    margin: 0 auto;
    z-index: 20;
    top: 40px;
    left: 170px;
`
const Inertext = styled.div`
    font-size: ${fontsize[6]};
    height: 50px;
    margin-top: 10px;
    margin-left: 30px;
    color: white;
`

