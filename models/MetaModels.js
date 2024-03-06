import Sequelize from 'sequelize';
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Meta = db.define("meta", {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  keyword: {
    type: DataTypes.TEXT,
  },
}, {
  freezeTableName: true
})

export default Meta