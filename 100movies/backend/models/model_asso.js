import User from './user.js';
import Movie from './movies.js';
import Session from './session.js';
// Define associations
User.hasMany(Movie, { foreignKey: 'userId' });
Movie.belongsTo(User, { foreignKey: 'userId' });

export { User, Movie, Session };
