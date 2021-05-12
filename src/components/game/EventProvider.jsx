import React, { createContext, useState } from "react"

const PORT = 8000
const URL = `http://localhost:${PORT}`

export const EventContext = createContext()

export const EventProvider = ( props ) => {
 const [ events, setEvents ] = useState([])

 const createEvent = ( event ) => {
      console.log("nwe game properties")
    console.table(event)
 // "Content-Type": "application/json"

  return fetch(`${URL}/events`, {
   method: 'POST',
   headers: {
    "Authorization": `Token ${localStorage.getItem("lu_token")}`,
    "Content-Type": "application/json"
   },
   body: JSON.stringify(event)
  })
  .then(getEvents)

 } // createEvent


 const getEvents = () => {
  return fetch(`${URL}/events`, {
   headers: {
    "Authorization": `Token ${localStorage.getItem("lu_token")}`
   }
  })
  .then(response => response.json())
  .then(response => setEvents(response))
 } // getEvents


 const joinEvent = ( eventId ) => {
   return fetch(`${URL}/events/${ eventId }/signup`, {
     method: 'POST',
     headers: {
       'Authorization': `Token ${localStorage.getItem("lu_token")}`
     }
   })
    .then(response => response.json())
    .then(getEvents)
 } // joinEvent


 const leaveEvent = ( eventId ) => {
   return fetch(`${URL}/events/${ eventId }/signup`, {
     method: 'DELETE',
     headers: {
       'Authorization': `Token ${localStorage.getItem("lu_token")}`
     }
   })
    // uncommenting this code results in error since the server-side
    // is not expecting anything returned to it
    // .then(response => response.json())
    .then(getEvents)
 } // leaveEvent


 return (
  <EventContext.Provider value={{
   events,
   getEvents,
   createEvent,
   joinEvent,
   leaveEvent
  }}>
   { props.children }
  </EventContext.Provider>
 )
}