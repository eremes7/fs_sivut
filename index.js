const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

app.use(morgan('## :method :url -- :status -- :response-time ms -- :body'))

morgan.token('body', (req, res) => JSON.stringify(req.body));



let persons = [
    {
        name: "Arto Hellas",
        number: "6969420",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    }
]
app.get('/', (req, res) => {
    res.send('<h1>Sivu</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    res.send(`<h4>Phonebookissa on  ${persons.length} ihmisen tiedot</h4><div>${new Date()}</div>`)



})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    if (persons) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const existingPerson = persons.find(person => person.name === body.name)

    if (existingPerson) {
        return response.status(400).json({
            error: 'Nimi on jo käytössä'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    console.log(person)
    persons = persons.concat(person)
    response.json(persons)
})

