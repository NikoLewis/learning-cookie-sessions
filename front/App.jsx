import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link , IndexRoute, browserHistory} from 'react-router'
import $ from 'jquery';
// import './main.css';
// import "css-loader!./file.css";

//this will be used to import compenents
import NavBar from "./navbar"
import Artist from "./artist"
import Songs from "./songs"
import Playlists from "./playlists"
import CreatePlaylist from "./create-playlist"

var App = React.createClass({
	render: function(){
		return(
			<div>
				<NavBar/>
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
	    	<Route path="/createplaylist" component={CreatePlaylist}> </Route>

		</Route>
 	</Router>
), document.getElementById('app'))