const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const params = {
  password: process.argv[2],
  name: process.argv[3],
  number: process.argv[4],
};

const url = `mongodb+srv://fullstack:${params.password}@phonebookcluster.zdt0l.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

if (!params.name && !params.number) {
  PhoneNumber.find({}).then((phoneNumbers) => {
    phoneNumbers.map((phoneNumber) =>
      console.log(`${phoneNumber.name} ${phoneNumber.number}`)
    );

    mongoose.connection.close();
  });

  // Short circuit
  return;
}

const phoneNumber = new PhoneNumber({
  name: process.argv[3],
  number: process.argv[4],
  id: 99999,
});

phoneNumber.save().then((result) => {
  console.log(
    `Added ${result.name}'s phone number (${result.number}) to the phonebook.`
  );
  mongoose.connection.close();
});
