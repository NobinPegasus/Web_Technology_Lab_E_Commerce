const mongoose = require("mongoose");

// const DatabaseConncetion = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/web_project", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Database connected Succesfully.");
//   } catch (error) {
//     console.log(`Database is not connected. : ${error}`);
//   }
// };

const DatabaseConncetion = async () => {
  try {
    await mongoose.connect("mongodb+srv://aliceparent:aliceparent@cluster0.mrvha.mongodb.net/webproject?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected Succesfully.");
  } catch (error) {
    console.log(error);
    console.log(`Database is not connected. : ${error}`);
  }
};

module.exports = DatabaseConncetion;
