import { Sequelize } from "sequelize";


const db = new Sequelize('kikukcode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
export default db;

