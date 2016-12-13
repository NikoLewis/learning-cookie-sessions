const router = require("express").Router();
const Song = require("../models/song-model");
const Artist = require("../models/artist-model");
const Genre = require("../models/genre-model");


// 6. /api/songs GET all songs with genre and artist information fully populated (in other words, should say full artist name and genre names, instead of only having the ids)
// 8. /api/songs POST (create) a new song
//  To add in the genres you will need to use a special 'accessor' method. That Sequelize automatically creates. Checkout the following Sequelize docs and look at the 'getUsers', 'setUsers', 'addUser', 'addProject', 'setProject', 'getProject', etc. examples. These methods are all automatically created and will be named according to the name of your models. You can also see the song-seed.js file for a code example of one of these methods in use. Note that when you call the methods you have to use them on the individual songs (aka instances) and not on the model itsel.



function getAllSongs(req, res){
	Song
		.findAll({
			include: [Artist]
		}) //will return our data
		.then(function(data){
			res.send(data)
		})
}

//**study this later
function newSong(req, res){
	var body = req.body;
	Artist.findOrCreate({
		where: {name: body.artistName}
	})
	.then(artistInfo=>
		Song.create({
			title: body.title,
			youtube_url: body.youtube_url,
			artistId: artistInfo[0].dataValues.id
		})
		.then(songInfo=>{
			Genre.findOrCreate({
				where: {title: body.genre}
			})
			.then(genreInfo=>
				songInfo.addGenres([genreInfo[0].dataValues.id])
			)
		})
	)
	.then(()=>
		res.send('Song with name: '+body.title+', artist: '+body.artistName+', genre: '+body.genre+', youtube_url: '+body.youtube_url+' created!')
	)
	}





router.route('/')
	.get(getAllSongs)
	.post(newSong)



// 7. /api/songs/:id GET specific song by id

function getASong(req,res){
	Song.findOne({
			where:{id:req.params.id},
			include: [Artist]
	})
		.then((data) => {
			res.send(data)
		})

}
router.route('/:id')
	.get(getASong)













// 9. /api/songs/:id/:newTitle PUT (update) a specific song's title
// 10./api/songs/:id DELETE a specific song by id

module.exports = router;