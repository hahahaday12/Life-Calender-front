import Api from '../../../../apis/Api';
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,  faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef, useEffect} from 'react';
import { DateStyle} from '../../../../styles/Common/CommonStyle';
import { media } from "../../../../styles/Media/media";
import { BoxSize, InputWrapStyle, InnerTextStyle, IconStyle } from '../../../../styles/DetailStyle/ListStyle/common/common';
import { fontsize } from '../../../../styles/Media/theme';
import { ShowAlert, ShowConfirm } from '../../../alert';

const BuketList = () => {
  const [Viewcontent, setViewcontent] = useState([]);
  const [ViewData, setViewData] = useState({
    content:""
    ,date:""
  })
  const {content, date } = ViewData;

  const search = () => {
    Api.buketGet()
    .then((response) => {
    setViewcontent(response.data.data);
    })
  }; 

  useEffect(()=> {
    setViewData({
      date:new Date() 
    })
    search();
  },[])

  const DatePick = forwardRef(({ value, onClick }, ref) => (
    <Datebutton className='custom-btn'
      onClick={onClick} ref={ref}>
        {value}
    </Datebutton> 
  ));

  const RemoveBuketList = (idx) => {
    ShowConfirm("삭제하시겠습니까?", "info").then((isConfirmed) => {
      if(isConfirmed){
        Api.bucketDelete(idx)
        .then((response) => { 
          if(response.data.message === "successful"){
            ShowAlert("삭제 되었습니다", "success");
            search();
          } else {
            ShowAlert("삭제 실패","error");
          }
        });
      } else {
        ShowAlert("다시 선택해주세요","info");
        return false;
      }
    });
  };

  const getChangeBuket = (e) => {
    const{name, value} = e.target;
    setViewData({
      ...ViewData,
      [name]: value
    })
  };

  const onClickBucket = () => {
    if(ViewData.content === "" || ViewData.content === ""|| ViewData.content === undefined){
      ShowAlert("공백으로 등록할수없습니다.", "info");
      return false;
    }
    Api.buketPost(ViewData)
    .then((response) => {
      ShowAlert("등록 완료😊", "success");
      setViewData({
        content:""
        ,date:new Date()
      })
      search();
    })
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if(!e.shiftKey){
        onClickBucket();
      }
    }
  };
    
  return(
    <>
    <BuketWhiteBox>
        <div className="headerWrap">
          <div className="dateBox">
            <DatePicker
              value={date}
              dateFormat="yyyy-MM-dd"
              selected={ViewData.date}
              onChange={(date) => setViewData({
              ...ViewData,
              'date': date
              })}
              customInput={<DatePick/>}
            />
          </div>
          <p className="buketText">Bucket List</p>
          
          <BuketInputWrap>
            <input
              type="text"
              placeholder="버킷리스트를 추가해 주세요"
              onChange={getChangeBuket}
              name='content'
              value={content}
              onKeyDown={handleEnter}
            />
            <FontAwesomeIcon 
            className="faPlus" 
            icon={faPlus}
            onClick={onClickBucket}
            />
          </BuketInputWrap>
        </div>
        
        <div className="BuketScorll" >
          {Viewcontent.map((item) => (
            <Buket>
              <BucketInnerText>
              {item.content}
              </BucketInnerText>
              <div className="iconBox">
                <FontAwesomeIcon className="XIcon" 
                  icon={faXmark}
                  onClick={(e) => RemoveBuketList(item._id, e)}
                />
              </div>   
            </Buket>
          ))}
        </div>   
    </BuketWhiteBox>
    </>
  )
};
export default BuketList;

const BuketWhiteBox = styled.div`
  width: 350px;
  ${BoxSize}
  left: 600px;
  border-radius: 10px;

  & .headerWrap {
    margin: 0 auto;
    margin-bottom: 20px;  

    ${media.mobileS` 
     width: 250px;
     left: 10px;
     top: 60px;
     height: 130px;
    `}
  };
  
  & .buketText {
    text-align: center;
    font-size: ${fontsize[2]};
    font-family: "Gaegu", serif;
    color: #FFCCCC;
  };

  & .BuketScorll{
    overflow: auto;
    background-color:#FAF2F2;
    height:380px;
    border-radius:10px;

    ${media.mobileS` 
     width: 260px;
     position: absolute;
     left: 120px;
     top: 150px;
     height: 230px;
    `};

    ${media.tablet`
      left: 45px;   
      height:410px;
    `};

  };

  .BuketScorll::-webkit-scrollbar {
    width: 3px;  /* 스크롤바의 너비 */
  };

  .BuketScorll::-webkit-scrollbar-thumb {
    height: 5px; /* 스크롤바의 길이 */
    background:#FF9494; /* 스크롤바의 색상 */
    border-radius: 10px;
  };

  .BuketScorll::-webkit-scrollbar-track {
    background: #F3C5C5;
      /*스크롤바 뒷 배경 색상*/
  };

  ${media.mobileS`  
    width: 500px ;
    left: 1px;
    top: 50px;
    height: 380px;
  `};
    
  ${media.tablet`   
    width: 350px;
    ${BoxSize}
    left: 500px;
    position: absolute;
    top: 0px;
  `};

  ${media.desktopM`    
    left:700px;
  `};
`
const Datebutton = styled.button`
  ${DateStyle}
  background-color: pink;
  margin-left: 80px;

  :hover{
    background-color: #FFD4D4;
  };
`

const BuketInputWrap = styled.div`
  width: 206px;
  margin-left: 35px;
  ${InputWrapStyle}

  & .faPlus {
    background-color: #FFCCCC;
  };
`

const Buket = styled.div`
  width: 220px;
  background-color: #FFCCCC;
  height: 60px;
  margin-top: 13px;
  margin-left: 25px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  ${IconStyle}
`


const BucketInnerText = styled.div`
  ${ InnerTextStyle }
  color: white;
`