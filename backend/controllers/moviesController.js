import Movies from '../models/MoviesModel.js';
import path from 'path';
const __dirname = path.resolve();



export const addMovie = async (req, res) => {
    try {
        const {title, year, genre} = req.body;
        const movie = new Movies({
            title,
            year,
            genre,
            movie: {
                originalname: req.file.path,
                buffer: req.file.buffer,
            }
        })
        await movie.save();
        res.status(201).json({message: "Movie added successfully"});  
    } catch (error) {
        
    }
}


export const getMovies = async (req, res) =>{
    try{
        const movies = await Movies.find();
        res.json(movies);
    }catch(err){
        console.log(err);
        return res.status(500).json({err: err.message});
    }
}

export const getMovie = async (req, res) =>{
    try{
        const movie = await Movies.findById(req.params.id);
        if(!movie) return res.status(404).json({err: "Movie not found"});
        const filePath = path.join(__dirname, movie.movie.originalname);
        res.sendFile(filePath)
    }catch(err){
        console.log(err);
        return res.status(500).json({err: err.message});
    }
}