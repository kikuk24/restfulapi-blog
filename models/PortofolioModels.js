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
  link: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
})

Users.hasMany(Portofolio);
Portofolio.belongsTo(Users, { foreignKey: 'userId' });
export default Portofolio