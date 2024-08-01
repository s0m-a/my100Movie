import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthController from './controllers/AuthController.js';
// import movieRouter from './routes/movies.js';
import dbStorage from './config/db.js';
import Movie from './models/movies.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
}));




// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the 100Movies API');
});

app.post('/api/register', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const response = await AuthController.signin({ userName, email, password });
        if (response.status === 'OK') {
            res.status(201).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const response = await AuthController.login({ userName, password });
        if (response.status === 'OK') {
            req.session.userId = response.userId; // Setting session data
            console.log('session created:', req.session);
            res.json(response);
        } else {
            res.status(401).json(response);
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/api/addMovies', async (req, res) => {
  console.log('Session data:', req.session); // Debug session data
  const { movieId, title } = req.body;
  const userId = req.session.userId;
  console.log('this is the user id',userId);
  if (!userId) {
    
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const movie = await Movie.create({ movieId, title, userId });
    return res.status(201).json({ success: true, movie });

  } catch (error) {
    console.error('Error adding movie to list:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// app.get('/rankinggs', getRankedMovies)


app.get('/api/protected', (req, res) => {
    if (req.session.userId) {
        res.json({ status: 'ok', message: "This is a protected route" });
    } else {
        res.status(401).json({ status: 'error', message: "Sorry, you can't access this route" });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
        res.json({ status: 'ok', message: 'Logout successful' });
    });
});



// Sync database and start server
dbStorage.sync().then(() => {
    console.log('Database schema synchronized successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => console.error('Unable to connect to the database:', err));
