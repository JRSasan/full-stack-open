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
      id: persons.length+1
    }

    if(doesNameExist() === false) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${newName} is already added to the phonebook`)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filters={filters} handleFilters={handleFilters} />
      <h2>Add a new</h2>
      <PersonForm 
      addPerson={addPerson} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
      newName={newName} newNumber={newNumber} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filters={filters} />
    </div>
  )
}

export default App
