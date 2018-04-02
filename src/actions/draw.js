
import * as request from 'superagent'
import { baseUrl } from '../constants'
import { DRAWSINGLE, DRAWCARDS } from './types'

export const ADD_GAME = 'ADD_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UPDATE_GAMES = 'UPDATE_GAMES'
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'



// export const drawSingleCard = (id) => ({
//     type: DRAWSINGLE,
//     payload:{
//         id
//     }
// })

export const drawCards = (arr) => ({
    type: DRAWCARDS,
    payload:
        arr
    
})
 
export const drawSingleCard = (gameId, randcard) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
        .patch(`${baseUrl}/games/${gameId}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(randcard ) // becomes body
        // .then(result => {
        //     dispatch({
        //         type: UPDATE_GAME_SUCCESS
        //     })
        // })
        .catch(err => console.error(err))
}