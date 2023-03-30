import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontsize } from '../../../styles/Media/theme';
const Join = () => {
    return(
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/twopage">
            <LoginText>회원가입</LoginText> 
        </Link>
    )
};
export default Join;

const LoginText = styled.div`
    left: 50%;
    width: 150px;
    position: absolute;
    font-size: ${fontsize[2]};
    text-align: right;
    color: white;
    margin-top: 3%;
`