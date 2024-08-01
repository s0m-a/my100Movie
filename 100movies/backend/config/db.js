import { Sequelize } from "sequelize";


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_DATABASE = process.env.DB_DATABASE || 'my1000movie';
const DB_USER = process.env.DB_USER || 'soma';
const DB_PWD = process.env.DB_PWD || 'soma';

const DB_URL = `postgres://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

class DbStorage{
    constructor (){
        this.db = new Sequelize(DB_URL);
    }

    //checks if the connection to the databse is established
    async checkLife()
    {
        try{
        
            await this.db.authenticate();
            console.log("connection successful");
            return true;
        }catch(err){
            console.error("unable to connect to the database", err)
            return false;
        }
    }

    // creates the table if it doesn't exist (and does nothing if it already exists)
    async sync(){
        try{
            await this.db.sync( { alter: true});
            console.log("database shema synchronized successfully")
        }catch (error){
            console.error("error synchronizing database schema failed")
        }  
    }

    async close() {
        try {
            await this.db.close();
            console.log("Database connection closed.");
        } catch (error) {
            console.error("Error closing database connection:", error);
        }
    }

}

const dbStorage = new DbStorage();
dbStorage.checkLife();
export default dbStorage;