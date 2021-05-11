import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"


export const EventForm = () => {
 const history = useHistory()

 const [ currentEvent, setCurrentEvent ] = useState({
  date: "",
  time: "",
  description: "",
  organizer: localStorage.getItem("lu_token"),
  gameId: ""
 })

 const { games, getGames } = useContext(GameContext)
 const { createEvent } = useContext(EventContext)

 useEffect(() => {
  getGames()
 }, [])

 const changeEventState = ( event ) => {
   const newEvent = { ...currentEvent }
   let selectedVal = event.target.value
   newEvent[event.target.id] = selectedVal
   setCurrentEvent(newEvent)
 }

 const onSubmit = ( event ) => {
  event.preventDefault()

  const newEvent = {...currentEvent}
 
  createEvent(newEvent)
   .then(() => history.push("/events"))
 }


 return (
   <form action="" className="gameForm">
    <h2 className="gameForm__title">Schedule New Event</h2>

   <fieldset>
    <div className="form-group">
     <label htmlFor="gameId">Game: </label>
     <select className="form-control" name="gameId" id="gameId" 
      value={ currentEvent.gameId } 
      onChange={ changeEventState }>
      <option  key="0" value="0">
       Select game
      </option>
      {
       games
       ?
        games.map(game => {
         return <option key={ game.id } value={ game.id }>
          { game.title }
         </option>
        })
       : <div>Loading</div>
      }
     </select>
    </div>   
   </fieldset>


   <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" required className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    {/* “%(value)s” value has an invalid format. It must be in YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ] format. */}
                    <input type="text" name="date" id="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" id="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>


   <button type="submit" className="btn btn-primary" 
    onClick={ onSubmit }>
     Create Event
   </button> 
  </form>
  )
}