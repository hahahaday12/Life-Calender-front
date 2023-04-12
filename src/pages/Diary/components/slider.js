import React from "react";
import axios from 'axios';
import Slider from "react-slick";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { API_URL } from "../../../Common/Common";
import { media } from "../../../styles/Media/media";
import { ShowAlert, ShowConfirm } from "../../alert";
import { useState } from "react";

function Sliderr(props) {

  const [hoverTitle, setHoverTitle] = useState(null);

  const handleTitleHover = (id) => {
    setHoverTitle(id);
  }

  const handleTitleLeave = () => {
    setHoverTitle(null);
  }

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
    ShowConfirm("삭제하시겠습니까?", "info").then((isConfirmed) => {
      if(isConfirmed){
        axios.delete(API_URL +'/diary/' + idx,{
      }).then((response) => { 
        if(response.data.message === "successful"){
          ShowAlert("삭제완료", "success");
          props.search();  
        } else {
          console.error(response.data.message)
        }
      })
    } else {
      ShowAlert("다시 선택해주세요.","info");
      return false;
    }
    }); 
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

          <TitleContainer style={{backgroundColor: item.color, fontSize:"20px"}}
            onClick={() => Viewdiary(item)}
            onMouseEnter={() => {handleTitleHover(item._id)}}
            onMouseLeave={handleTitleLeave}>
  
          <div className="titleBox">
            <div>
              {item.title}
            </div>
            {/* <HoverText isVisible={hoverTitle === item.title}>{item.content}</HoverText>   */}
          </div>
          <HoverText isVisible={hoverTitle === item._id}
          style={{backgroundColor: item.color}}
          >
          <HoverBox>{item.content}</HoverBox> 
          </HoverText>
          </TitleContainer>
          
      
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
  width: 520px;
  height: 550px;
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
    height: 610px;
    left: 600px;
    top: -130px;
  `}

  ${media.desktopM`    
    width: 520px;  
    left: 670px;
  `}
`
const DiaryBoxContainer = styled.div`
  font-family: 'SB 어그로 M';
  //background-color: aliceblue;
  height: 140px;

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

  ${media.mobileS`
    height: 128px;
  `}

  ${media.tablet`   
    height: 140px;
  `} 
`
const TitleContainer = styled.div`
  width: 190px;
  height: 55px;
  margin: 0 auto;
  border-radius: 0 0 10px 10px;
  background-Color:green;
  position:relative;
  align-items: center;

  & .titleBox {
    width: 150px;
    height: 50px;
    overflow: hidden;
    margin: 0 auto;
    color: white;
     display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Gaegu", serif;
    
    ${media.tablet`   
      width: 150px;
    `}

    ${media.desktopM`    
      width: 150px;
    `}
  }

  ${media.tablet`   
      width: 150px;
  `}

  ${media.desktopM`    
      width: 190px;
      
  `}
`
const HoverText = styled.div`
  position: absolute;
  top: -50%;
  width: 190px;
  height: 80px;
  padding-bottom: 50px;
  border-radius: 10px;
  border: 1px solid #ccc;
  /* 글자수 넘어가면 ...으로 대체하기 */
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  /* HoverText가 보여지도록 함 */
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  border: solid 2px white;
  color: #ffff;

  &:hover{
    transform: translate(1px, -20px);
    transition: 0.7s;
    z-index: 200;
    opacity: 1;
    box-shadow: #ccc;
  }
`
const HoverBox = styled.div`
  width: 150px;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto;
  margin-top: 15px;
  font-family: "Gaegu", serif;
`
