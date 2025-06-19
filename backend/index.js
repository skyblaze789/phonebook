const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static('dist'))

let personsList = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.get("/api/persons",(req,res)=>{
    res.json(personsList);
})

app.get("/info",(req,res)=>{
    const htmlResponse = `<p>Phonebook has info for ${personsList.length} people</p><p>${new Date()}</p>`
    res.send(htmlResponse);
    }
)

app.get("/api/persons/:id",(req,res)=>{
    const id = req.params.id;
    const person = personsList.find((person)=> person.id === id);
    if(!person){
       return res.status(404).end();
    }
    res.send(person);
    }
)

app.delete("/api/persons/:id",(req,res)=>{
    const id = req.params.id;
    personsList = personsList.filter((person)=> person.id !== id);
    res.status(204).end();
    }
)

const createId = ()=>{
    return Math.max(...personsList.map(person => person.id));
}

app.post("/api/persons",(req,res)=>{
    const body = req.body;
    const isInList = personsList.find((person)=>person.name === body.name);
    
    if(!body.name || isInList){
        return res.status(400).json({
        error: 'name must be unique'
    })
    }

    const person = {
        id: (createId() + 1).toString(),
        name: body.name,
        number: body.number
    }

    personsList = personsList.concat(person);
    res.json(person);
    }
)


const unknownEndpoint = (req,res)=>{
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log("app is running on port ",PORT);
})