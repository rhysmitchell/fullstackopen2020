require('dotenv').config();
const morgan = require('morgan');
const Contact = require('./models/contact');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.static('build'));
app.use(cors());



app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);
morgan.token('data', function (req) {
  return JSON.stringify(req.body);
});

app.get('/', (req, res, next) =>
  res.send('<h1>Hello World!</h1>').catch(error => next(error)
  ));

app.get('/info', (req, res, next) => {

  Contact.find({}).then((contacts) => res.send(`<div>
  <p>Phonebook has info for ${contacts.length} people</p>
  <p>${new Date()}</p>
</div>`)
  ).catch(error => next(error));
});

app.get('/api/phonebook', (req, res, next) =>
  Contact.find({}).then((contacts) => res.json(contacts)).catch(error => next(error))
);

app.post('/api/phonebook', (req, res, next) => {
  // Short-circuit if required params aren't provided
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: `Name or Number parameter wasn't provided`,
    });
  }

  const name = req.body.name;
  Contact.find({ name: name }).then(contact => {
    const newContact = new Contact({ ...req.body });
    newContact.save().then(savedContact =>
      res.json(savedContact)
    ).catch(error => next(error));
  });
});

app.get('/api/phonebook/:id', (req, res, next) => {
  const idToGet = req.params.id;
  Contact.findById(idToGet)
    .then(contact => {
      if (contact) {
        res.json(contact)
      }
      else {
        res.status(404).send({ error: `<p>Phonebook entry with id: ${idToGet} does not exist<p/>` });
        res.status(404).end()
      }
    }).catch(error => next(error));
});

app.put('/api/phonebook/:id', (req, res, next) => {
  const idToUpdate = req.params.id;
  const contact = {
    name: req.body.name,
    number: req.body.number
  };

  Contact.findByIdAndUpdate(idToUpdate, contact, { new: true })
    .then(updatedContact =>
      res.json(updatedContact)
    ).catch(error => next(error));
});

app.delete('/api/phonebook/:id', (req, res, next) => {
  const idToDelete = req.params.id;
  Contact.findByIdAndRemove(idToDelete)
    .then(() =>
      res.status(204).end()
    ).catch(error => next(error));
});

const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: 'Unknown Endpoint!' })


app.use(unknownEndpoint)

const errorHandler = (error, request, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Id was in the incorrect format' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
