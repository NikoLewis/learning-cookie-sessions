const router = require("express").Router();
const Artist = require("../models/artist-model")

//1 & 3 get all artists + add new artist
//** post artist returns a null?

function getArtists(req, res){
	console.log(req)
	console.log(res)
	Artist
		.findAll({
			order: [['name', 'ASC']]
		})
		.then((
			data) => {
				res.send(data)
		})
		.catch(function(err){
			console.log(err)
		})
}

function addArtist(req, res){
	Artist.create({
			name: req.body.name
		})
		.then((artist) => {
			res.json(artist)
		})
		.catch((err) => {
			console.log(err)
		})
	};





router.route('/')
	.get(getArtists)
	.post(addArtist)


// get and post  by id

function getId (req,res) {
		Artist
		.findById(req.params.id)
		.then(function(data) {
			res.send(data)
		})
		.catch(
			function(err){
				console.log(err)
			})
}

function deleteId(req,res){
	Artist.
	findById(req.params.id)
		.then(function (data) {
			data.destroy()
		})
		.then(function(data){
			res.send('Deleted!')
		})
		.catch((err) => {
			console.log(err)
		})
	}

router.route('/:id')
	.get(getId)
	.delete(deleteId)


// /api/artists/:id/:newName PUT (update) a specific artist's name

function editName(req, res){
	Artist
		.findById(req.params.id)
		.then(
			function(artist){
				artist.update({name: req.param('newName')})
			})
		.then(function(data){
			res.send('Updated artist name.')
		})
		.catch(function(err){
			res.send(err)
		})
}



router.route('/:id/:newName')
	.put(editName)







module.exports = router;