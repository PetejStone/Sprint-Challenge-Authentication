import React from 'react';
//import {Route} from 'react-router-dom';

import {getData, logOut} from '../actions'
import {connect} from 'react-redux';

class Jokes extends React.Component {
  

   componentDidMount() {
       
        this.props.getData()
        
      
   }

   logout = e => {
    e.preventDefault();
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('department')
    
    this.props.logOut()
    this.props.history.push('/')
   

   }
    render() {
        return (
            <div>
            {this.props.error ? `<h1>Welcome ${this.props.user.username }</h1>` : "You must be logged in to view jokes!"}
                <div>
                {this.props.jokes.map(joke =>
                    <h1>{joke.joke}</h1>)}
                </div>
                <button className="register" onClick={this.logout}>Logout</button>
            </div>
          
           
        )
    }
    
}

const mapStateToProps = (state) => ({
    credentials: state.credentials,
    jokes: state.jokes,
    user: state.user
})

export default connect(mapStateToProps,{getData, logOut})(Jokes)