import express from 'express';
import dotenv from 'dotenv';
import Sequelizetore from 'connect-session-sequelize';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import cors from 'cors';
import UserRoute from './routes/UsersRoute.js';
import BlogsRoutes from './routes/BlogsRoutes.js';
import PortofoliosRoutes from './routes/Portofolio.js';
import MetaRoutes from './routes/MetaRoutes.js';
import CategoryRoute from './routes/CategoryRoute.js';
import db from './config/db.js';
import AuthRouter from './routes/AuthRouter.js';

// (async () => {
//   await db.sync();
// })()

const corsOption = {
  origin: [/\.kikukcode\.com$/, 'https://kikukcode.com', 'http://localhost:5173'],
  credentials: true
}

dotenv.config();
const app = express();
const sessionStore = Sequelizetore(session.Store);
const store = new sessionStore({
  db: db
});
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}));
app.use(cors(corsOption))
app.use(express.json());
app.use('/public', express.static('public'));
app.use(fileUpload())
app.use(UserRoute)
app.use(BlogsRoutes)
app.use(PortofoliosRoutes)
app.use(MetaRoutes)
app.use(CategoryRoute)
app.use(AuthRouter)

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server has started`);
})