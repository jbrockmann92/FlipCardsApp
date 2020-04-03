import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
const axios = require('axios').default;

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      name: this.props.name //I think this is right
    }
  }

  renderCards(i) {
    return (
      <Card word = {this.props.word} definition = {this.props.definition} />
      //Seems like I'll need some code to sort through the JSON to get the right information for each card
      //How can I make sure I'm only getting the cards that are in the collection, not all of them?
      //Maybe something with LINQ (doesn't exist in js)???
    )
  }

  render(i) {
    return (
      this.renderCards(i)
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
              This
            </th>
            <th>
              This
            </th>
            <th>
              This
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
            <td>
              {this.props.stack}
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
        <Stack //Iterate to make all the stacks. And pass cards from JSON into the stacks?
          />
      </div>
    );
}

export default App;