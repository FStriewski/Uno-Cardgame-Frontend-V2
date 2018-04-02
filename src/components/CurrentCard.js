import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from './Card'
import '../style/CurrentCard.css'

class CurrentCard extends PureComponent {
  static propTypes = {
  }

  render() {
    //let card = this.props.cards[0]

    return (
        <div className="CurrentCard">
          <Card color={this.props.color} number={this.props.value} plus={this.props.plus} location={this.props.location} id={this.props.id}
          />
        </div>
    )
  }
}

const mapStateToProps = ({cards}) => ({cards: cards.filter(card => card.location === "CurrentCard"), deck: cards.filter(card => card.location === "Deck")})
export default connect(mapStateToProps, { })(CurrentCard)
