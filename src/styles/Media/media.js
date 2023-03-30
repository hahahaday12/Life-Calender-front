import { css } from "styled-components";

const size = {
  mobileS: 375,
  mobileM: 568,
  mobileL: 768,
  tablet: 1024,
  desktopS: 1280,
  desktopM: 1440,
  desktopL: 1920,
};

export const { mobileS, mobileM, mobildL, tablet, desktopS, desktopM, desktopL } = size;


const media = Object.entries(size).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first,
      ...interpolations
    ) => css`
      @media screen and (min-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
    
  };
}, {});

export { media };