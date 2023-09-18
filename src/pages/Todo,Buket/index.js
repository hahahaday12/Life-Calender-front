import Layout from "../../CommonLayout/layout"
import TodoListForm from "./components/todoList/todoListForm";
import BuketList from "./components/BuketList/buket"
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { media } from "../../styles/Media/media";


const TodoBucketpage = () => {
  return (
    <>
      <Layout>
        <ListWrap>
           <DndProvider backend={HTML5Backend}>
          <TodoListForm/>
           <BuketList/>
           </DndProvider>
        </ListWrap>
      </Layout>
    </>
  )
}

export default TodoBucketpage;


const ListWrap = styled.div`
  width: 1000px;
  height: 700px;
  position: absolute;
  top: 70px;
  left: -1px;
  
  ${media.mobileS`
    width:501px;
    height: 783px;
    right: 250px;
    top: 190px;
  `}

  ${media.tablet`   
    display: flex;
    width: 900px;
    top: 140px;
    left: 300px;
    height: 700px;
    gap:-10px;
  `}


  ${media.desktopM` 
    width: 900px;   
    top: 160px;
    left: 450px;
    height: 700px;
  `}

  ${media.desktopL`
    height: 700px;
  `}
`