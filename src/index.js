import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <RecoilRoot>
            <GlobalStyles/>
            <App/>
        </RecoilRoot>
    </BrowserRouter>


);



