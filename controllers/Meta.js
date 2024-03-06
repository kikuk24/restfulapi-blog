import Meta from "../models/MetaModels.js";

export const getMeta = async (req, res) => {
  try {
    const response = await Meta.findOne();
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createMeta = async (req, res) => {
  const { title, description, keyword } = req.body;
  try {
    Meta.create({ title, description, keyword });
    res.status(201).json({ msg: "Meta Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const updateMeta = async (req, res) => {
  const meta = await Meta.findOne({
    where: {
      id: 1
    }
  });
  if (!meta) return res.status(404).json({ msg: "Tidak Ditemukan Meta" });
  const { title, description, keyword } = req.body;
  try {
    await Meta.update({
      title,
      description,
      keyword
    }, {
      where: {
        id: 1
      }
    })
    res.status(200).json({ msg: "Meta Updated" });
  }
  catch (error) {
    res.status(400).json({ msg: error.message });
  }
}


export const deleteMeta = async (req, res) => {
  const meta = await Meta.destroy();
  res.json(meta);
}

