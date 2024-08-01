import {Movie} from '../models/model_asso.js'

// const addMovies = async (req, res) => {
//   console.log('Session data:', req.session); // Debug session data
//   const { movieId, title } = req.body;
//   const userId = req.session.userId;
//   console.log('this is the user id',userId);
//   if (!userId) {
    
//     return res.status(401).json({ success: false, message: 'Unauthorized' });
//   }

//   try {
//     const movie = await Movie.create({ movieId, title, userId });
//     return res.status(201).json({ success: true, movie });

//   } catch (error) {
//     console.error('Error adding movie to list:', error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

const getRankedMovies = async (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const movies = await Movie.findAll({
      where: { userId },
      order: [['rank', 'ASC']],
    });
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Error fetching ranked movies:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export  { getRankedMovies };
