import React from 'react';
import axios from 'axios';

//Import CSS
import './assets/css/App.css';

//Components
import ResultsTitle from './components/ResultsTitle'
import SearchForm from './components/SearchForm'
import Categories from './components/Categories'
import JokeList from './components/JokeList'
import Navbar from './components/Navbar'
import Doodle from './components/Doodle'

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      api: 'https://api.chucknorris.io/jokes',
      show_results: false,
      search_type: 'normal',
      search_term: '',
      last_search: '',
      loading: false,
      results: {},
      categories: localStorage.getItem('categories')? JSON.parse(localStorage.getItem('categories')) : [],
      favorites: localStorage.getItem('favorites')? JSON.parse(localStorage.getItem('favorites')) : []
    }

  }

  UNSAFE_componentWillMount(){
    if(this.state.categories.length === 0)
    axios.get(`${this.state.api}/categories`)
      .then(res => {
        this.setState({categories: res.data });
        localStorage.setItem('categories', JSON.stringify(res.data));
      })
      .catch(err => {
        this.setState({
          loading: false, results: { total: 0, result: [] }, categories: []
        });
      });
  }

  render(){
    return (
      <div className="container-fluid">
        <Navbar self={this}></Navbar>
        <Doodle self={this}></Doodle>
        <SearchForm self={this}></SearchForm>
        <Categories self={this}></Categories>
        <ResultsTitle self={this}></ResultsTitle>
        <JokeList self={this}></JokeList>
        {this.state.loading &&
          <div className="loading-wrapper">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>}
      </div>
    );
  }
}