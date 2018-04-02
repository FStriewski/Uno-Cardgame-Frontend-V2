import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import Card from './Card'
import { drawSingleCard } from '../actions/draw'
import '../style/Deck.css'

import { getGames, updateGame } from '../actions/games'
import { getUsers } from '../actions/users'
import { userId } from '../jwt'

class Deck extends PureComponent {
  static propTypes = {
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }


  handleClick = () => {
    console.log("click in game: " + JSON.stringify(this.props.game.id) )
    let gamecards = this.props.game.cards.filter(x => x.location === "Deck")
    let randcard = gamecards[0]
    let gameId = this.props.game.id

    console.log("Randcard is:")
    console.log(randcard)
    console.log(this.props.users)
    
    // let deck = this.props.cards
    // let x = Math.floor(Math.random() * deck.length)
    // if(!x) return
    // this.props.drawSingleCard(deck[x].id) 
    this.props.drawSingleCard(gameId, randcard)
  }

  render() {
    const { game, users, authenticated, userId } = this.props
    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    return (
        <div className="Deck" onClick = {this.handleClick} ></div>
    )
  }
}

// const mapStateToProps = ({cards}) => ({cards: cards.filter(card => card.location === "Deck")})
// export default connect(mapStateToProps, { drawSingleCard })(Deck)


const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
 // game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, updateGame, drawSingleCard
}


export default connect(mapStateToProps, mapDispatchToProps)(Deck)

