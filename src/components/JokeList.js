import React from 'react';

export default class JokeList extends React.Component {
    constructor(props){
        super(props);
        this.self = props.self;
    }


    addToFavorites(jokeObj){
        let favList = this.self.state.favorites;
        favList.push(jokeObj);
        this.self.setState({ favorites: favList }, () => {
            localStorage.setItem('favorites', JSON.stringify(favList));
        });

    }

    removeFromFavorites(jokeObj){
        let favList = this.self.state.favorites.filter(el => el.id !== jokeObj.id);
        this.self.setState({ favorites: favList }, () => {
            localStorage.setItem('favorites', JSON.stringify(favList));
            if(this.self.state.search_type === 'favorites'){
                this.self.setState({
                    results: {
                        total: favList.length,
                        result: favList
                    }
                })
            }
        });
    }


    isFavorite(id){
        for(let i = 0; i < this.self.state.favorites.length; i++)
        if(this.self.state.favorites[i].id === id)
            return true;
        return false;
    }

    render(){
        if(this.self.state.show_results)
            return (
            <div className="row justify-content-md-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                {this.self.state.results.result.map(_ =>{
                    return (
                    <div data-testid="joke-item" className="joke-item" key={_.id} joke-id={_.id}>
                        <p>{_.value}</p>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            data-testid="button-share-twitter"
                            href={`https://twitter.com/intent/tweet?text=${encodeURI(_.value)}`}
                            className="btn-tw btn btn-sm btn-info">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <button
                        data-testid="button-favorite-action"
                        onClick={() => this.isFavorite(_.id) ? 
                                        this.removeFromFavorites(_) :
                                        this.addToFavorites(_)}
                        className={`btn-fv btn btn-sm btn-${this.isFavorite(_.id) ? 'favorite' : 'dark'}`}>
                            <i className="fas fa-star"></i>
                        </button>
                    </div>
                    )
                })}
                </div>
            </div>);
        return null;
    }
}