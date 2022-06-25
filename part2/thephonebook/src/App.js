import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filters, setNewFilters] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const doesNameExist = () => persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify(`Added ${personObject.name}`)
        setNewName('')
        setNewNumber('')
      })
  }

  const updatePerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase())
    const changedPerson = {...person, number: newNumber}

    if(newNumber === '') {
      alert(`${newName} is already added to the phonebook`)
    } else if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          notify(`Updated ${person.name}'s number`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          notify(`Information of ${person.name} has already been removed from the server`, 'alert')
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
  }

  const removePerson = (name, id) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(()=> {
          setPersons(persons.filter(p => p.id !== id))
          notify(`Deleted ${name}`)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilters = (event) => {
    setNewFilters(event.target.value)
  }

  const handleAdd = doesNameExist() ? updatePerson : addPerson

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filters={filters} handleFilters={handleFilters} />
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={handleAdd} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} newNumber={newNumber} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filters={filters} 
        removePerson={removePerson} />
    </div>
  )
}

export default App
