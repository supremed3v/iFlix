import mongoose from "mongoose";

const MoviesSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: String,
    movie:{
        originalname: String,
        buffer: Buffer,
    }
})

export default mongoose.models.Movies || mongoose.model("Movies", MoviesSchema);