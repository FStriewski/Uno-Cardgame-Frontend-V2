import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {getGames, joinGame, updateGame} from '../actions/games'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'

import PlayerBox from './PlayerBox'
import CurrentCard from '../components/CurrentCard'
import Deck from '../components/Deck'
import Player1Hand from '../components/Player1Hand'
import Status from './Status'
import '../style/Board.css'

class Board extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  render() {

    const {game, users, authenticated, userId} = this.props
    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)
    const currentCard = game.cards.find(c => c.location === "CurrentCard")
    return (
        <div className="Board">
            board
            <button onClick={this.joinGame}>Join Game</button>
            <div style={{display:"flex", flexDirection: 'row'}}>
            <PlayerBox />
           <PlayerBox />
                </div>
            <div style={{display:"flex", flexDirection: 'row'}}>

                <CurrentCard
                  color={currentCard.color}
                  value={currentCard.value}
                  plus={currentCard.plus}
                  location={currentCard.location}
                />

            <Deck game={this.props.game} player={player}/>
            </div>
            <div >
              {
                (!player) ? ""
                :
                // <Hand game={this.props.game} cards={player.cards}/>
              <Player1Hand cards={player.cards} />
              }
                <Status/>
            </div>
        </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}


export default connect(mapStateToProps, mapDispatchToProps)(Board)
