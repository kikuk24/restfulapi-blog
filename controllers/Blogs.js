import Categories from "../models/CategoryModels.js";
import Blogs from "../models/BlogModels.js";
import Users from "../models/UserModels.js";
import path from "path";
import fs from "fs";
import { Op } from 'sequelize';

export const getBlogs = async (req, res) => {
  try {
    const response = await Blogs.findAll({
      include: [
        {
          model: Users,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Categories
        }
      ],
      order: [['id', 'DESC']]
    });
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getBlogsBySlug = async (req, res) => {
  const blog = await Blogs.findOne({
    where: {
      slug: req.params.id
    }
  })
  if (!blog) return res.status(404).json({ msg: "Blog Tidak Ditemukan" });
  try {
    const response = await Blogs.findOne({
      where: {
        slug: req.params.id
      },
      include: [
        {
          model: Users,
          attributes: ['id', 'name', 'email', 'image', 'url'],
        },
        {
          model: Categories
        }
      ]
    });
    await Blogs.increment({
      view: 1
    }, {
      where: {
        slug: req.params.id
      }
    })
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ msg: error.message });

  }
}

export const searchBlogAndPaginate = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search || '';
  const limit = parseInt(req.query.limit) || 10;
  const offset = page * limit;
  const totalRows = await Blogs.count({
    where: {
      [Op.or]: [{
        title: {
          [Op.like]: `%${search}%`
        }
      },
      {
        content: {
          [Op.like]: `%${search}%`
        }
      }
      ]
    }
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Blogs.findAndCountAll({
    where: {
      [Op.or]: [{
        title: {
          [Op.like]: `%${search}%`
        }
      },
      {
        content: {
          [Op.like]: `%${search}%`
        }
      }]
    },
    offset,
    limit,
    order: [['id', 'DESC']],
    include: [
      {
        model: Users, attributes: ['id', 'name', 'email'],
      },
      {
        model: Categories
      }
    ]
  })
  res.status(200).json({ result, totalRows, totalPage, limit, page });
}

export const getAllBlogs = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Blogs.findAll({
        include: [
          {
            model: Users, attributes: ['id', 'uuid', 'name', 'email', 'role'],
          },
          {
            model: Categories
          }
        ]
      });
      res.status(200).json(response);
    } else {
      response = await Blogs.findAll({
        where: {
          userId: req.userId
        },
        include: [
          {
            model: Users, attributes: ['id', 'name', 'email', 'role'],
          },
          {
            model: Categories
          }
        ]
      });
      res.status(200).json(response);
    }
  }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getSingleBlog = async (req, res) => {
  try {
    const response = await Blogs.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Users, attributes: ['id', 'name', 'email'],
        },
        {
          model: Categories
        }
      ]
    })
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createBlog = async (req, res) => {
  const { title, content, description, keyword, category, slug } = req.body;
  let fileName;
  let urlImage;
  if (req.files === null) {
    fileName = `${req.protocol}://${req.get('host')}/public/images/default-image.jpg`;
  } else {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = slug + ext;
    urlImage = `${req.protocol}://${req.get('host')}/public/images/blog/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Tipe File Tidak Didukung' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran File Terlalu Besar' });
    file.mv(`./public/images/blog/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });
    })
  }
  try {
    await Blogs.create({
      title: title,
      content: content,
      description: description,
      slug: slug,
      userId: req.userId,
      categoryId: category,
      keyword: keyword,
      image: fileName,
      url: urlImage,
      view: 0
    })
    res.status(201).json({ msg: "Blog Berhasil dibuat" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const updateBlog = async (req, res) => {
  const blog = await Blogs.findOne({
    where: {
      id: req.params.id
    }
  })
  let view = blog.view
  if (!blog) return res.status(404).json({ msg: 'Blog tidak ditemukan' })
  const { title, content, description, keyword, category, slug } = req.body;
  let fileName;
  let urlImage;
  if (req.files === null) {
    fileName = blog.image;
  } else {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = slug + ext;
    urlImage = `${req.protocol}://${req.get('host')}public/images/blog/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.webp'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Tipe File Tidak Didukung' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran File Terlalu Besar' });
    const filePath = `./public/images/blog/${fileName}`;
    fs.unlinkSync(filePath);
    file.mv(`./public/images/blog/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });

    })
  }
  try {
    await Blogs.update({
      title: title,
      content: content,
      description: description,
      slug: slug,
      userId: req.userId,
      categoryId: category,
      keyword: keyword,
      image: fileName,
      url: urlImage,
      view: view
    }, {
      where: {
        id: blog.id
      }
    }
    )
    res.status(200).json({ msg: "Blog Berhasil diupdate" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }

}

export const deleteBlog = async (req, res) => {
  const blog = await Blogs.findOne({
    where: {
      id: req.params.id
    }
  })
  if (!blog) return res.status(404).json({ msg: 'Blog tidak ditemukan' })
  try {
    const filePath = `./public/images/blog/${blog.image}`;
    fs.unlinkSync(filePath);
    await Blogs.destroy({
      where: {
        id: blog.id
      }
    })
    res.status(200).json({ msg: "Blog Berhasil dihapus" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
