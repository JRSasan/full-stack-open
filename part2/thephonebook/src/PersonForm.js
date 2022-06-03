const PersonForm = ({addPerson, handleNameChange, handleNumberChange, newName, newNumber}) => (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input type="tel" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

  export default PersonForm