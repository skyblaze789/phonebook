const express = require("express");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static('dist'))

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.get("/api/persons", (req, res) => {
    Person.find({})
        .then(result => {
            res.json(result)
        })
})

app.get("/info", (req, res) => {
    const htmlResponse = `<p>Phonebook has info for ${personsList.length} people</p><p>${new Date()}</p>`
    res.send(htmlResponse);
}
)

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
        .then(person => {
            if (!person) {
                next(error)
            } else {
                res.send(person);

            }
        })
}
)

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
}
)

app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    const { name, number } = req.body;

    Person.findById(id)
        .then(person => {
            if (!person) {
                response.status(204).end()
            }

            person.name = name;
            person.number = number;

            return person.save().then(updatedperson => {
                res.json(updatedperson)
            })
                .catch(error => next(error))
        })
})

app.post("/api/persons", (req, res,next) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({
            error: 'no name is given'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => next(error))
}
)


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

    next(error)

}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
})