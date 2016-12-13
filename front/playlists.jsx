import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router'


// Playlists Page:
// Displays all of your playlists by title. It should only display the title of each playlist, not the full song listing. When you click on a playlist title it should take you to the individual playlist page for that particular playlist.



var Playlists = React.createClass({
	getInitialState: function(){
		return ({playlist: []})
	},
	componentDidMount: function(){
		var that = this
		$.ajax({
			url: 'api/playlists',
			type: 'GET',
			success: function(data){
				that.setState({playlist: data})
			},
			error: function(err){
				console.log(err)
			}
		})
	},
	render: function(){
		console.log(this.state);
		if (this.state) {
			return (<div>
						<h1>PLAYLISTS</h1>
						{this.state.playlist.map((playlist,index)=>{
							return (
								<div key={index}>
								<div><h3>Title: {playlist.title}</h3> </div>
								</div>
								)
						})}
					</div>)
		} else {
			return (<div></div>);
		}
	}
})

export default Playlists