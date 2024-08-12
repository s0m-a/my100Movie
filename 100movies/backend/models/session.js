// models/session.model.js
import { Model, DataTypes } from 'sequelize';
import dbStorage from '../config/db.js'; // Adjust the path as needed

class Session extends Model {}

Session.init({
    sid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize : dbStorage.db,
    tableName: 'Sessions', // Ensure this matches the name of your table in the database
    timestamps: false
});

export default Session;
