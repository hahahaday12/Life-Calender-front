import SidebarItem from "./sideBarItem";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { faBook, faListCheck } from "@fortawesome/free-solid-svg-icons"
import { media } from "../styles/Media/media";
import { MediaSide, SideStyle } from "../styles/DetailStyle/diary/diary";

const Sidebar = () => {

  const pathName = useLocation().pathname;

  const Categorys = [
    {
      id: 'page1',
      name: 'Calendar',
      path: '/calendar',
      img: './images/calendar.svg',
      icon: <FontAwesomeIcon icon={faCalendar} />,
    },
    {
      id: 'page2',
      name: 'Checklist',
      path: '/todobucket',
      img: './images/list-check.svg',
      icon: <FontAwesomeIcon icon={faListCheck} />,
    },
    {
      id: 'page3',
      name: 'Diarybook',
      path: '/diary',
      img: './images/book-solid.svg',
      icon: <FontAwesomeIcon icon={faBook} />,
    },
  ];

  const isColor = 
    pathName === "/thirdpage" ? "#E5636F"
    : ( pathName === "/fourpage" ? "#7A90E2"
    : pathName === "/fivepage" ? "#FFCCCC" : '')

  return (
    <>
      <SidebarContainer>
        {Categorys.map((menu) => {
          return (
            <div className="iconWrap">
              <SLink to={menu.path} key={menu.id}>
                <SidebarItem 
                  menu={menu}
                  isActive={pathName === menu.path ? true : false}
                  // 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
                  isColor= {isColor}
                />
              </SLink>
            </div>
          );
        })}
      </SidebarContainer>
    </>
  )
};

export default Sidebar;

const SidebarContainer = styled.div`
  ${SideStyle}

  ${media.mobileS`    
    ${MediaSide}
  `}

  ${media.tablet`   
    ${SideStyle}
  `}

  ${media.desktopM`    
    ${SideStyle}
  `}

  ${media.desktopL`
    ${SideStyle}  
  `}
`
const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`