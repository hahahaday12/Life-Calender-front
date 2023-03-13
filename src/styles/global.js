import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`

    *{
        box-sizing: border-box;
    }
    html,
    body {
        font-family: "Gaegu", serif;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    button {
        border: none;
    }   
`;
export default GlobalStyles;