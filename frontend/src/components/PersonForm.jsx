const PersonForm = ({addContact,name,number,handleNameChange,handleNumberChange}) => {
  return (
    <form onSubmit={addContact}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input type='number' value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
  )
}

export default PersonForm