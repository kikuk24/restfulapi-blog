import Portofolio from "../models/PortofolioModels.js";
import path from "path";
import fs from "fs";
export const getAllPortofolios = async (req, res) => {
  try {
    const response = await Portofolio.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

}
export const getSinglePortofolio = async (req, res) => {
  const portofolio = Portofolio.findOne({ where: { id: req.params.id } });
  if (!portofolio) return res.status(404).json({ msg: "Portofolio Tidak Ditemukan" });
  try {
    const response = await Portofolio.findOne({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createPortofolio = (req, res) => {
  const { title, link, description, category } = req.body;

  const file = req.file;
  if (!file) return res.status(400).json({ msg: "Mohon Upload Gambar" });
  const fileName = file.filename;
  const fileSize = file.size;
  const ext = path.extname(fileName);
  const allowedType = ['.png', '.jpg', '.jpeg', 'webp'];

  if (!allowedType.includes(ext)) {
    return res.status(422).json({ msg: "Tipe File Tidak Didukung" });
  }
  if (fileSize > 5000000) {
    return res.status(422).json({ msg: "Ukuran File Terlalu Besar" });
  }
  const urlImage = `${req.protocol}://${req.get('host')}/public/images/portofolios/${fileName}`;

  file.mv(`./public/images/portofolios/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Portofolio.create({
        title,
        link,
        description,
        category,
        image: fileName
        , url: urlImage

      })
      res.status(201).json({ msg: "Portofolio Created" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  })

}
export const updatePortofolio = async (req, res) => {
  const portofolio = await Portofolio.findOne({
    where: {
      id: req.params.id
    }
  })
  if (!portofolio) return res.status(404).json({ msg: 'Portofolio Tidak Ditemukan' });

  const { title, link, description, category } = req.body;
  let fileName;
  if (req.file === null) {
    fileName = portofolio.image;
  }
  else {
    const file = req.file;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    fileName = title + ext;
    const urlImage = `${req.protocol}://${req.get('host')}/public/images/portofolios/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', 'webp'];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Tipe File Tidak Didukung' });

    if (fileSize > 5000000) return res.status(422).json({ msg: 'Ukuran File Terlalu Besar' });

    const filepath = `./public/images/portofolios/${portofolio.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/portofolios/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        Portofolio.update({
          title,
          link,
          description,
          category,
          image: fileName,
          url: urlImage
        })
        res.status(200).json({ msg: "Portofolio Updated" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    })
  }
}
export const deletePortofolio = async (req, res) => {
  const portofolio = await Portofolio.findOne({
    where: {
      id: req.params.id
    }

  })
  if (!portofolio) return res.status(404).json({ msg: 'Portofolio Tidak Ditemukan' });

  try {
    const filePath = `./public/images/portofolios/${portofolio.image}`;
    fs.unlinkSync(filePath);
    await Portofolio.destroy({
      where: {
        id: portofolio.id
      }

    })
    res.status(200).json({ msg: "Portofolio Terhapus" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }
}