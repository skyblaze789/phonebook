import React, { Fragment } from 'react'

const Persons = ({list, deleteRecord}) => {
  return (
    <>
    {list.map(person =>{
      return(
        <div key={person.id}>
          <p>{person.name} - {person.number}</p>
          <button onClick={()=> deleteRecord(person.id)}>delete</button>
        </div>
      )
    }) }
    </>
  )
}

export default Persons