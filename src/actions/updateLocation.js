import {MOVE} from './types'
import * as request from 'superagent'
import {baseUrl } from '../constants'

export const playCardFromHand = (card, gameId) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
        .patch(`${baseUrl}/games/${gameId}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(card) // becomes body
        // .then(result => {
        //     dispatch({
        //         type: UPDATE_GAME_SUCCESS
        //     })
        // })
        .catch(err => console.error(err))
}
