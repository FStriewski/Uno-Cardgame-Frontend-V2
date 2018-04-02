import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from './Card'
import '../style/Hand.css'

// Replace Hand by Player1Hand after merging branch

class Player1Hand extends PureComponent {
  static propTypes = {
  }

  render() {
   // const currentCard = this.props.game.cards.find(c => c.location === "CurrentCard")
    return (
        <div className="Hand" style={{display:"flex", flexDirection: 'row'}}>
            {this.props.cards
                .map( (card, index) =>
                <Card
                  key={index}
                  color={card.color}
                  number={card.value}
                  plus={card.plus}
                  location={card.location}
                  id={card.id}
                  // currentCard={currentCard}
                  game={this.props.game}
                  card={card}
                />)}
        </div>
    )
  }
}

//const mapStateToProps = ({cards}) => ({cards: cards.filter(card => card.location === "Hand"), currentCard: cards.filter(card => card.location === "currentCard") })
//export default connect(mapStateToProps, {  })(Hand)

export default Player1Hand
