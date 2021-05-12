import React from "react"
import { Route } from "react-router-dom"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { EventList } from "./game/EventList"
import { GameProvider } from "./game/GameProvider"
import { EventProvider } from "./game/EventProvider"
import { EventForm } from "./game/EventForm"
import { ProfileProvider } from "./game/ProfileProvider"
import { Profile } from "./game/Profile"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider><EventProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                <Route exact path="/games/:gameId(\d+)/edit">
                    <GameForm />
                </Route>
                <Route exact path="/events">
                    <EventList />
                </Route>
                    <Route exact path="/events/new">
                    <EventForm />
                </Route>
            </EventProvider></GameProvider>

            <ProfileProvider>
                    <Route exact path="/profile">
        <Profile />
    </Route>
            </ProfileProvider>
        </main>
    </>
}
