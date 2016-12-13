const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Genre = require('./genre-model');
const Song = require('./song-model');

//////////
// YOUR CODE HERE:
//////////

var PlayList = sequelizeConnection.define('playlist',{
	title: {
		type: Sequelize.STRING,
		validate: {
			len: [1, 100]

		}

	}

});

PlayList.belongsToMany(Song, {through: 'playlist-song'})
Song.belongsToMany(PlayList, {through: 'playlist-song'})

module.exports = PlayList;
