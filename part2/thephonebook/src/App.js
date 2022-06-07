import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filters, setNewFilters] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log("Phonebook: ", persons)
    } else {
      alert(`${newName} is already added to the phonebook`)
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
