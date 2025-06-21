import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import phoneBookServices from './services/phonebook'
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({ message: null, type:null})

  useEffect(() => {
    phoneBookServices
      .getAll()
      .then(initialRecords => {
        setPersons(initialRecords);
      })
  }, [])

  const addContact = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)) {
        phoneBookServices
          .update(existingPerson.id, { name: newName, number: newNumber })
          .then((updatedRecord) => {
            setPersons(persons.map((person) => person.id === updatedRecord.id ? updatedRecord : person))
          })
          .catch((err) => {
            setNotification({ message:err.message, type:err});
            setTimeout(() => {
              setNotification({ message:null, type:null});
            }, 3000);
            setPersons(persons.filter((person) => person.id !== existingPerson.id));
          })

      }

    }
    else {
      phoneBookServices
        .create({ name: newName, number: newNumber })
        .then(returnedRecord => {
          setPersons(persons.concat(returnedRecord));
          setNewName('');
          setNewNumber('');
          setNotification({message: "Added " + newName , type: "success"});
          setTimeout(() => {
            setNotification({ message:null, type:null});
          }, 3000);
        })
        .catch(error =>{
          setNotification({message: error.response.data.error, type: "err"});
        })
      }
    }

  const deleteRecordOf = (id) => {
    if (window.confirm("Delete " + persons.find((person) => person.id === id).name)) {
      phoneBookServices
        .deleteResourse(id)
        .then((status) => {
          if(Number(status) === 204){
            setPersons(persons.filter((person) => person.id !== id));
          }
        })
        .catch(() => {
          alert(`You have already deleted`);
          setPersons(persons.filter((person) => person.id !== id));
        })
    }
  }

  const filteredPersons = searchInput ?
    persons.filter(person =>
      person.name.toLowerCase().includes(searchInput.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        addContact={addContact}
        handleNameChange={e => setNewName(e.target.value)}
        handleNumberChange={e => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons list={filteredPersons} deleteRecord={deleteRecordOf} />

    </div>
  )
}

export default App
