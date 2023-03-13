import { useState, forwardRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { API_URL } from '../../../../Common/Common';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus} from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import  { DateStyle}  from '../../../../styles/Common/CommonStyle';
import { BoxSize,InputWrapStyle, InnerTextStyle, IconStyle  } from '../../../../styles/DetailStyle/ListStyle/common/common';
import  {TodoListAllWrap, TodoWrap, TodoListBox, H2, TodooContainer}  from '../../../../styles/DetailStyle/ListStyle/todo';
import Api from '../../../../apis/Api';
import { media } from '../../../../styles/Media/media';
import { fontsize } from '../../../../styles/Media/theme';

const TodoListForm = () => {
  const [ ,setBtnStatus] = useState(false);
  const [ViewTodo, setViewTodo] = useState([]);
  const [Todolist, setTodoList] = useState({
    content:""
   ,date:""
   ,status: "todo"
  });
  const { content } = Todolist;

  useEffect(()=> {
    setTodoList({
      ...Todolist,
      date:new Date(),
    });
    Todo();
  },[]);

  const DatePick = forwardRef(({ value, onClick }, ref) => (
    <DateButton className='custom-btn' onClick={onClick} ref={ref}> {value} 
    </DateButton>
    ));
  
  const getChangeTodo = (e) => {
    const{name, value} = e.target;
    console.log(name,value);
    setTodoList({
      ...Todolist,
      [name]: value
    })
  };

  const Todo = (date) => {
    let now = new Date();
    if(date != null){
      // 값이 전달받은 시간으로 조회
      now = new Date(date);
    };

  let year = now.getFullYear();
  let month = now.getMonth()+1;
  let day = now.getDate();

  Api.todoGet(year, month, day)
  .then((response) => {

    let todoInfo = [];
    let doneInfo = [];

    //상태 값에 따라서 데이터를 나눔
    for(let i = 0; i<response.data.data.length;i++){
      console.log(response.data.data[i].status);
      if(response.data.data[i].status === "todo"){
        todoInfo.push(response.data.data[i]);
      }else{
        doneInfo.push(response.data.data[i]);
      }
    }
    setColumns({
      ...taskStatus,
      Todo: {
        name: "Todo",
        items: todoInfo
      },
      Done: {
        name: "Done",
        items: doneInfo
      }
    });
  })
};

  const RemovetodoList = (idx) => {
    if(window.confirm("삭제하시겠습니까?")){
      Api.todoDelet(idx)
      .then((response) => { 
      if(response.data.message === "successful"){
        alert('삭제 되었습니다😉');
        Todo(Todolist.date);
      } else {
        console.error(response.data.message);
      }
    });
    } else {
          alert("취소 되었습니다.")
      }
  };

  const DatePickChange = (date) => {
    console.log(date);
    setTodoList({
      ...date,
      'date': date
    })
    Todo(date)
  };

  const ChangeStatus = (id, status) => {
    //Api.todoPatch(id,status)
    axios.patch(API_URL+ '/todo/' + id,{
      status : status
    }).then((response) => {
      Todo(Todolist.date)
    });
  };

  const onClickTodo = () => {
    Api.todoPost(Todolist)
  .then((response) => {
      alert('등록 되었습니다.😊');
      setTodoList({
        content:""
        ,date:new Date(Todolist.date)
        ,status:"todo"
      })
      Todo(Todolist.date);
    });
  };

/**임시로 상태값 설정**/
  const [taskStatus, ] = useState({
    Todo: {
      name: "todo",
      items: []
    },
    Done: {
      name: "done",
      items: []
    }
  });
  const [columns, setColumns] = useState(taskStatus);

const onDragEnd = (result, columns, setColumns) => {
   if (!result.destination) return;
  const { source, destination } = result;
  
  //상태값이 변경되었을때
  if (source.droppableId !== destination.droppableId) {
    console.log(result);
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = 
      sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }, 
      });
       ChangeStatus(result.draggableId, destination.droppableId.toLowerCase());
    } else { //순서만 변경되었을때
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      onClickTodo();
    }
  };

  return (
    <>
      <TodoAllContainer>
        <div className="dateWrap">
          <div className="dateBox">
            <DatePicker
              value={Todolist}
              dateFormat="yyyy-MM-dd"
              selected={Todolist.date} 
              onChange={(date) => DatePickChange(date)}
              customInput={<DatePick/>}
            />
          </div>
        </div>
        <TodoInputWrap>
          <p>Todo List</p>
          <input
            type="text"
            placeholder="할 일을 추가해주세요"
            onChange={getChangeTodo}
            name='content'
            value={content}
            onKeyDown={handleEnter} 
          />
          <FontAwesomeIcon 
          className="faPlus" 
          icon={faPlus}
          onClick={onClickTodo}
          />
        </TodoInputWrap>

        <TodoListAllWrap>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
          {Object.entries(columns).map(([columnId, column]) => {
          return (
          <TodoWrap key={columnId}> 
            <H2>{columnId}</H2>
            
            <div className="ScorllBox" style={{ margin: 8}}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                  <TodoListBox
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                        background: snapshot.isDraggingOver
                        ? "#7A90E2"
                        : "#7A90E2", 
                    }}>
                        {column.items.map((item, index) => {
                      return(
                        
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                      {(provided, snapshot) => {
                        return (
                          <TodooContainer
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              backgroundColor: snapshot.isDragging
                              ? "white"
                              : "white",
                              ...provided.draggableProps.style  
                            }}
                          >   
                            <TodoInnerText>
                              {item.content}
                              <IconBox>
                                <FontAwesomeIcon className="XIcon" icon={faXmark}
                                  onClick={(e) => RemovetodoList(item._id, e)}
                                />
                              </IconBox>
                            </TodoInnerText>
                          </TodooContainer>
                        );
                      }}
                      </Draggable>
                      );
                    })}
                      {provided.placeholder}
                  </TodoListBox>
                  );
                }}
              </Droppable>
            </div>
          </TodoWrap>
          );
        })}
          </DragDropContext>
        </TodoListAllWrap>  
      </TodoAllContainer>
    </>
  )
};
export default TodoListForm;

const TodoAllContainer = styled.div`
  width: 540px;
  ${BoxSize}
  right: 30px;
  border-radius: 10px;
  & .dateWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  ${media.mobileS`    
    width: 500px;
    height: 500px;
    left: 2px;
  `}

  ${media.tablet`
    width: 450px;   
    height: 600px;
  `}

  ${media.desktopM`
    width: 540px;       
  `}
`
const DateButton = styled.button`
  background-color: #7A90E2;
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
const TodoInputWrap = styled.div`
  ${ InputWrapStyle }
  width: 403px;
  top: 8px;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 20px;
  
  & .faPlus {
    background-color: #7A90E2;
  }

  & p {
    font-size: ${fontsize[2]};
    color: #7A90E2;
    font-family: "Gaegu", serif;
    margin: 0;
    padding-top: 3px;
  }
`

const TodoInnerText = styled.div`
  color: #7A90E2;
  ${InnerTextStyle }
`

const IconBox = styled.div`
  margin-right: 20px;
  color: #7A90E2;
  ${ IconStyle }
`
