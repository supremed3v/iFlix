import express from 'express'
import { addMovie, deleteMovie, getMovie, getMovies, renderMovie } from '../controllers/moviesController.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/videos')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    },
})
const upload = multer({ storage: storage })

const router = express.Router()

router.post('/addMovie', upload.single('movie'),addMovie)
router.get('/getMovies', getMovies)
router.get('/getMovie/:id', getMovie)
router.delete('/deleteMovie/:id', deleteMovie)
router.get('/watch-movie/:id', renderMovie)

export default router;