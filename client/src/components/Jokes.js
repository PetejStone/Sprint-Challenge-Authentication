import React from 'react';
//import {Route} from 'react-router-dom';

import {getData, logOut} from '../actions'
import {connect} from 'react-redux';
import './Jokes.scss'

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
                {!this.props.error ? <h1>Welcome {localStorage.getItem('username')}</h1> : <h1>You must be logged in to view jokes</h1> }
                
                <div className='jokes'>
                {this.props.jokes.map(joke =>
                    <div className="joke">
                        <h4>{joke.joke}</h4>
                    </div>
                    )}
                </div>
                <button className="register" onClick={this.logout}>{!this.props.error ? "Logout" : "Go Back to Login"}</button>
            </div>
          
           
        )
    }
    
}

const mapStateToProps = (state) => ({
    credentials: state.credentials,
    jokes: state.jokes,
    user: state.user,
    error: state.error
})

export default connect(mapStateToProps,{getData, logOut})(Jokes)