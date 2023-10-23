import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: 'auto'
  }
}));
const app = express();
app.use(express.json());
app.listen(process.env.APP_PORT, () => {
  console.log(`Server has started`);
})