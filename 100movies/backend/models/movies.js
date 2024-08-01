import { Sequelize, DataTypes, Model } from 'sequelize';
import dbStorage from '../config/db.js';

class Movie extends Model {}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },        
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize: dbStorage.db,
        tableName: 'Movies',
    }
);

export default Movie;
