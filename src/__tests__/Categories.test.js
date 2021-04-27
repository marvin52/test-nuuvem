import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import Categories from './../components/Categories';

let parentWrapper = {
    state : {
        setState: () => {},
        categories: [
            "animal",
            "career",
            "celebrity",
            "dev",
            "explicit",
            "fashion",
            "food",
            "history",
            "money",
            "movie",
            "music",
            "political",
            "religion",
            "science",
            "sport",
            "travel"
        ]
    }
}

describe('Tests for the Categories component', () => {

    afterEach(()=>{
        cleanup();
    })

    it('Renders without crashing', () => {
        
        const div = document.createElement('div');
        ReactDom.render(<Categories self={parentWrapper}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('Check if it renders the correct amount of categories as it should', () => {

        render(<Categories self={parentWrapper}/>);
        const categories = screen.getAllByTestId('categories-badge')

        expect(categories.length)
            .toBe(parentWrapper.state.categories.length);
    });    
    
    it(`Check if the searchCategory method is called
        when you click the badge`, () => {

        let searchCategory = Categories.prototype.searchCategory = jest.fn();

        render(<Categories self={parentWrapper}/>);

        const categories = screen.getAllByTestId('categories-badge')

        fireEvent.click(categories[0]);

        expect(searchCategory).toHaveBeenCalled();
    });
});
