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
    }
  }

  //Want to make sure I'm only loading one card at a time, then onClick, loading the next one after it's shown the definition

  renderCards(i) {
    var cards = [];
    for (var i = 0; i < this.props.cards.length; i++){
      cards.push(
        <div>
          <Card word = {this.state.cards[i]['word']} definition = {this.state.cards[i]['definition']} cardNumber = {i + 1} />
        </div>
      )
    }
    return ( //Need to do something that allows the user to click on the cards and changes the value to the definition
      <center>
          <h2>Current Stack: {this.state.name}</h2>
          <h4>Total Cards in Stack: {this.state.cards.length}</h4>
          {cards}
        </center>
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
      currentValue: null,
      title: "Word",
      stack: null,
      isFlipped: false,
      cardNumber: 0
    }
  }

  componentDidMount() {
    this.setState({
      word: this.props.word,
      definition: this.props.definition,
      currentValue: this.props.word,
      isFlipped: this.props.isFlipped,
      cardNumber: this.props.cardNumber,
    })
  }

  changeValue = () => {
      if (!this.state.isFlipped){
        this.setState({
          currentValue: this.state.definition,
          title: "Definition",
          isFlipped: !this.state.isFlipped,
        })
      }
      else {
        this.setState({
          currentValue: this.state.word,
          title: "Word",
          isFlipped: !this.state.isFlipped,
        })
      }
  }

  render() {
    return (
      <button onClick={this.changeValue}>
        <table>
          <thead>
            <tr>
              <th>
                {this.state.title}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <th>
                Card Number: {this.state.cardNumber}
              </th>
            </tr>
            <tr>
              <td>
                {this.state.currentValue}
              </td>
            </tr>
          </tbody>
        </table>
      </button>
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
  var stacks = [];
  for (var i = 0; i < cards.length; i++) {
      // note: we add a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      stacks.push(<Stack 
        name = {cards[i]['title']} 
        cards = {cards[i]['cards']}  
        />);
  }
  return <tbody>{stacks}</tbody>;
}

export default App;