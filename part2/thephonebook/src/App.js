import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'

const Notification = ({message, isError}) => {
  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(message === null) {
    return null
  } else if(isError) {
    const errorStyle = {
      ...notifStyle,
      color: 'red'
    }

    return (
    <div style = {errorStyle}>
      {message}
    </div>
    )
  } else {
    return (
      <div style = {notifStyle}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filters, setNewFilters] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
          setMessage(`Updated ${person.name}'s number`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from the server`)
          setIsError(true)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
          setMessage(`Deleted ${name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      <Notification message={message} isError={isError} />
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
