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
  } // getGameTypes


    const editGame = ( game ) => {

      return fetch(`${URL}/games/${game.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${localStorage.getItem("lu_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
      })
      .then(getGames)
    } // editGame

    const getGameById = ( id ) => {
      return fetch(`${URL}/games/${id}`, {
        headers:{
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
      })
      .then(response => response.json())
    }


 return (
  <GameContext.Provider value={{ 
   games,
   gameTypes,
   createGame,
   getGames,
   getGameTypes,
   editGame,
   getGameById
  }}>
   { props.children }
  </GameContext.Provider>
 )
}