const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGOURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => console.log('Connected to Mongo DB')
  );
};

module.exports = connectDB;
