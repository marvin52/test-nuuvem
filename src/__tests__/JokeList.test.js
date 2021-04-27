import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import JokeList from './../components/JokeList';

let parentWrapper = {
    state : {
        setState: () => {},
        search_term: '',
        search_type: 'normal',
        last_search:'',
        show_results: true,
        show_favorites: false,
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
        },
        favorites: [
            {
                "categories": [],
                "created_at": "2020-01-05 13:42:24.142371",
                "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                "id": "BTHxrBzCRua8BriOPB5fQg",
                "updated_at": "2020-01-05 13:42:24.142371",
                "url": "https://api.chucknorris.io/jokes/BTHxrBzCRua8BriOPB5fQg",
                "value": "Chuck Norris once punched a hurricane in its eye."
            }
        ]
    }
}

describe('Tests for the JokeList component', () => {

    afterEach(()=>{
        cleanup();
    })

    it('Renders without crashing', () => {
        
        const div = document.createElement('div');
        ReactDom.render(<JokeList self={parentWrapper}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('Check if it renders the correct amount of jokes as it should', () => {

        render(<JokeList self={parentWrapper}/>);
        const jokeList = screen.getAllByTestId('joke-item')

        expect(jokeList.length)
            .toBe(parentWrapper.state.results.result.length);
    });    
    
    it(`Check if the removeFromFavorites method is called
        when you click the un-favorite button`, () => {

        let removeFromFavorites = JokeList.prototype.removeFromFavorites = jest.fn();

        render(<JokeList self={parentWrapper}/>);

        const jokeList = screen.getAllByTestId('button-favorite-action')
        
        //Get the first joke, that is in the favorite collection
        fireEvent.click(jokeList[0]);

        expect(removeFromFavorites).toHaveBeenCalled();
    });

    it(`Check if the addToFavorites method is called
        when you click the favorite button`, () => {

        let addToFavorites = JokeList.prototype.addToFavorites = jest.fn();

        render(<JokeList self={parentWrapper}/>);

        const jokeList = screen.getAllByTestId('button-favorite-action')
        
        //Get the second joke, that isnt in the favorite collection
        fireEvent.click(jokeList[1]);

        expect(addToFavorites).toHaveBeenCalled();
    });

});
