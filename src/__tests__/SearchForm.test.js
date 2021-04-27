import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import SearchForm from './../components/SearchForm';

let parentWrapper = {
    state : {
        setState: () => {},
        search_term: '',
        search_type: 'normal',
        last_search:'',
        show_results: false,
        loading: false,
        results: {
            total: 2,
            result: [
                {
                    "categories": [],
                    "created_at": "2020-01-05 13:42:24.142371",
                    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                    "id": "BTHxrBzCRua8BriOPB5fQg",
                    "updated_at": "2020-01-05 13:42:24.142371",
                    "url": "https://api.chucknorris.io/jokes/BTHxrBzCRua8BriOPB5fQg",
                    "value": "Chuck Norris once punched a hurricane in its eye."
                },
                {
                    "categories": [],
                    "created_at": "2020-01-05 13:42:23.484083",
                    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                    "id": "nHkR_6YUSgWrwFaVXyzgPg",
                    "updated_at": "2020-01-05 13:42:23.484083",
                    "url": "https://api.chucknorris.io/jokes/nHkR_6YUSgWrwFaVXyzgPg",
                    "value": "Chuck Norris' accent wears a tuxedo."
                }
            ]
        }
    }
}

describe('Tests for the SearchForm component', () => {

    afterEach(()=>{
        cleanup();
    })

    it('Renders without crashing', () => {
        
        const div = document.createElement('div');
        ReactDom.render(<SearchForm self={parentWrapper}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('Check if the input value is equal to the respective state', () => {

        parentWrapper.state.search_term = 'batman';

        render(<SearchForm self={parentWrapper}/>);
        const searchForm = screen.getByTestId('search-input');

        expect(searchForm.value).toBe('batman');
    });


    it(`Check if method searchCategory is called when the search button
        is clicked and the input value is equal to category:*`, () => {

        parentWrapper.state.search_term = 'category:food';
        let searchCategory = SearchForm.prototype.searchCategory = jest.fn();

        const {queryByTestId} = render(<SearchForm self={parentWrapper}/>);

        fireEvent.click(queryByTestId('search-button'));

        expect(searchCategory).toHaveBeenCalled();
    });


    it(`Check if method searchCategory is called when the random search button
        is clicked and the input value is equal to category:*`, () => {

        parentWrapper.state.search_term = 'category:dev';
        let searchCategory = SearchForm.prototype.searchCategory = jest.fn();

        const {queryByTestId} = render(<SearchForm self={parentWrapper}/>);

        fireEvent.click(queryByTestId('random-search-button'));

        expect(searchCategory).toHaveBeenCalled();
    });


    it(`Check if method searchTerm is called when the search button is clicked`, () => {

        parentWrapper.state.search_term = 'star';
        let searchTerm = SearchForm.prototype.searchTerm = jest.fn();

        const {queryByTestId} = render(<SearchForm self={parentWrapper}/>);

        fireEvent.click(queryByTestId('search-button'));

        expect(searchTerm).toHaveBeenCalled();
    });


    it(`Check if method searchTerm is called when the search button is clicked`, () => {

        parentWrapper.state.search_term = 'cat';
        let randomSearchTerm = SearchForm.prototype.randomSearchTerm = jest.fn();

        const {queryByTestId} = render(<SearchForm self={parentWrapper}/>);

        fireEvent.click(queryByTestId('random-search-button'));

        expect(randomSearchTerm).toHaveBeenCalled();
    });
});
