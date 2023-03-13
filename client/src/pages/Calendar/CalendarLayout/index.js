import Api from '../../../apis/Api';
import { useState, React, useEffect }from "react";
import { media } from '../../../styles/Media/media';
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid"; 
import styled from 'styled-components';
import "./index.css";


const Full = () => {
  const [ViewData, setViewData] = useState({
    id:""
    ,title:""
    ,content:""
    ,date: new Date()
    ,color:""
  });

  useEffect(() => {
    search();
  },[]);

  const search = (params) => { 
    let date = null;
    if(params){
      date = params;
    }else{
      date = new Date(date);
    }
    Api.calendarGet()
    .then((response) => {
      setViewData(response.data.data);
    })
  };

  return (
    <CalendarBox>  
      <div className='CalendarApp'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventDisplay= "list-item"
          dayMaxEventRows="true"
          events={ViewData}
        />
      </div> 
    </CalendarBox>
  );
};
export default Full;

const CalendarBox = styled.div`
  width: 650px;
  left: 200px;
  height: 630px;
  position: relative;
  top: 100px;

  ${media.mobileS`
    top: 100px;
    width: 500px;
    position: absolute;
    left: -10px;
  `}

  ${media.tablet`
    top:15%;
    width: 670px;
    left: 30%;
  `}

  ${media.desktopM`
    left: 35%;
  `}
`