import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filters, setNewFilters] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
          setNewName('')
          setNewNumber('')
        })
      }
  }

  const removePerson = (name, id) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(()=> {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  console.log("Phonebook: ", persons)

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
