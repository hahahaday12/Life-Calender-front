import DatePicker from 'react-datepicker';
import { useState, forwardRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../Common/Common';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  BoxSize,
  InputWrapStyle,
  InnerTextStyle,
  IconStyle,
} from '../../../../styles/DetailStyle/ListStyle/common/common';
import {
  TodoListAllWrap,
  TodoWrap,
  H2,
} from '../../../../styles/DetailStyle/ListStyle/todo';
import Api from '../../../../apis/Api';
import { media } from '../../../../styles/Media/media';
import { fontsize } from '../../../../styles/Media/theme';
import { ShowAlert } from '../../../alert';
import DragandDrop from './dnd';

const TodoListForm = () => {
  const [Todolist, setTodoList] = useState({
    content: '',
    date: '',
    status: 'todo',
  });
  const { content } = Todolist;

  useEffect(() => {
    setTodoList({
      ...Todolist,
      date: new Date(),
    });
    Todo();
  }, []);

  const DatePick = forwardRef(({ value, onClick }, ref) => (
    <DateButton className="custom-btn" onClick={onClick} ref={ref}>
      {value}
    </DateButton>
  ));

  const getChangeTodo = (e) => {
    const { name, value } = e.target;
    setTodoList({
      ...Todolist,
      [name]: value,
    });
  };

  const Todo = (date) => {
    let now = new Date();
    if (date != null) {
      // 값이 전달받은 시간으로 조회
      now = new Date(date);
    }

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    Api.todoGet(year, month, day).then((response) => {
      let todoInfo = [];
      let doneInfo = [];

      //상태 값에 따라서 데이터를 나눔
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].status === 'todo') {
          todoInfo.push(response.data.data[i]);
        } else {
          doneInfo.push(response.data.data[i]);
        }
      }
      setColumns({
        ...taskStatus,
        Todo: {
          name: 'Todo',
          items: todoInfo,
        },
        Done: {
          name: 'Done',
          items: doneInfo,
        },
      });
    });
  };

  // 드래그엔 드롭 되었을때 상태값이 변하게
  const ChangeStatus = (id, status) => {
    axios
      .patch(API_URL + '/todo/' + id, {
        status: status,
      })
      .then((response) => {
        Todo(Todolist.date);
      });
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;

    // source는 아이템이 원래 있던 위치 , destination은 아이템이 드롭된 위치
    const { source, destination } = result;

    //상태값이 변경되었을때
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      // 원본 배열 객체 복사
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      //상태값 변경
      ChangeStatus(result.draggableId, destination.droppableId.toLowerCase());
    } else {
      //순서만 변경되었을때
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      console.log(...(column.items + '!!!'));
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const DatePickChange = (date) => {
    setTodoList({
      ...date,
      date: date,
    });
    Todo(date);
  };

  const onClickTodo = () => {
    if (Todolist.content === '' || Todolist.content === ' ') {
      ShowAlert('공백으로 등록할수없습니다.', 'warning');
      return false;
    }
    Api.todoPost(Todolist).then((response) => {
      ShowAlert('등록 완료.😊', 'success');
      setTodoList({
        content: '',
        date: new Date(Todolist.date),
        status: 'todo',
      });
      console.log(Todo);
      Todo(Todolist.date);
    });
  };

  /*임시로 상태값 설정**/
  const [taskStatus] = useState({
    Todo: {
      name: 'todo',
      items: [],
    },
    Done: {
      name: 'done',
      items: [],
    },
  });
  const [columns, setColumns] = useState(taskStatus);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        onClickTodo();
      }
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
              customInput={<DatePick />}
            />
          </div>
        </div>
        <TodoInputWrap>
          <p>Todo List</p>
          <input
            type="text"
            placeholder="할 일을 추가해주세요"
            onChange={getChangeTodo}
            name="content"
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
                  <DragandDrop
                    Todo={Todo}
                    columnId={columnId}
                    column={column}
                    Todolist={Todolist}
                  />
              </TodoWrap>
              );
            })}
          </DragDropContext>
        </TodoListAllWrap>
      </TodoAllContainer>
    </>
  );
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
`;
const DateButton = styled.button`
  background-color: #7a90e2;
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  font-family: 'Gaegu', serif;
  color: white;
  :hover {
    background-color: #8d9eff;
  }
`;
const TodoInputWrap = styled.div`
  ${InputWrapStyle}
  width: 403px;
  top: 8px;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 20px;

  & .faPlus {
    background-color: #7a90e2;
  }

  & p {
    font-size: ${fontsize[2]};
    color: #7a90e2;
    font-family: 'Gaegu', serif;
    margin: 0;
    padding-top: 3px;
  }
`;

const TodoInnerText = styled.div`
  color: #7a90e2;
  ${InnerTextStyle}
`;

const IconBox = styled.div`
  margin-right: 20px;
  color: #7a90e2;
  ${IconStyle}
`;
