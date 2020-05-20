const express = require('express');
const app = express();

let phoneNumbers = [
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
      <p>Phonebook has info for ${phoneNumbers.length} people</p>
      <p>${new Date()}</p>
    </div>`
  );
});

app.get('/api/phonebook', (req, res) => {
  res.json(phoneNumbers);
});

app.get('/api/phonebook/:id', (req, res) => {
  const id = Number(req.params.id);
  const phoneNumber = phoneNumbers.find((phoneNumber) => phoneNumber.id === id);

  if (!phoneNumber) {
    res.send(`<p>Phonebook entry with id: ${id} does not exist<p/>`);
  }

  res.json(phoneNumber);
});

app.delete('/api/phonebook/:id', (req, res) => {
  const id = Number(req.params.id);
  phoneNumbers = phoneNumbers.filter((phoneNumber) => phoneNumber.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
