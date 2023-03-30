import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`

    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    html,
    body {
        font-family: "Gaegu", serif;
        width: 100%;
    }

    button {
        border: none;
    }   
`;
export default GlobalStyles;