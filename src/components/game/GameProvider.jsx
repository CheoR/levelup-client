import React, { createContext, useState } from "react"

const PORT = 8000
const URL = `http://localhost:${PORT}`

export const GameContext = createContext()


export const GameProvider = ( props ) => {
 
  const [ games, setGames ] = useState([])
 
  const getGames = () => {
   console.log("\t\t=>fetching games")
   return fetch(`${URL}/games`, {
    headers: {
     "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
   })
    .then(response => response.json())
    .then(response => setGames(response))
  } // getGames


 return (
  <GameContext.Provider value={{ 
   games,
   getGames
  }}>
   { props.children }
  </GameContext.Provider>
 )
}