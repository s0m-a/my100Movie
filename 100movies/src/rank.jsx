import React, { useEffect, useState} from 'react';
import axios from 'axios';

const  RankList = () =>{
    const [rankedMovies, setRankedMovies] = useState([]);
    //useeffect is used to add side effect(like fecthing data, updating DOM etc) in your component
    useEffect( ()=>{
        const fetchRankMovies = async () =>{
            try{
                const response =  await axios.get('/api/rankings');
                setRankedMovies(response.data);
            }catch (error){
                console.error('error fetching ranked movies:', error);
            }
        };
        fetchRankMovies();
    }, []);
return (
    <div>
      <h2>My Ranked Movies</h2>
      <ul>
        {rankedMovies.map((movie, index) => (
          <li key={movie.id}>
            {index + 1}. {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankList;
