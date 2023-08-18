const mongoose = require('mongoose');

const mongo_db = process.env.MONGODB_URI

const mongoDB_Connection = async() => {
    await mongoose.connect(mongo_db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Radi MongoDB'))
      .catch((error) => console.log(error))
}

module.exports = mongoDB_Connection