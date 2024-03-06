import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Users from "./UserModels.js";
import Categories from "./CategoryModels.js";

const { DataTypes } = Sequelize;

const Blogs = db.define("blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255],
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
  },
  keyword: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING
  },
  view: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});

Users.hasMany(Blogs,);
Blogs.belongsTo(Users, { foreignKey: 'userId' });
Categories.hasMany(Blogs);
Blogs.belongsTo(Categories, { foreignKey: 'categoryId' });
export default Blogs