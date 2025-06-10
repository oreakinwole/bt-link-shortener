import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




  