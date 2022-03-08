const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOURI, {useCreateIndex: true, useNewUrlParser: true})
.then(() => console.log('db connection successful.'))
.catch(e => console.log(e));

/*
const mongo = mongoose.connect("mongodb+srv://myapi:aurasoft@cluster0.dliih.mongodb.net/test?authSource=admin&replicaSet=atlas-dlxag4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  mongo.then(
    () => {
      console.log("db connected");
    },
    (error) => {
      console.log(error, "error");
    }
  );
module.exports = mongo;
*/