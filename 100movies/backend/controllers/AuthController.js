
import { compare as compareHash, hash as hashPassword } from 'bcrypt';
import dbStorage from "../config/db.js"; // Assuming this provides database connection
import pkg from 'uuid';
const { v4: uuidv4 } = pkg;
import { User, Movie } from '../models/model_asso.js';
import bcrypt from 'bcrypt'
export default class AuthController {
  
  static async signin(data) {
    const { userName, email, password } = data;

    // Check required fields
    for (const key of ['userName', 'email', 'password']) {
      if (!data[key]) {
        return { status: 'error', message: `Field ${key} is required` };
      }
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ where: { userName } });
    if (existingUser) {
      return { status: 'error', message: `Username "${userName}" already exists, please choose another` };
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return { status: 'error', message: `Email "${email}" is already registered` };
    }

    // Create user in the database
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ userName, email, password:hashedPassword});
      return { status: 'OK', id: user.id, name: user.userName };
    } catch (error) {
      console.error('Error creating user:', error);
      return { status: 'error', message: 'Failed to create user' };
    }
  }

  static async login(data) {
    const { userName, password } = data;

    // Check required fields
    for (const key of ['userName', 'password']) {
      if (!data[key]) {
        return { status: 'error', message: `Field ${key} is required` };
      }
    }

    
    // Find user by username
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return { status: 'error', message: `User "${userName}" does not exist` };
    }

    // Compare passwords
    const match = await compareHash(password, user.password);
    if (!match) {
      return { status: 'error', message: 'Invalid password' };
    }

    // Successful login

    return { status: 'OK', userId: user.id, userName: user.userName};
  }

}