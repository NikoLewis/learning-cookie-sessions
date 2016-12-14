const router = require ("express").Router()

//router is a small version of app


router.use('/', require('./auth-router'))







// router.use('/artists')

// router.use('/songs-with-artists')

module.exports = router;