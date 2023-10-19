import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Color } from '../../../resource/color';
import { useRecoilState } from 'recoil';
import { recoilColorState } from '../../../recoil/colorState';
import { media } from '../../../styles/Media/media';
import { fontsize } from '../../../styles/Media/theme';

const ColorForm = () => {
  const [, setRecoilColor] = useRecoilState(recoilColorState);
  const colorArray = Object.values(Color);
  const colorNameArray = Object.keys(Color);
  const [colorState, setColorState] = useState('#5800FF');

  const onColorChangeHandler = (color) => {
    setColorState(color);
  };

  useEffect(() => {
    const changedColor = {
      color: colorState,
    };
    setRecoilColor(changedColor);
  }, [colorState, setRecoilColor]);

  return (
    <>
      <WhiteContainer>
        <p className="titleText">오늘의 기분은 어떤 색인가요?</p>
        <ColorPallete>
          {colorArray.map((color, index) => (
            <ColorCircle key={color} background={color}>
              <label for={color}></label>
              <input
                type="radio"
                id={color}
                checked={colorState === color}
                onChange={() => onColorChangeHandler(color, index)}
              />
              <p>{colorNameArray[index]}</p>
            </ColorCircle>
          ))}
        </ColorPallete>
      </WhiteContainer>
    </>
  );
};
export default ColorForm;

const WhiteContainer = styled.div`
  width: 630px;
  height: 136px;
  background-color: #ced0e9;
  border-radius: 10px;
  display: inline-block;
  margin: 0 auto;
  position: relative;
  right: 120px;
  top: 60px;

  & .titleText {
    text-align: center;
    margin-top: 25px;
    color: white;
    font-size: ${fontsize[4]};
  }

  ${media.mobileS`    
    width: 490px;
    left: -10px;
    top: 10px;
  `}

  ${media.tablet`   
    width: 550px;
    left: -10px;
    top: 50px;
  `}

  ${media.desktopM`    
    width: 630px;
    left: 10px;
  `}
`;

const ColorPallete = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  font-size: ${fontsize[3]};
  margin-top: 30px;

  ${media.mobileS`    
    width: 100%;
    font-size: ${fontsize[0]};
    margin-left: 20px;
  `}

  ${media.tablet`   
    margin-left: 17px;
    top: 10px;
    width: 100%;
    font-size: ${fontsize[3]};
  `}

  ${media.desktopM`    
    margin-left: 50px;
    width: 550px;
  `}
`;

const ColorCircle = styled.li`
  list-style-type: none;
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
  z-index: 50;

  & > label {
    display: inline-block;
    background-color: ${(props) => props.background};
    width: 30px;
    height: 30px;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.25s;
  }

  & > label:hover {
    transform: scale(1.15);
  }

  & > input {
    display: none;
  }
`;
