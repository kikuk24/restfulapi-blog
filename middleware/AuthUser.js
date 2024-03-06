import Users from "../models/UserModels.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Silakan Login Terlebih Dahulu!" });
  }
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId
    }
  });
  if (!user) return res.status(401).json({ msg: "User Tidak Ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
}

export const adminOnly = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId
    }
  });
  if (!user) return res.status(401).json({ msg: "User Tidak Ditemukan" });
  if (user.role !== "admin") return res.status(403).json({ msg: "Anda Bukan Admin" });
  next();
}