import React from 'react';
import axios from 'axios';

export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.self = props.self
    }

    searchCategory(cat){
        this.self.setState({
            loading: !0,
            search_type: 'category',
            search_term:`category:${cat}`
        });

        axios.get(`${this.self.state.api}/random?category=${encodeURI(cat)}`)
        .then(res => {
            this.self.setState({
                loading: false,
                results: { total: 1, result: [res.data] },
                show_results: !0,
                last_search: this.self.state.search_term
            })
        })
        .catch(err => {
            this.self.setState({
                loading: false,
                results: { total: 0, result: [] },
                last_search: this.self.state.search_term
            });
        });
    }

    render(){
        return (
            <div className="row justify-content-md-center">
                <div
                    data-testid="categories"
                    className="col-lg-6 col-md-8 col-sm-10 categories">
                    {this.self.state.categories.map(_=> {
                        return (<span
                                    data-testid="categories-badge"
                                    className={`badge badge-dark`}
                                    key={_}
                                    onClick={ () => this.searchCategory(_) }>{_}</span>)
                    }
                    )}
                </div>
            </div>
        )
    }
}