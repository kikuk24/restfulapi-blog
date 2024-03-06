import Users from "../models/UserModels.js";
// import argon2 from "argon2";
import bycrypt from "bcrypt";
import path from "path";
import fs from "fs";
export const getAllUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ['id', 'uuid', 'name', 'email', 'role', 'image', 'url'],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
export const getSingleUser = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        uuid: req.params.id
      }
    })
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const hash = await bycrypt.hash(password, 10);
  const imageName = `${req.protocol}://${req.get('host')}/public/images/users/default-image.jpg`;
  try {
    await Users.create({
      name: name,
      email: email,
      password: hash,
      role: role,
      image: imageName,
      url: imageName
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: 'User Tidak Ditemukan' });
  const { name, email, password, confPassword, role } = req.body;

  let hashPassword;
  if (password === '' || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await bycrypt.hash(password, 10);
  }
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  let fileName = '';
  let urlImage;
  if (req.files === null) {
    fileName = user.image;
  } else {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    urlImage = `${req.protocol}://${req.get('host')}/public/images/users/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Tipe File Tidak Didukung' });
    if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran File Terlalu Besar' });

    const filePath = `./public/images/users/${fileName}`;
    fs.unlinkSync(filePath);
    file.mv(`./public/images/users/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });
    })
  }
  try {
    await Users.update({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      image: urlImage,
      url: urlImage

    }, {
      where: {
        id: user.id
      }

    });
    res.status(200).json({ msg: "User Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }

} 

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id
    }
  })
  if (!user) return res.status(404).json({ msg: 'User Tidak Ditemukan' });
  try {
    await Users.destroy({
      where: {
        id: user.id
      }
    })
    res.status(200).json({ msg: "User Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}


