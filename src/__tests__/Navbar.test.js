import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup, fireEvent} from '@testing-library/react';

import Navbar from './../components/Navbar';

let parentWrapper = {
    setState: () => {},
    state : {
        search_term: '',
        search_type: 'normal',
        last_search: '',
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
                    "value": "Chuck         Norris' accent wears a tuxedo."
                }
            ]
        }
    }
}

describe('Tests for the Navbar component', () => {

    afterEach(()=>{
        cleanup();
    })

    it('Renders without crashing', () => {

        const div = document.createElement('div');
        ReactDom.render(<Navbar self={parentWrapper}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('Check if method goHome is called when the home button is clicked', () => {

        let goHome = Navbar.prototype.goHome = jest.fn();

        const {queryByTestId} = render(<Navbar self={parentWrapper}/>);

        fireEvent.click(queryByTestId('navbar-home-link'));

        expect(goHome).toHaveBeenCalled();
    })

    it('Check if method showFavorites is called when the home button is clicked', () => {

        let showFavorites = Navbar.prototype.showFavorites = jest.fn();

        const {queryByTestId} = render(<Navbar self={parentWrapper}/>);

        fireEvent.click(queryByTestId('navbar-show-favorites'));

        expect(showFavorites).toHaveBeenCalled();
    })
})