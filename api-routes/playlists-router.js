const Playlist = require('../models/playlist-model');
const Song = require('../models/song-model');
const Artist = require('../models/artist-model');
const Genre = require('../models/genre-model');
const express = require('express');
const router = express.Router();

//FUNCTIONS//
const getAllPlaylists = (req,res) =>(
  Playlist.findAll({
  	include: [
  	  {model: Song, include: [
  	  	{model: Artist}, {model: Genre}] }]
  })
  .then(playlistInfo=>
  	res.send(playlistInfo)
  )
)

const getPlaylistById = (req,res)=>(
	Playlist.findOne({
		where: {id: req.params.id},
		include: [
  	  {model: Song, include: [
  	  	{model: Artist}, {model: Genre}] }]
  })
	.then(playlistId=>
		res.send(playlistId)
	)
)

const postNewPlaylist = (req,res)=>{
	var body = req.body;
	Playlist.create({
		title: body.title
	})
	.then(()=>
		res.send('Playlist with name '+body.title+' created!')
	)
}

const updatePlaylistSong = (req,res)=>{
	Song.findOne({
		where: { title: req.params.songName }
	})
	.then((songInfo)=>{
		Playlist.findOne({
			where: {id: req.params.id}
		})
		.then(playlistInfo=>{
			playlistInfo.addSongs([songInfo.dataValues.id])
		})
	})
	.then(()=>
		res.send('Playlist ID:'+req.params.id+' updated with song: '+req.params.songName)
	)
}

const removePlaylistSong = (req,res)=>{
	Song.findOne({
		where: {title: req.params.songName}
	})
	.then((songInfo)=>
		Playlist.findOne({
			where: {id: req.params.id}
		})
		.then((playlistInfo)=>(
			playlistInfo.getSongs()
		)
		.then((playlistSongArray)=>{
      var playlistSongIdArray = playlistSongArray.map((songIDs)=>songIDs.dataValues.id);
      var songIndex = songInfo.dataValues.id;
			var index = playlistSongIdArray.indexOf(songIndex);
			if(index > -1){playlistSongIdArray.splice(index, 1)};
			var newSongArray = playlistSongIdArray;
			playlistInfo.setSongs(newSongArray)
    })
	)
	.then(()=>
		res.send('Removed '+req.params.songName+' from playlist with Id:'+req.params.id)
	)
	)
}

const deletePlaylistById = (req,res)=>(
	Playlist.destroy({
		where: { id: req.params.id }
	})
  .then(()=>
  	res.send('Playlist with id: '+req.params.id+' has been deleted')
  )
)

const updatePlaylistNameById = (req,res)=>(
	Playlist.findOne({
		where: {id: req.params.id}
	})
	.then(playlistInfo=>
		playlistInfo.update({
			title: req.body.title
		})
	)
	.then(()=>
		res.send('Playlist with Id:'+req.params.id+' updated with name: '+req.body.title+' !')
	)
)

//ROUTES//
router.route('/')
  .get(getAllPlaylists)
  .post(postNewPlaylist) // needs title

router.route('/:id/:songName')
  .put(updatePlaylistSong)
  .delete(removePlaylistSong)

router.route('/:id')
  .get(getPlaylistById)
  .delete(deletePlaylistById)
  .put(updatePlaylistNameById) // needs title

module.exports = router