import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios').default;

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
      name: this.props.name,
      cards: this.props.cards,
      cardsArray: this.props.cards.length //I don't think I need this
    }
  }

  renderCards(i) {
    return ( //Can I do a for loop or something that goes through the whole cards JSON and grabs all of them?
      <div>
        <h2>Current Stack: {this.state.name}</h2>
        <Card word = {this.state.cards[0]['cards'][0]['word']} definition = {this.state.cards[0]['cards'][0]['definition']} />
        <Card word = {this.state.cards[0]['cards'][1]['word']} definition = {this.state.cards[0]['cards'][1]['definition']} />
        <Card word = {this.state.cards[0]['cards'][2]['word']} definition = {this.state.cards[0]['cards'][2]['definition']} />
      </div>

      //Seems like I'll need some code to sort through the JSON to get the right information for each card
      //How can I make sure I'm only getting the cards that are in the collection, not all of them?
      //Maybe something with LINQ (doesn't exist in js)???
    )
  }

  render(i = 0) {
    return (
      this.renderCards(i)
      //I think this is more of what I want. I think I only want one card on the screen at a time
      //That way I can have an onClick or something that loads the next one. Need to increment i somehow
    )
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
      definition: null,
      stack: null
    }
  }

  render() {
    return (
        <table>
        <thead>
          <tr>
            <th>
              Word
            </th>
            <th>
              Definition
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {this.props.word}
            </td>
            <td>
              {this.props.definition}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

function getCardInfo() {
  var cards;
  axios.get('https://localhost:44393/api/collection') //Get working later. Just assign info to the string for testing for now
  .then(function (response) {
     cards = response;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
  cards = '[{"id":1,"title":"React","cards":[{"id":1,"word":"state","definition":"JS object that holds values for a component"},{"id":2,"word":"props","definition":"A way to pass data into components on initialization"},{"id":3,"word":"component","definition":"Reusable building blocks for UI using JSX"}]},{"id":2,"title":"C#","cards":[{"id":4,"word":"variable","definition":"Named space in memory"},{"id":5,"word":"class","definition":"Template for an object that consists of member variables, constructor, methods"},{"id":6,"word":"object","definition":"Instance of a class"}]},{"id":3,"title":"Flutter","cards":[{"id":7,"word":"widget","definition":"Reusable component in Flutter"}]}]';
  return cards;
}

function App() { //Probably something in here that iterates to load all the collections in the JSON?
  var cards = getCardInfo();
  cards = JSON.parse(cards);
    return (
      <div>
        <Stack
        isActive = {true}
        name = {cards[0]['title']}
        cards = {cards} //I want to only pass the cards where the title matches or something, but this works for now
          />
      </div>
    );
}

export default App;