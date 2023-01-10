import Movies from '../models/MoviesModel.js';
import path from 'path';
const __dirname = path.resolve();
import fs from 'fs'



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

export const deleteMovie = async (req, res) =>{
    try {
        const movie = await Movies.findById(req.params.id);
        if(!movie) return res.status(404).json({err: "Movie not found"});
        // delete file from public folder
        const filePath = path.join(__dirname, movie.movie.originalname);
        fs.unlink(filePath, (err)=> {
            if(err) throw err;
        });
        await movie.remove();

    } catch (error) {
        return res.status(500).json({err: error.message});
    }
}

export const renderMovie = async (req, res) =>{
    try {
        const movie = await Movies.findById(req.params.id);
        if(!movie) return res.status(404).json({err: "Movie not found"});
        const filePath = path.join(__dirname, movie.movie.originalname);
            const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }  
            

    } catch (error) {
        res.status(500).json({err: error.message});
    }
}