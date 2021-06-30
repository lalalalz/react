import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import MyApp from './components/MyApp/MyApp';

render(
    <MyApp />,
    document.querySelector('#root')
);