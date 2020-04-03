import React from 'react';
import './App.css';
const axios = require('axios').default;

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


function App() {
  var cards = getCardInfo();
    return (
      cards
    );
}



export default App;