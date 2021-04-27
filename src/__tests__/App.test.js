import React from 'react';
import ReactDom from 'react-dom';

import App from './../App';

describe('Tests for the App wrapper component', () => {
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDom.render(<App/>, div);
        ReactDom.unmountComponentAtNode(div);
    });
})