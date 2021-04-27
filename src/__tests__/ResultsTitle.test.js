import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';

import ResultsTitle from './../components/ResultsTitle';

let parentWrapper = {
    state : {
        search_term: '',
        search_type: 'normal',
        last_search:'',
        show_results: true,
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

describe('Tests for the ResultsTitle component', () => {

    afterEach(()=>{
        cleanup();
    })

    it('Renders without crashing', () => {
        
        const div = document.createElement('div');
        ReactDom.render(<ResultsTitle self={parentWrapper}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('Check if the results title its been rendered when state.show_results is true', () => {
        
        render(<ResultsTitle self={parentWrapper}/>);
        
        const resultsTitle = screen.getByTestId('results-title');
        expect(resultsTitle).toBeInTheDocument();
    });

    it('Check if the results title its not been rendered when state.show_results is false', () => {

        parentWrapper.state.show_results = false;
        
        render(<ResultsTitle self={parentWrapper}/>);
        
        const resultsTitle = screen.getByTestId('no-results-title');
        expect(resultsTitle).toBeInTheDocument();
    });

    describe('Check if text is displayed correctly accordly to each kind of search', ()=>{

        it('Check the text for normal searchs', () => {

            parentWrapper.state.show_results = true;
            parentWrapper.state.search_type = 'normal';
            parentWrapper.state.last_search = 'batman';

            render(<ResultsTitle self={parentWrapper}/>);

            const resultsTitle = screen.getByTestId('results-title');
            expect(resultsTitle).toHaveTextContent('Results for the search: batman');
        })

        it('Check the text for random searchs with empty string', () => {

            parentWrapper.state.search_type = 'random';
            parentWrapper.state.last_search = '';

            render(<ResultsTitle self={parentWrapper}/>);

            const resultsTitle = screen.getByTestId('results-title');
            expect(resultsTitle).toHaveTextContent('Lucky results:');
        })

        it('Check the text for random searchs with non empty string', () => {

            parentWrapper.state.search_type = 'random';
            parentWrapper.state.last_search = 'Einstein';

            render(<ResultsTitle self={parentWrapper}/>);

            const resultsTitle = screen.getByTestId('results-title');
            expect(resultsTitle).toHaveTextContent('Lucky results for the search: Einstein');
        })

        it('Check the text for random searchs with non empty string', () => {

            parentWrapper.state.search_type = 'category';
            parentWrapper.state.last_search = 'category:food';

            render(<ResultsTitle self={parentWrapper}/>);

            const resultsTitle = screen.getByTestId('results-title');
            expect(resultsTitle).toHaveTextContent('Random result for the category: food');
        })

        it('Check the text for favorite jokes title', () => {

            parentWrapper.state.search_type = 'favorites';
            parentWrapper.state.last_search = '';

            render(<ResultsTitle self={parentWrapper}/>);

            const resultsTitle = screen.getByTestId('results-title');
            expect(resultsTitle).toHaveTextContent('Your favorite jokes:');
        })

        it('Check the text for no results', () => {

            parentWrapper.state.results.total = 0;

            render(<ResultsTitle self={parentWrapper}/>);

            const resultsTitle = screen.getByTestId('results-title');
            expect(resultsTitle).toHaveTextContent('0 results found');
        })

    })
})