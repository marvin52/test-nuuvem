import React from 'react';

export default class Doodle extends React.Component {
    constructor(props){
      super(props);
      this.self = props.self
    }
    render(){
        if(!this.self.state.show_results)
        return (
            <div className="row justify-content-md-center">
              <div className="col-lg-6 col-md-8 col-sm-10 search-doodle">
                <img data-testid="img-doodle" src="https://i.imgur.com/pDOtti6.jpg" alt="Chuck Norris"/>
              </div>
            </div>);
        return (
          <div data-testid="no-doodle"></div>
        );
    }
}