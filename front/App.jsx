import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link , IndexRoute, browserHistory} from 'react-router'
import $ from 'jquery';
import Navbar from './navbar'
import Login from './login'

// import './main.css';
// import "css-loader!./file.css";

//this will be used to import compenents
import navbar from "./navbar"
import Artist from "./artist"
import Songs from "./songs"
import Playlists from "./playlists"
import CreatePlaylist from "./create-playlist"

var App = React.createClass({
	getInitialState() {
    return {username: null, playlists: [], playlist: null, songs: [], artists: []};
  },// put your auth ajax call here so that it always is called when the pages loads
  componentDidMount() {
  	console.log('auth being attempted')
    $.ajax({
      url: '/auth',
      method: 'GET'
    })
    .done((username) => {
    	console.log('username:', username)
      if(username) {
        console.log(username + ' is logged in!');
        this.setState({username: username});
      } else {
        console.log('No one is logged in');
      }
    })
  },
	render: function(){
		return(
			<div>
		{this.state.username ? <p>{'Welcome, ' + this.state.username}</p> : <p>{'Welcome, please log in.'}</p> }
		<Login />
        <Navbar/>
        {this.props.children}


			</div>)
	}
})

ReactDOM.render((
	<Router history={browserHistory}>
  		<Route path="/" component={App}>
	    	<Route path="/artist" component={Artist}> </Route>
	    	<Route path="/songs" component={Songs}> </Route>
	    	<Route path="/playlists" component={Playlists}> </Route>
	    	<Route path="/createplaylist" component={CreatePlaylist}> </Route>
	    	<Route path="/login" component={Login}> </Route>


		</Route>
 	</Router>
), document.getElementById('app'))

export default App