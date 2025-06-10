const dotenv = require('dotenv');
const app = require('./src/app'); // Assuming you have an app.js file that exports your Express app

dotenv.config();

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




  