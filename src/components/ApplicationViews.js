import React from "react"
import { Route } from "react-router-dom"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { EventList } from "./game/EventList"
import { GameProvider } from "./game/GameProvider"
import { EventProvider } from "./game/EventProvider"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
            </GameProvider>
            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>
        </main>
    </>
}
