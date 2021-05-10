import React, { createContext, useState } from "react"

const PORT = 8000
const URL = `http://localhost:${PORT}`

export const EventContext = createContext()

export const EventProvider = ( props ) => {
 const [ events, setEvents ] = useState([])

 const getEvents = () => {
  return fetch(`${URL}/events`, {
   headers: {
    "Authorization": `Token ${localStorage.getItem("lu_token")}`
   }
  })
  .then(response => response.json())
  .then(response => setEvents(response))
 } // getEvents


 return (
  <EventContext.Provider value={{
   events,
   getEvents
  }}>
   { props.children }
  </EventContext.Provider>
 )
}