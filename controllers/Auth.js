import Users from "../models/UserModels.js";
// import argon2 from "argon2";
import bycrypt from "bcrypt";

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const hash = await bycrypt.hash(password, 10);
  const imageName = `${req.protocol}://${req.get('host')}/public/images/users/default-image.jpg`;
  try {
    await Users.create({
      name: name,
      email: email,
      password: hash,
      role: "user",
      image: imageName
    })
    res.status(201).json({ msg: "Register Berhasil" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  const match = await bycrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: "Password Salah" });
  req.session.userId = user.uuid;
  const { uuid, username, email, role } = user;
  res.status(200).json({ uuid, username, email, role });
}

export const Me = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" });
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role", 'image'],
    where: {
      uuid: req.session.userId
    }
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  res.status(200).json({ user });
}

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak Dapat Logout" });
    res.status(200).json({ msg: "Logout Berhasil" });
  });
}