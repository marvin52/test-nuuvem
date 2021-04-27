import React from 'react';

export default class Navbar extends React.Component {

    constructor(props){
      super(props);
      this.self = props.self
    }


    goHome(){
      this.self.setState(
        {
          show_results: false,
          search_term: '',
          last_search: '',
          search_type: 'normal'
        });
    }



    showFavorites(){
      this.self.setState({
        show_results: !0,
        search_term: '',
        last_search: '',
        search_type: 'favorites',
        results: {
          total: this.self.state.favorites.length,
          result: this.self.state.favorites
        }
      })
    }

    render(){
      return (
        <nav data-testid="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a
            data-testid="navbar-home-link"
            onClick={ _ => this.goHome() }
            className="navbar-brand"
            href="#">
              <i className="far fa-grin-squint-tears"></i> Chuck Jokes
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a
                  data-testid="navbar-show-favorites"
                  onClick={ _ => this.showFavorites() }
                  className={`nav-link ${this.self.state.search_type === 'favorites' && 'active'}`}
                  href="#">
                  <i className="far fa-star"></i> Favorites
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )   
    }
  }