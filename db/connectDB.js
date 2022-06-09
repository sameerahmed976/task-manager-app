const mongoose = require("mongoose");

const createDB = async (DB_NAME_URL) => {
  try {
    await mongoose.connect(DB_NAME_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createDB };
