import { createContext, useContext, useEffect, useState } from "react";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const res = await fetch("http://localhost:8080/api/getMovies")
        const data = await res.json();
        setMovies(data);
    }

    useEffect(()=>{
        getMovies();
    },[])


    
    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
        {children}
        </MoviesContext.Provider>
    );
}

export const useMovies = () => useContext(MoviesContext);