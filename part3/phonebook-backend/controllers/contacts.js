const contactsRouter = require('express').Router()
const Contact = require('../models/Contact')

contactsRouter.get('/', (req, res, next) =>
    Contact.find({}).then((contacts) => res.json(contacts)).catch(error => next(error))
)

contactsRouter.get('/:id', (req, res, next) => {
    const idToGet = req.params.id
    Contact.findById(idToGet)
        .then(contact => {
            if (contact) {
                res.json(contact)
            }
            else {
                res.status(404).send({ error: `<p>Phonebook entry with id: ${idToGet} does not exist<p/>` })
                res.status(404).end()
            }
        }).catch(error => next(error))
})

contactsRouter.post('/', (req, res, next) => {
    // Short-circuit if required params aren't provided
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'Name or Number parameter wasn\'t provided',
        })
    }

    const name = req.body.name
    Contact.find({ name: name }).then(() => {
        const newContact = new Contact({ ...req.body })
        newContact.save().then(savedContact =>
            res.json(savedContact)
        ).catch(error => next(error))
    })
})

contactsRouter.delete('/:id', (req, res, next) => {
    const idToDelete = req.params.id
    Contact.findByIdAndRemove(idToDelete)
        .then(() =>
            res.status(204).end()
        ).catch(error => next(error))
})

contactsRouter.put('/:id', (req, res, next) => {
    const idToUpdate = req.params.id
    const contact = {
        name: req.body.name,
        number: req.body.number
    }

    Contact.findByIdAndUpdate(idToUpdate, contact, { new: true })
        .then(updatedContact =>
            res.json(updatedContact)
        ).catch(error => next(error))
})

module.exports = contactsRouter