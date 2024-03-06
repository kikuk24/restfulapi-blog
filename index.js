const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server has started`);
})