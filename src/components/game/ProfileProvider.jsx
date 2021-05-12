import React, { createContext, useState } from "react"


const PORT = 8000
const URL = `http://localhost:${PORT}`

export const ProfileContext = createContext()

export const ProfileProvider = ( props ) => {

 const [ profile, setProfile ] = useState({events:[]})

 const getProfile = () => {
  return fetch(`${URL}/profile`, {
   headers: {
    "Authorization": `Token ${localStorage.getItem("lu_token")}`
   }
  })
  .then(response => response.json())
  .then(setProfile)

 } // getProfile

 return (
  <ProfileContext.Provider value={{
   profile,
   getProfile,
   setProfile
  }}>
   { props.children }
  </ProfileContext.Provider>
 )
}