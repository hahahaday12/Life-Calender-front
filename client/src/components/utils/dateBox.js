// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styled from "styled-components";
// import  {media} from '../../styles/Media/media'
// import {forwardRef, useState} from 'react';

// const DatePickk = (props) => {

//        const getChangeDate = ( date) => {
//         setViewData({
//           ...ViewData,
//           'date': date,
//         })
//         props.search(date);
//       };
      
//       const DatePick = forwardRef(({ value, onClick }, ref) => (
//         <Datebutton className='custom-btn'
//           onClick={onClick} ref={ref}>
//             {value}
//         </Datebutton> ));

//     return(
//         <>
//         <Datebox>
//             <DatePicker
//               value={props.date}
//               dateFormat="yyyy-MM-dd"
//               selected={ViewData.date}
//               onChange={getChangeDate}
//               customInput={<DatePick/>}
//             />
//           </Datebox>
//         </>
//     )
// };
// export default DatePickk;

// const Datebox = styled.div`
//   width: 140px;
//   height: 40px;
//   position: relative;
//   display: flex;
//   right: 70px;
//   background-color: red;

//   ${media.mobileS`    
//     width: 130px;
//     right: 40px;
//   `}

//   ${media.tablet`   
//     width: 140px;
//     right: 20px;
//   `}

//   ${media.desktopM`    
//     width: 140px;
//     right: 70px;
//   `}
//   `

// const Datebutton = styled.button`
// width: 110px;
// height: 40px;
// border: none;
// border-radius: 30px;
// background-color: #8D72E1;
// color: white;
// font-family: "Gaegu", serif;

// :hover{
//   background-color: #8D9EFF;
// }
// `