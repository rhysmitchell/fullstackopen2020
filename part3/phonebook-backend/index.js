require('dotenv').config();
const express = require('express');
const app = express();
const Contact = require('./models/contact');
app.use(express.json());
app.use(express.static('build'));

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);
morgan.token('data', function (req) {
  return JSON.stringify(req.body);
});

let contacts = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  res.send(
    `<div>
      <p>Phonebook has info for ${contacts.length} people</p>
      <p>${new Date()}</p>
    </div>`
  );
});

app.get('/api/phonebook', (req, res) =>
  Contacts.find({}).then((contacts) => {
    console.log(contacts);
    res.json(contacts);
  })
);

app.post('/api/phonebook', (req, res) => {
  // Short-circuit if required params aren't provided
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: `Name or Number parameter wasn't provided`,
    });
  }

  // Short-circuit if name already exists in local colleciton
  const nameExistsInCollection =
    contacts.filter((phoneNumber) => phoneNumber.name === req.body.name)
      .length > 0;

  if (nameExistsInCollection) {
    return res.status(400).json({
      error: `Name must be unique`,
    });
  }

  const bigNumber = 1000;
  const randomId = Math.floor(Math.random() * bigNumber + 1);

  const newPhoneNumber = { ...req.body, id: randomId };
  contacts = contacts.concat(newPhoneNumber);

  res.status(200).end();
});

app.get('/api/phonebook/:id', (req, res) => {
  const id = Number(req.params.id);
  const phoneNumber = contacts.find((phoneNumber) => phoneNumber.id === id);

  if (!phoneNumber) {
    return res.send(`<p>Phonebook entry with id: ${id} does not exist<p/>`);
  }

  res.json(phoneNumber);
});

app.put('/api/phonebook/:id', (req, res) => {
  const idToUpdate = Number(req.params.id);
  const updatedObject = { ...req.body, id: idToUpdate };

  contacts = contacts.map((phoneNumber) =>
    phoneNumber.id !== idToUpdate ? phoneNumber : updatedObject
  );

  res.json(contacts);
});

app.delete('/api/phonebook/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((phoneNumber) => phoneNumber.id !== id);

  res.status(204).end();
});
