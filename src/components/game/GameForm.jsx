import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()

    const { createGame, getGameTypes, gameTypes, editGame, getGameById } = useContext(GameContext)
    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })


    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
      if(gameId) {
        getGameById(gameId).then(game => {
          console.log("game is")
          console.table(game)
          setCurrentGame({
            skillLevel: parseInt(game.skill_level),
            numberOfPlayers: game.number_of_players,
            title: game.title,
            maker: game.maker,
            gameTypeId: game.gametype
          })
        })
      }
    }, [gameId])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameTitleState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.title = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.maker = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.numberOfPlayers = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameSkillLevelState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.skillLevel = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.gameTypeId = event.target.value
        setCurrentGame(newGameState)
    }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
              <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" required autoFocus className="form-control"
                  value={currentGame.title}
                  onChange={changeGameTitleState}
                />
              </div>
            </fieldset>

            <fieldset>
              <div className="form-group">
                <label htmlFor="maker">Maker: </label>
                <input type="text" name="maker" required autoFocus className="form-control"
                  value={currentGame.maker}
                  onChange={changeGameMakerState}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label htmlFor="numberOfPlayers"># of Players: </label>
                <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                  value={currentGame.numberOfPlayers}
                  onChange={changeGamePlayersState}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label htmlFor="skill_level">Skill Level: </label>
                <input type="text" name="skill_level" required autoFocus className="form-control"
                  value={currentGame.skillLevel}
                  onChange={changeGameSkillLevelState}
                />
              </div>
            </fieldset>
            {
             gameTypes
             ?
              <fieldset>
                <div className="form-group">
                  <select name="gameTypeId" value={currentGame?.gameTypeId} className="gameTypeId" id="gameTypeId" onChange={changeGameTypeState}>
                    <option key="0" value="0">Choose a game type</option>
                    {
                      gameTypes.map(game => {
                          return <option key={game.id} value={game.id}>{game.label}</option>
                      })
                    }
                  </select>
                </div>
              </fieldset>
             : <div>Loading</div>
            }

            {
              gameId
              ? <button
                onClick={evt => {
                  evt.preventDefault()

                  const game = {
                    id: parseInt(gameId),
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId)
                  }

              // Send POST request to your API
              editGame(game)
                  .then(() => history.push("/"))
              }}
                className="btn btn-primary">Edit</button>

              : <button type="submit"
                onClick={evt => {
                  // Prevent form from being submitted
                  evt.preventDefault()

                  const game = {
                    maker: currentGame.maker,
                    title: currentGame.title,
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    skillLevel: parseInt(currentGame.skillLevel),
                    gameTypeId: parseInt(currentGame.gameTypeId)
                  }

              // Send POST request to your API
              createGame(game)
                  .then(() => history.push("/"))
              }}
                className="btn btn-primary">Create</button>
              }
        </form>
    )
}