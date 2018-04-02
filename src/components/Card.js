import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { playCardFromHand } from '../actions/updateLocation'
import { drawCards } from '../actions/draw'
import '../style/Card.css'

import {getGames, joinGame, updateGame} from '../actions/games'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'


 class Card extends PureComponent {

   componentWillMount() {
     if (this.props.authenticated) {
       if (this.props.game === null) this.props.getGames()
       if (this.props.users === null) this.props.getUsers()
     }
   }

    handleClick2 = () => {
      const currentCard = this.props.currentCard
      const card = this.props.card
      const gameId = this.props.game.id
        // Allow to play a card from hand if color or value match or if card is black
        if(this.props.color === currentCard.color  || this.props.number === currentCard.value || this.props.color === "black"){
      this.props.playCardFromHand(card, gameId)

          //  if(this.props.plus > 0) this.isPlusCard(this.props.plus)
           }

     console.log(currentCard)
     console.log(this.props.game.id)
     console.log(this.props.card)

    }

    isPlusCard = (plusVal) => {

        // Assigns x random cards from deck or less if deck has less cards.
        let deck =  this.props.deck
        let deckIds = deck.map( x => x.id)
        let drawIds = []
        let el;

        let rand = (x) => {
            while (drawIds.length < x && drawIds.length < deckIds.length){
                el =  deckIds[Math.floor(Math.random() * deckIds.length)]
                if(!drawIds.includes(el)){drawIds.push(el)}
            }
            return drawIds
        }
        this.props.drawCards(rand(plusVal))
    }

    classNames() {
        const { color} = this.props
        let classnames = ['Card']
        classnames.push(`fill-${color}`)
        return classnames.join(' ')
    }

    cardNumber(){
            const { number, plus } = this.props
            if (number) return this.props.number
            if (plus) return `+${plus}`
    }

    render() {

      const {game, users, authenticated, userId} = this.props
      //console.log(game)

      //const player = game.players.find(p => p.userId === userId)
      //const currentCard = game.cards.find(c => c.location === "CurrentCard")

        return (
            <div className={this.classNames()} id={this.props.id} onClick={this.handleClick2}  >
                <p style={{fontSize: "20px"}}>{this.cardNumber()} </p>
            </div>
        )
    }
}

 // const mapStateToProps = ({cards}) => ({currentCard: cards.filter(card => card.location === "CurrentCard"), deck: cards.filter(card => card.location === "Deck")})
// export default connect(mapStateToProps, { playCardFromHand, drawCards })(Card)

 const mapStateToProps = (state, props) => ({
   authenticated: state.currentUser !== null,
   userId: state.currentUser && userId(state.currentUser.jwt),
   //game: state.games && state.games[props.match.params.id],
   users: state.users
 })

 const mapDispatchToProps = {
   getGames, getUsers, joinGame, updateGame, playCardFromHand, drawCards
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Card)
