
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link , browserHistory} from 'react-router'
import $ from 'jquery';

var NavBar = React.createClass({
        render: function() {
          return (
          	<div>
           		<header>

					<nav role="navigation">
								<div>
									<ul>
										<li><a href="/artist">Artists</a></li>
										<li><a href="/songs">Songs</a></li>
										<li><a href="playlists">Playlists</a></li>
										<li><a href="createplaylist">Create Playlist</a></li>
									</ul>
								</div>
					</nav>
				</header>


			</div>
          )
        }
 });

export default NavBar


