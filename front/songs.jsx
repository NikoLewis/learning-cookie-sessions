import React from 'react';
import $ from 'jquery';

// Songs Page:
// Displays all of your songs. Each song should have a title, artist, and youtube embed. You can create a song by using the following iFrame embed in your jsx. You will need to change the 'localhost:9999' part of the src string to match whatever port you're using to host your app:



var Songs = React.createClass({
	getIntialState: function(){
		return( {song: []})
	},
	componentDidMount: function(){
		var that = this
		$.ajax({
			url: '/api/songs',
			type: 'GET',
			success: function(data){
				that.setState({song: data})
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
						<h1>SONGS</h1>
						{this.state.song.map((song,index)=>{
							return (
								<div key={index}>
								<div><h3>Artist: {song.artist.name}</h3></div>
								<div><h3>Title: {song.title}</h3> </div>
								<div><h3>Video:</h3> </div>
								<iframe id="ytplayer" type="text/html" width="640" height="360"
src={`${song.youtube_url.replace('watch?v=', 'embed/')}`}></iframe>


								</div>
								)
						})}
					</div>)
		} else {
			return (<div></div>);
		}
	}
})

export default Songs