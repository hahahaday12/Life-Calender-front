import React from "react";
import axios from 'axios';
import Slider from "react-slick";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faXmark } from "@fortawesome/free-solid-svg-icons"
import { API_URL } from "../../../Common/Common";
import { media } from "../../../styles/Media/media";

function Sliderr(props) {

  const Viewdiary = (item) => {
    const body = {
      title : item.title
      ,content : item.content
      ,color : item.color
      ,id : item._id
      ,date : new Date(KSTchangeUTC(item.date))     
    }        
      props.refreshFunction(body);
  };

  const KSTchangeUTC = (date) => {
    let krDate = new Date(date);
    krDate.setHours(krDate.getHours() - 9);
    return krDate.toISOString();
  };

  const Removediary = (idx) => {
    if(window.confirm("삭제하시겠습니까?")){
        axios.delete(API_URL +'/diary/' + idx,{
      }).then((response) => { 
    if(response.data.message === "successful"){
      alert('삭제완료');
      props.search();  
    } else {
      console.error(response.data.message)
    }
      })
    } else {
      alert("다시 선택해주세요.")
    }
  }; 

  const renderDiary = () => props.list && props.list.map((item) => (
        <DiaryBoxContainer key={item._id}>
        <div className="diaryWrap">
          <div className="dateBox" 
            style={{color: item.color, borderColor: item.color}}>
            {item.date.substr(0,10)}
            <FontAwesomeIcon className="XIcon" 
              style={{color: item.color, borderColor: item.color}}
              icon={faXmark}
              onClick={(e) => Removediary(item._id, e)}/>
          </div>
          <div 
            className="titleBox"
            style={{backgroundColor: item.color, fontSize:"20px"}}
            onClick={() => Viewdiary(item)}>
            <div>
              {item.title}
            </div>
          </div>
        </div>
      </DiaryBoxContainer>
    ));

// 슬라이드 세팅값
  const settings = {
    dots: true,
    arrow: true,
    speed: 700,
    infinite: true,
    rows: 4,
    slidesPerRow: 2,
  }
 
  return(
    <>
      <WhiteContainer>
        <div className="sliderWrap">
          <Slider {...settings}>
            {renderDiary()}
          </Slider>
        </div>
      </WhiteContainer>
    </>
  )
};
export default Sliderr;

const WhiteContainer = styled.div`
  width: 500px;
  height: 543px;
  background-color: #CED0E9;
  position: relative;
  border-radius: 10px;
  left: 670px;
  margin-top: 50px;
  overflow: hidden;

  & .sliderWrap {
    margin: 0 auto;
    padding-top: 7px;
  }

  ${media.mobileS`
    width: 485px;
    height: 543px;
    left: 1px;
    top: 350px;  
  `}

  ${media.tablet`   
    width: 430px;
    height: 543px;
    left: 600px;
    top: -130px;
  `}

  ${media.desktopM`    
    width: 500px;  
    left: 670px;
  `}
`
const DiaryBoxContainer = styled.div`
  font-family: 'SB 어그로 M';

  & .diaryWrap {
    margin: 20px 0;
    width: 30%;
    margin-left: 40px;
  }
  & .dateBox {
    width: 190px;
    height: 30px;
    border-radius: 10px 10px 0 0;
    border: 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-family: "Gaegu", serif;

    ${media.tablet`   
      width: 150px;
    `}

    ${media.desktopM`    
      width: 190px;
    `}

    & .XIcon {
      color: black;
      position: relative;
      left:20px;
      bottom: 2px;
    }
  }
  
  & .titleBox {
    width: 190px;
    height: 55px;
    margin: 0 auto;
    border-radius: 0 0 10px 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Gaegu", serif;

    ${media.mobileS`    
    
    `}

    ${media.tablet`   
      width: 150px;
    `}

    ${media.desktopM`    
      width: 190px;
    `}
  }
`