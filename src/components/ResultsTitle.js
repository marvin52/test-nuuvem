import React from 'react';

export default class ResultsTitle extends React.Component {
    constructor(props){
        super(props);
        this.self = props.self;
    }


    displayResultsText(){
        let text = '', search_term = this.self.state.last_search;

        if(this.self.state.results.total === 0){
            text = `0 results found`;
            return text;
        }

        switch(this.self.state.search_type){
            default:
            case 'normal':
                text = `Results for the search: ${search_term}`;
            break;
            case 'random':
                if(search_term.length === 0){
                    text = `Lucky results:`;
                } else {
                    text = `Lucky results for the search: ${search_term}`;
                }
            break;
            case 'category':
                text = `Random result for the category: ${search_term.split('category:')[1]}`
            break;
            case 'favorites':
                text = `Your favorite jokes:`;
            break;
        }
        return text;
    }

    render(){
        if(this.self.state.show_results)
        return (
            <div className="row justify-content-md-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h3 data-testid="results-title">
                        {this.self.state.search_type === 'favorites' &&
                        <i className="fas fa-star"></i> } {this.displayResultsText()}
                    </h3>
                </div>
            </div>);
        return (
            <div data-testid="no-results-title"></div>
        );
    }
}