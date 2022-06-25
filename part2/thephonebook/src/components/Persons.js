const Persons = ({persons, filters, removePerson}) => {
  const personsToShow = filters === ""
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filters.toLowerCase()) || person.name.toUpperCase().includes(filters.toUpperCase()))

  return (
    <div>
      {personsToShow.map(person => 
      <Person 
        key={person.id} 
        name={person.name} 
        number={person.number} 
        handleClick={() => removePerson(person.name, person.id)} />
      )}
    </div>
  )
}

const Person = ({id, name, number, handleClick}) => 
<p key={id}>
  {name} {number}
  <button onClick={handleClick}>
    delete</button>
</p>

export default Persons