const Persons = ({persons, filters}) => {
  const personsToShow = filters === ""
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filters.toLowerCase()) || person.name.toUpperCase().includes(filters.toUpperCase()))

  return (
    <div>
      {personsToShow.map(person => 
      <Person key={person.id} name={person.name} number={person.number} />
      )}
    </div>
  )
}

const Person = ({id, name, number}) => <p key={id}>{name} {number}</p>

export default Persons