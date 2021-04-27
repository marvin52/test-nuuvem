import React from 'react';
import axios from 'axios';

import leaf from './../assets/img/leaf.svg';

export default class SearchForm extends React.Component {
    constructor(props){
        super(props);
        this.self = props.self
        this.onKeyUp = this.onKeyUp.bind({_self: this, self: this.self});
    }

    onKeyUp(event) {
        if (event.charCode === 13 && !this.self.state.loading) {
            this._self.searchTerm(this.self.state.search_term)
        }
    }

    handleChange = (e) => {
        this.self.setState({ search_term: e.target.value });
    };

    searchCategory(cat){
        this.self.setState({
            loading: !0,
            search_type: 'category',
            search_term: `category:${cat}`
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

    searchTerm(term){
        if(term.indexOf('category:') === 0){
            this.searchCategory(term.split('category:')[1]);
            return;
        }
        if(term.length === 0){
            this.self.setState({show_results: false });
            return;
        }

        this.self.setState({ loading: !0, search_type: 'normal' });
        axios.get(`${this.self.state.api}/search?query=${encodeURI(term)}`)
            .then(res => {
                this.self.setState({
                    loading: false, 
                    results: res.data,
                    show_results: !0,
                    last_search: this.self.state.search_term
                });
            })
            .catch(err => {
                this.self.setState({
                    loading: false,
                    results: { total: 0, result: [] },
                    last_search: this.self.state.search_term
                });
            });
    }

    randomSearchTerm(term){
        if(term.indexOf('category:') === 0){
            this.searchCategory(term.split('category:')[1]);
            return;
        }

        this.self.setState({ loading: !0, search_type: 'random' });

        if(term.length === 0){
            axios.get(`${this.self.state.api}/random`)
            .then(res => {
                this.self.setState({
                    loading: false,
                    results: {
                        total: 1,
                        result: [res.data] 
                    },
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
            return;
        }
        axios.get(`${this.self.state.api}/search?query=${encodeURI(term)}`)
        .then(res => {
                this.self.setState({
                    loading: false,
                    results: {
                        total: 1,
                        result: [res.data.result[Math.floor(Math.random() * res.data.result.length)]]
                    },
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
                    data-testid="search-form"
                    className="col-lg-6 col-md-8 col-sm-10 search-form">
                    <div className="input-group mb-2">
                    <input
                        data-testid="search-input"
                        onKeyPress={this.onKeyUp}
                        type="text"
                        className="search-term form-control"
                        onChange={this.handleChange}
                        value={this.self.state.search_term}
                        placeholder="Type a word here">
                    </input>
                    <div className="input-group-prepend">
                        <button
                            data-testid="search-button"
                            className="btn btn-dark"
                            onClick={ _ =>
                                this.searchTerm(
                                    this.self.state.search_term
                                    )
                            }>
                            <i className="fas fa-search"></i>
                        </button>
                        <button
                            data-testid="random-search-button"
                            onClick={ _ =>
                                this.randomSearchTerm(
                                    this.self.state.search_term)}
                            className="btn btn-success luck-btn">
                            <img src={leaf}/>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}