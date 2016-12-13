import React from 'react';
import $ from 'jquery';




var Artist = React.createClass({
	getInitialState: function(){
		return({artist: []})

	},
	componentDidMount: function(){
		var that = this;
		console.log(that)
		$.ajax({
			type: "GET",
			url: '/api/artists',
			success: function(data){
				console.log('ajax %o', data)
				that.setState({artist: data})
		    },
			error: function(err) {
				console.log(err)
			}
		})

	},


	render: function(){
		return (<div>
					<h1>ARTIST</h1>
					{this.state.artist.map((artist,index)=>{
						return (<div key={index}>{artist.name}</div>)
					})}



				</div>)
	}
})

export default Artist