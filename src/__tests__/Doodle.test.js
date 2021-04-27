import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';

import Doodle from './../components/Doodle';


let parentWrapper = {
    state : {
        show_results: false,
    }
}

describe('Tests for the Doodle component', () => {

    afterEach(()=>{
        cleanup();
    })

    it('Renders without crashing', () => {
        
        const div = document.createElement('div');
        ReactDom.render(<Doodle self={parentWrapper}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('Check if the doodle image its been rendered when state.show_results is false', () => {
        
        
        render(<Doodle self={parentWrapper}/>);
        
        const doodleComponent = screen.getByTestId('img-doodle');
        expect(doodleComponent).toBeInTheDocument();
    });

    it('Check if the doodle image its not been rendered when state.show_results is true', () => {

        parentWrapper.state.show_results = true;
        
        render(<Doodle self={parentWrapper}/>);
        
        const doodleComponent = screen.getByTestId('no-doodle');
        expect(doodleComponent).toBeInTheDocument();
    });
})