import styled from 'styled-components';
import DiaryForm from "./components/DiaryList";
import Layout from "../../CommonLayout/layout"
import ColorForm from "./components/ColorList";
import { media } from '../../styles/Media/media';

const Fivepage = () => {
  return (
    <>
      <Layout>  
        <DiaryContainer>
          <ColorForm/>
          <DiaryForm/>
        </DiaryContainer>
      </Layout>
    </>
  )
};
export default Fivepage;

const DiaryContainer = styled.div`
  width: 800px;
  height: 720px;
  position: absolute;
  left: 500px;
  top: 100px;

  ${media.mobileS` 
    width: 490px;
    height: 1000px;   
    left: 1px;
    top: 150px;
  `}

  ${media.tablet`
    width: 1000px;
    height: 720px;   
    left: 300px;
    top: 100px;
  `}

  ${media.desktopM`
    width: 1200px;
    height: 720px;    
    left: 400px;
    top: 100px;
  `}
`