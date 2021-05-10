import React, { useContext, useEffect } from  "react"
import { useHistory } from 'react-router-dom'

import { GameContext } from "./GameProvider"


export const GameList = ( props ) => {
 const { games, getGames } = useContext(GameContext)
 const history = useHistory()

 useEffect(() => {
  console.log("calling games")
  getGames()
  console.log("called games")
  console.table(games)
 }, [])

 return (
  <article className="games">
   <button className="btn btn-2 btn-sep icon-create"
       onClick={() => {
           history.push({ pathname: "/games/new" })
       }}
       >Register New Game
   </button>
   {
    games
    ? 
    games.map(game => {
     return <section key={`game--${game.id}`} className="game">
      <div className="game__ttitle">{ game.title } by { game.maker }</div>
      <div className="game__players">{ game.number_of_players } players needed</div>
      <div className="game__skilllevel">Skill level is { game.skill_level }</div>
     </section>
    })

    : <div>Loading . . </div>
   }
  </article>
 )
}
