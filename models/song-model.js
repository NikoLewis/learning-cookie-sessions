const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Artist = require('./artist-model');
const Genre = require('./genre-model');

//////////
// YOUR CODE HERE:
//////////
var Song = sequelizeConnection.define('song', {
	title: {
		type: Sequelize.STRING,
		validate: {
			len: [1, 250], notEmpty: true
		}
	},
	youtube_url: {
		type: Sequelize.STRING,
		validate: { 
			len: [1,50], isURL: true

		}	
	},

});
   Song.belongsTo(Artist);	
   Song.belongsToMany(Genre, {through: 'genre-song'});
   Genre.belongsToMany(Song, {through: 'genre-song'});


module.exports = Song;
