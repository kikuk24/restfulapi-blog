import { Sequelize } from 'sequelize'
import db from '../config/db.js'
import Users from './UserModels.js'

const { DataTypes } = Sequelize

const Portofolio = db.define('portfolios', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
})

Users.hasMany(Portofolio)
Portofolio.belongsTo(Users)
export default Portofolio