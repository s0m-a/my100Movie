import { response } from 'express';
import dbStorage from './config/database.js';
import AuthController from './controller/authController.js';


  try {
    
    await dbStorage.db.sync(); // Sync models with database
    
    // const user1 = await User.create({
    //   userName: 'user2',
    //   email: 'user2@example.com',
    //   password: 'pass1',
    // });
    // const data ={ userName: "user6", email: 'user6@example.com', password:'pass1'};
    // AuthController.signin(data)

    const data ={ userName: "user6", password:'pass1'};
    AuthController.login(data)
    .then(response => console.log(response))
    .catch(error => console.error('Error creating user:', error))
    .finally(async () => {
      // Optional: Close database connection or perform cleanup
      await dbStorage.close(); // Assuming dbStorage provides a method to close the connection
    });
  }catch (err){
    console.log(err)
  }