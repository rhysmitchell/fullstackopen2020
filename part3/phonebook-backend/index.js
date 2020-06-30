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

let contacts = [];

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
  Contact.find({}).then((contacts) => res.json(contacts))
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
    contacts.filter((contact) => contact.name === req.body.name).length > 0;

  if (nameExistsInCollection) {
    return res.status(400).json({
      error: `Name must be unique`,
    });
  }

  const bigNumber = 1000;
  const randomId = Math.floor(Math.random() * bigNumber + 1);

  const newContact = { ...req.body, id: randomId };
  contacts = contacts.concat(newContact);

  res.status(200).end();
});

app.get('/api/phonebook/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return res.send(`<p>Phonebook entry with id: ${id} does not exist<p/>`);
  }

  res.json(contact);
});

app.put('/api/phonebook/:id', (req, res) => {
  const idToUpdate = Number(req.params.id);
  const updatedObject = { ...req.body, id: idToUpdate };

  contacts = contacts.map((contact) =>
    contact.id !== idToUpdate ? contact : updatedObject
  );

  res.json(contacts);
});

app.delete('/api/phonebook/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
