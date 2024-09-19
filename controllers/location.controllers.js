const Location = require("../model/model.location");

export const saveLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  try {
    const newLocation = new Location({ userId, latitude, longitude });
    await newLocation.save();
    res.json({ message: "Location saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
