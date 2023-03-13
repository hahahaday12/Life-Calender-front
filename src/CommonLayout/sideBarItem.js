import styled from "styled-components";
import { media } from "../styles/Media/media";
import { StyleItem ,MediaItem } from "../styles/DetailStyle/CalendarStyle/diary";

const SidebarItem = ({ menu, isActive, isColor }) => {

  // 2번째 아이콘 개별 사이즈 조절
  const secondIconSize = menu.name === "checklist" && "12px" 

  return isActive === true? (
    <SidebarItems>
      <div 
        className="active iconBox"
        style={{backgroundColor: isColor}}
      >
        <span className="iconSize" style={{fontSize: secondIconSize}}>
          {menu.icon}
        </span>
        <p>{menu.name}</p>
      </div>
    </SidebarItems>
    ) : (
      <SidebarItems>
        <div className="defalt iconBox">
            <span className="iconSize" style={{fontSize: secondIconSize}}>
              {menu.icon}
            </span>
            <p>{menu.name}</p>
        </div>
      </SidebarItems>
    )
}

export default SidebarItem;

const SidebarItems = styled.div`
  ${StyleItem}

  ${media.mobileS`    
     ${MediaItem}
  `}

  ${media.tablet`   
    ${StyleItem}
  `}

  ${media.desktopM`    
    ${StyleItem}
  `}

  ${media.desktopL`
    ${StyleItem}  
`}
`
