import React, { createContext, useState } from "react"

const PORT = 8000
const URL = `http://localhost:${PORT}`

export const GameContext = createContext()


export const GameProvider = ( props ) => {
 
  const [ gameTypes, setTypes ] = useState([])
  const [ games, setGames ] = useState([])

  const createGame = ( game ) => {

    return fetch(`${URL}/games`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    })
    .then(getGames)
  } // createGame


  const getGames = () => {
   return fetch(`${URL}/games`, {
    headers: {
     "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
   })
    .then(response => response.json())
    .then(response => setGames(response))
  } // getGames


  const getGameTypes = () => {
    return fetch(`${URL}/gametypes`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
    .then(response => response.json())
    .then(response => setTypes(response))
  }

 return (
  <GameContext.Provider value={{ 
   games,
   gameTypes,
   createGame,
   getGames,
   getGameTypes
  }}>
   { props.children }
  </GameContext.Provider>
 )
}