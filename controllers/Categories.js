import Blogs from "../models/BlogModels.js";
import Categories from "../models/CategoryModels.js";
import Users from "../models/UserModels.js";

export const getAllCategories = async (req, res) => {
  try {
    const response = await Categories.findAll({
      include: {
        model: Blogs,
        include: {
          model: Users, attributes: ['id', 'name', 'email']
        }
      }
    });
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getSingleCategory = async (req, res) => {
  try {
    const response = await Categories.findOne({
      where: {
        slug: req.params.id
      },
      include: {
        model: Blogs,
        include: {
          model: Users, attributes: ['id', 'name', 'email', 'image', 'url']
        }
      }
    })
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createCategory = async (req, res) => {
  const { name, slug } = req.body;
  try {
    await Categories.create({
      name,
      slug
    })
    res.status(201).json({ msg: "Category Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const updateCategory = async (req, res) => {
  const category = await Categories.findOne({
    where: {
      slug: req.params.id
    }
  });
  if (!category) return res.status(404).json({ msg: "Tidak Ditemukan Category" });
  const { name, slug } = req.body;
  try {
    await Categories.update({
      name,
      slug
    },
      {
        where: {
          id: category.id
        }
      });
    res.status(200).json({ msg: "Category Updated" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const deleteCategory = async (req, res) => {
  const category = await Categories.findOne({
    where: {
      slug: req.params.id
    }
  });
  if (!category) return res.status(404).json({ msg: "Tidak Ditemukan Category" });
  try {
    await Categories.destroy({
      where: {
        id: category.id
      }
    });
    res.status(200).json({ msg: "Category Terhapus" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

