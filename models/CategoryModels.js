import Sequelize from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Categories = db.define("categories", {
  name: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
})

export default Categories