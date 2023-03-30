
import axios from 'axios';
import DatePicker from "react-datepicker";
import Api from "../../../apis/Api";
import Sliderr from "../../Diary/components/slider";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCircleArrowLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { useState, forwardRef, useEffect } from 'react';
import {API_URL} from '../../../Common/Common'
import { recoilColorState } from "../../../recoil/colorState";
import { useRecoilState } from "recoil";
import { media } from "../../../styles/Media/media";
import './diary.css'

const DiaryForm = () => {
  const [recoilColor, setRecoilColor] = useRecoilState(recoilColorState);
  const defaultColor = { ...recoilColor };
  const [colorPeeker, setColorPeeker ] = useState(defaultColor.color);
  const [ViewData, setViewData] = useState({
     id:""
    ,title:""
    ,content:""
    ,date: new Date()
    ,color:""
  }) 
  const { title, content, date } = ViewData;

  const [list, setData] = useState([]);
  
  useEffect(()=> {
    setViewData({
       date: new Date()
       ,color:colorPeeker
    })
    search();
  },[]);

  useEffect(() =>{
    const tmpColor = { ...recoilColor };
    setColorPeeker(tmpColor.color);
    let defaultDate = new Date();
    if(ViewData.date !== ""){
        defaultDate = new Date(ViewData.date);
    }
    setViewData({
      ...ViewData,
      color:tmpColor.color,
      date:defaultDate
    })
  },[recoilColor] )

  const search = (params) => {
    let date = null;
    if(params){
      date = params;
    }else{
      date = new Date(ViewData.date);
    }
    axios.get(API_URL+ '/diary?year='+String(date.getFullYear())+'&month='+String(date.getMonth()+1))
    .then((response) => {
      let listData = [];
      for(let i=0;i<response.data.data.length;i++){
          listData[i] = response.data.data[i];
          listData[i].date = UTCchangeKST(response.data.data[i].date)
      }    
      setData(listData);
      defaultSetting();
    })
  };

  const defaultSetting = () => {
    setViewData({
       id:""
      ,title:""
      ,content:""
      ,date: new Date()
      ,color: "#5800FF"
    })
  };

  //utc 날짜를 kst 날짜로 변환 
  const UTCchangeKST = (date) => {
    let krDate = new Date(date);
    krDate.setHours(krDate.getHours() + 9);
    return krDate.toISOString();
  };

  const DatePick = forwardRef(({ value, onClick }, ref) => (
    <Datebutton className='custom-btn'
      onClick={onClick} ref={ref}>
        {value}
    </Datebutton> ));

  const getChangeDate = (date) => {
    setViewData({
      ...ViewData,
      'date': date,
    })
    search(date);
  };
  
  const getChangeValue = (e) => {
    const{name, value} = e.target;
    setViewData({
      ...ViewData,
      [name]: value
    })
  };

  const update = () => {
    if(window.confirm('수정하시겠습니까?')){
      Api.diaryPatch(ViewData).then((response) => {
        if(response.data.message === "successful"){
          search()
          defaultSetting()
        } else {
          alert("system 오류 입니다. 문의주세요.", response.data.message);
        }
      })
    } else {
      alert("취소 되었습니다.")
    }
  }
  const create = () => {
    

    if(window.confirm('다이어리를 등록 하시겠습니까?')===true){
      Api.diaryPost(ViewData).then((response) => {
          alert("다이어리가 등록 되었습니다😊")
          defaultSetting();
          search();
      })
    } else {
    alert('취소 하였습니다.')
    }
  }
  const submit = () => {
    // eslint-disable-next-line no-mixed-operators
    if(ViewData.title === '' || ViewData.title === " "
      || ViewData.content === '' || ViewData.content === " "
    ){
      alert("제목과 내용은 필수 입니다.");
      return false;
    }
    if(ViewData.id === ""){ 
      create();
    } else {
      update(); 
    }
  };

  const ResetBtnClick = () => {
    if(window.confirm('처음으로 돌아가시겠습니까?')){
      defaultSetting()
    };
  };

  const updateList = (newlist) => {
    setViewData(newlist)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if(!e.shiftKey){
        submit();
      }
    }
  }

  return (
    <>
    <AllDiaryBox>
      <DiaryContainer style={{backgroundColor:ViewData.color}}>
        <PostTitle>
          <Datebox>
            <DatePicker
              value={date}
              dateFormat="yyyy-MM-dd"
              selected={ViewData.date}
              onChange={getChangeDate}
              customInput={<DatePick/>}
            />
          </Datebox>

          <div className='inputBox'>
            <input
              type="text"
              placeholder="제목을 작성해주세요"
              onChange={getChangeValue}
              name='title'
              value={title}
            />
          </div>

          <FontAwesomeIcon
            type='button'
            className="CheckIcon" 
            icon={faCircleCheck} 
            onClick={submit}
          />

          <FontAwesomeIcon
            type='button'
            className="beforeIcon" 
            icon={faCircleArrowLeft}
            onClick={ResetBtnClick}
          />
        </PostTitle>
          <WriteInnerBox>
            <PostForm>
              <textarea
                type="text"
                placeholder="일기내용을 작성해주세요"
                onChange={getChangeValue}
                name='content'
                value={content}
                onKeyDown={handleEnter} 
              />
            </PostForm>
          </WriteInnerBox>
      </DiaryContainer>

      <Sliderr 
        list={list} 
        search={search}
        refreshFunction={updateList}
      />
    </AllDiaryBox>
    </>
  );
};
export default DiaryForm;

const DiaryContainer = styled.div`
  max-width: 620px;
  max-height: 340PX;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${(props) => props.background};
  justify-content: center;
  padding: 27px;
  position: absolute;
  top:50px;

  ${media.mobileS`    
  width: 485px;
  top: -30px;
  `}

  ${media.tablet`   
    width: 550px;
    top: 30px;
    left: 10px;
  `}

  ${media.desktopM`    
    width: 620px;
  `}
`

const PostTitle = styled.div`
  width: 560px;
  height: 50px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: end;
  margin-bottom: 10px;
  font-family: "Gaegu", serif;

  & .inputBox{
    width: 250px;
    height: 35px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 20px;
    margin-right: 10px;
    right: 60px;
    font-family: "Gaegu", serif;

    ${media.mobileS`    
      width: 200px;
      right: 40px;
    `}

    ${media.tablet`   
      width: 250px;
    `}

    & input {
      width: 100%;
      border: none;
      font-family: "Gaegu", serif;
      :focus {
        outline: none;
      }
    }
  }
  & .CheckIcon {
    width: 50px;
    height: 35px;
    color: white;
    position:relative;
    right:30px;
  }
  & .beforeIcon{
    width: 35px;
    height: 35px;
    color: white;
  }

  ${media.mobileS`    
    width: 450px;
  `}

  ${media.tablet`   
    width: 500px;
  `}

  ${media.desktopM`    
    width: 560px; 
  `}
`

const WriteInnerBox = styled.div`
  width: 100%;
  height: 260px;
  border-radius: 10px;
  margin: 0 auto;
`
const PostForm = styled.form`
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 20px;
  & textarea {
    resize: none;
    width: 100%;
    height: 190px;
    border: none;
    padding: 15px 15px;
    font-family: "Gaegu", serif;
    ::-webkit-scrollbar {
      width: 8px;
      background-color: #F4F4F4;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #c4c4c4;
      border-radius: 10px;
    }
    :focus {
      outline: none;
    }
  }
`
const Datebutton = styled.button`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  background-color: #8D72E1;
  color: white;
  font-family: "Gaegu", serif;
 
  :hover{
    background-color: #AD7BE9;
  }
`
const Datebox = styled.div`
  width: 140px;
  height: 40px;
  position: relative;
  display: flex;
  right: 70px;

  ${media.mobileS`    
    width: 130px;
    right: 40px;
  `}

  ${media.tablet`   
    width: 140px;
    right: 20px;
  `}

  ${media.desktopM`    
    width: 140px;
    right: 70px;
  `}
`
const AllDiaryBox = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`