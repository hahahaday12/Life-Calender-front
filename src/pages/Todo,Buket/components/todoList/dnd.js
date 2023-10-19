import styled from 'styled-components';
import {  Draggable, Droppable } from 'react-beautiful-dnd';
import {
  InnerTextStyle,
  IconStyle,
} from '../../../../styles/DetailStyle/ListStyle/common/common';
import {
  TodoListBox,
  TodooContainer,
} from '../../../../styles/DetailStyle/ListStyle/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Api from '../../../../apis/Api';
import { ShowAlert, ShowConfirm } from '../../../alert';

const DragandDrop = ({ Todo, columnId, column, Todolist }) => {
 
  const RemovetodoList = (idx) => {
    ShowConfirm('삭제하시겠습니까?', 'info').then((isConfirmed) => {
      if (isConfirmed) {
        Api.todoDelet(idx).then((response) => {
          if (response.data.message === 'successful') {
            ShowAlert('삭제 되었습니다😉', 'success');
            Todo(Todolist.date);
          } else {
            ShowAlert('삭제 실패', 'error');
          }
        });
      } else {
        ShowAlert('다시 선택해 주세요', 'info');
        return false;
      }
    });
  };

  return (
    <>
    <div className="ScorllBox">
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          return (
            <TodoListBox
              // 드롭 영역에 필요한 이벤트 핸들러와 속성
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? '#7A90E2' : '#7A90E2',
              }}
            >
              {column.items.map((item, index) => {
                return (
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
                              ? 'white'
                              : 'white',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <TodoInnerText>
                            {item.content}
                            <IconBox>
                              <FontAwesomeIcon
                                className="XIcon"
                                icon={faXmark}
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
    </>
  );
};
export default DragandDrop;

const TodoInnerText = styled.div`
  color: #7a90e2;
  ${InnerTextStyle};
`;

const IconBox = styled.div`
  margin-right: 20px;
  color: #7a90e2;
  ${IconStyle}
`;
